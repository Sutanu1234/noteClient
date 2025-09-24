import React, { useEffect, useState } from "react";
import { Trash2, Link2 } from "lucide-react";
import { toast } from "sonner";

function Member() {
  const [tenant, setTenant] = useState({ name: "", inviteCode: "", slug: "" });
  const [members, setMembers] = useState([]);
  const [sharedLink, setSharedLink] = useState("");
  const token = localStorage.getItem("token");
  const tenantId = localStorage.getItem("tenantId");

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tenants/${tenantId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setTenant({ name: data.name, inviteCode: data.inviteCode, slug: data.slug });
        setMembers(data.members);
      } catch (err) {
        toast.error("Error: ", err);
      }
    };
    fetchTenant();
  }, [tenantId, token]);

  const handleShareLink = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tenants/${tenant.slug}/invite`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTenant((prev) => ({ ...prev, inviteCode: data.inviteCode }));
      setSharedLink(`${import.meta.env.VITE_BASE_URL}/join/${data.inviteCode}`);
    } catch (err) {
      toast.error("Error: ", err);
    }
  };

  const handleDeleteMember = async (userId) => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tenants/${tenant.slug}/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setMembers((prev) => prev.filter((m) => m._id !== userId));
    } catch (err) {
      toast.error("Error: ", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8">
        {/* Tenant Info */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-[#eb9200]">{tenant.name}</h1>
          <p className="text-gray-600 mt-2">
            Invite Code: <span className="font-mono">{tenant.inviteCode}</span>
          </p>
        </div>

        {/* Share Link */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-[#eb9200] text-white rounded-xl hover:bg-[#d17d00] transition"
            onClick={handleShareLink}
          >
            <Link2 size={16} /> Generate New Invite Link
          </button>
          {sharedLink && (
            <p className="break-all text-gray-700 font-mono">{sharedLink}</p>
          )}
        </div>

        {/* Members List */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Members</h2>
          <ul className="space-y-2">
            {members.map((member) => (
              <li
                key={member._id}
                className="flex justify-between items-center p-3 bg-gray-100 rounded-lg"
              >
                <span>{member.email}</span>
                {member.role !== "admin" ? (
                  <button
                  className="text-red-500 hover:text-red-600 cursor-pointer"
                  onClick={() => handleDeleteMember(member._id)}
                >
                  <Trash2 size={18} />
                </button>
                ) : (
                  <button
                  className="text-red-200 hover:text-red-200"
                  disabled
                >
                  <Trash2 size={18} />
                </button>
                )}
              </li>
            ))}
          </ul>
          {members.length === 0 && (
            <p className="mt-4 text-gray-500 text-center">No members in this tenant.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Member;
