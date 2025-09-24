import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function JoinTenant() {
  const { inviteCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const joinTenant = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/join/${inviteCode}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error("Failed to join tenant: ", data.message);
        }
        toast.success("Successfully joined tenant!");
        localStorage.setItem("tenantId", data.tenant._id);
        
        setTimeout(() => {
          navigate("/");
        }, 100);
      } catch (err) {
        toast.error("Error: ", err.message);
        navigate("/");
      }
    };

    joinTenant();
  }, [inviteCode, navigate]);

  return <div className="p-4 text-center text-lg">Joining Tenant...</div>;
}
