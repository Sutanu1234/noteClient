import { Button } from "@/components/ui/button";
import { MenuSquare, Trash2, Pencil } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function NotePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const tenantId = localStorage.getItem("tenantId");

  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [form, setForm] = useState({ title: "", content: "" });
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);

  const tenantPlan = localStorage.getItem("plan") || "free";
  const tenantCredits = Number(localStorage.getItem("credits") || 3);

  const dialogRef = useRef(null);

  const borderColors = [
    "border-l-red-400",
    "border-l-blue-400",
    "border-l-green-400",
    "border-l-yellow-400",
    "border-l-purple-400",
    "border-l-pink-400",
  ];

  const fetchNotes = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      toast.error("Failed to fetch notes: ", err);
    }
  };

  useEffect(() => {
  if (!tenantId) return;
  fetchNotes();
}, [tenantId]);


  const openDialog = (note = null) => {
    if (!note) {
      if (tenantPlan === "free" && tenantCredits <= 0) {
        toast.info("⚠ You have no credits left! Upgrade to Pro for unlimited notes.");
        return;
      }
    }
    if (note) {
      setEditNote(note);
      setForm({ title: note.title, content: note.content });
    } else {
      setEditNote(null);
      setForm({ title: "", content: "" });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
  try {
    let res;

    if (editNote) {
      res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/notes/${editNote._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        toast.error("Failed to update note");
        return;
      }
      toast.success("Note updated");
    } else {
      if (tenantPlan === "free" && tenantCredits <= 0) {
        toast.info("⚠ You have no credits left! Upgrade to Pro for unlimited notes.");
        return;
      }

      res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/notes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        toast.error("Failed to create note");
        return;
      }

      toast.success("Note created");

      // Decrement credits locally if free plan
      if (tenantPlan === "free") {
        localStorage.setItem("credits", tenantCredits - 1);
      }
    }

    // Fetch tenant plan & credits immediately after note creation/update
    const tenantRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tenants/${tenantId}/plan`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const tenantData = await tenantRes.json();
    if (tenantRes.ok) {
      localStorage.setItem("plan", tenantData.plan);
      localStorage.setItem("credits", tenantData.credits);
    }
  } catch (err) {
    toast.error("Error: " + err.message);
  }

  setIsDialogOpen(false);
  fetchNotes();
  setTimeout(() => {
    window.location.reload();
  }, 1500);
};


  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/notes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) toast.error("Failed to delete note");
      toast.success("Note deleted");
      fetchNotes();
    } catch (err) {
      toast.error("Error: ", err.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setIsDialogOpen(false);
      }
    };
    if (isDialogOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDialogOpen]);

  const handleJoinTenant = async () => {
    if (!inviteCode) {
      toast.info("Please enter an invite code");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/join`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inviteCode }),
      });

      const data = await res.json();
      if (!res.ok) toast.error("Failed to join tenant: ", data.message);

      if (data.tenant) {
        localStorage.setItem("tenantId", data.tenant._id);
      }

      toast.success("Successfully joined tenant!");
      navigate(0);
    } catch (err) {
      toast.error("Error: ", err.message);
    } finally {
      setLoading(false);
    }
  };

  // If tenant not joined → show join form
  if (!tenantId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          You haven’t joined a tenant yet
        </h2>
        <p className="text-gray-600 mb-6">
          Enter your invite code to join a tenant
        </p>

        <div className="w-full max-w-sm flex flex-col gap-3">
          <input
            type="text"
            placeholder="Enter invite code"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-amber-400"
          />
          <Button
            onClick={handleJoinTenant}
            disabled={loading}
            className="bg-amber-400 text-white hover:bg-amber-500"
          >
            {loading ? "Joining..." : "Join Tenant"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 bg-white rounded-lg shadow-sm h-auto sm:h-16 px-4 sm:px-6 py-3 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center sm:justify-between">
        <div className="flex gap-2 items-center">
          <MenuSquare size={20} />
          <p className="text-lg sm:text-xl font-bold">Notes</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 w-full sm:w-64"
          />
          <Button
            onClick={() => openDialog()}
            className="bg-amber-200 px-4 h-10 text-sm hover:bg-amber-300 font-medium rounded-md text-amber-700"
          >
            Add Note
          </Button>
        </div>
      </div>

      {/* Cards */}
      {notes.length === 0 ? (
        <div className="text-center text-gray-500 mt-10 text-lg">
          No notes created yet
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {notes
            .filter((note) =>
              note.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((note, i) => (
              <div
                key={note._id}
                className={`bg-white rounded-lg shadow-sm p-4 border-l-4 ${
                  borderColors[i % borderColors.length]
                } flex flex-col`}
              >
                <h3 className="text-lg font-semibold">{note.title}</h3>
                <p className="text-xs text-gray-500 mb-2">
                  {new Date(note.date).toLocaleDateString("en-GB").replace(/\//g, "-")}
                </p>
                <p className="text-sm text-gray-700 line-clamp-2 flex-1">
                  {note.content}
                </p>
                <div className="flex justify-end gap-2 mt-3">
                  <button
                    onClick={() => openDialog(note)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Custom Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 px-4">
          <div
            ref={dialogRef}
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
          >
            <h2 className="text-lg font-bold mb-4">
              {editNote ? "Edit Note" : "Add Note"}
            </h2>
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-md mb-3 text-sm"
            />
            <textarea
              placeholder="Content"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full px-3 py-2 border rounded-md mb-3 text-sm h-24"
            />
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => setIsDialogOpen(false)}
                className="bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-amber-400 text-white hover:bg-amber-500"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotePage;
