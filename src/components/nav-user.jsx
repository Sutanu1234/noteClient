"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightFromLine } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { toast } from "sonner";

export function NavUser() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      setEmail(userEmail);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("tenantId");
    localStorage.removeItem("email");
    localStorage.removeItem("plan");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="p-2">
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8 rounded-full">
          <AvatarFallback className="rounded-lg bg-[#eb9200] text-white">
            {email ? email[0].toUpperCase() : "U"}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate text-md font-semibold">{email || "User"}</span>
        </div>
      </div>
      <Button
        className="bg-red-600 w-full mt-2 flex items-center justify-center gap-1"
        onClick={handleLogout}
      >
        <ArrowRightFromLine size={16} />
        Logout
      </Button>
    </div>
  );
}
