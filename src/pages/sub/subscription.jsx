import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function Subscription() {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const tenantId = localStorage.getItem("tenantId"); // store when user logs in

  const handleUpgrade = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/tenants/${tenantId}/upgrade`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (!res.ok) toast.error("Failed to upgrade plan: ", data.message);

      toast.success("🎉 Successfully upgraded to Pro!");
      localStorage.setItem("plan", "pro");
      window.location.reload();
    } catch (err) {
      toast.error("Error: ", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col items-center py-16 px-6">
      <h1 className="text-4xl font-extrabold text-[#eb9200] mb-10">
        Subscription Plans
      </h1>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full">
        {/* Free Plan */}
        <div className="p-8 bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-800">Free Plan</h2>
          <p className="mt-2 text-gray-500">Your current plan</p>
          <div className="mt-4 bg-orange-100 text-[#eb9200] font-semibold px-4 py-2 rounded-full">
            Credits Left: 3
          </div>
          <ul className="mt-6 space-y-2 text-gray-600 text-sm text-left">
            <li>✔ Manage personal notes</li>
            <li>✔ Invite up to 2 members</li>
            <li>✔ Basic security</li>
            <li>✖ Limited storage</li>
          </ul>
        </div>

        {/* Pro Plan */}
        <div className="p-8 bg-gradient-to-b from-[#eb9200] to-orange-600 rounded-2xl shadow-lg text-white flex flex-col items-center">
          <h2 className="text-2xl font-bold">Pro Plan</h2>
          <p className="mt-2">Upgrade for more power</p>
          <div className="mt-4 text-3xl font-extrabold">₹499 / month</div>
          <ul className="mt-6 space-y-2 text-sm text-left">
            <li>✔ Unlimited note management</li>
            <li>✔ Invite unlimited members</li>
            <li>✔ Priority support</li>
            <li>✔ Advanced analytics</li>
            <li>✔ Secure cloud storage</li>
          </ul>

          <Button
            onClick={handleUpgrade}
            disabled={loading}
            className="mt-8 px-6 py-3 rounded-xl bg-white text-[#eb9200] font-semibold hover:bg-gray-100 transition"
            type="button"
          >
            {loading ? "Upgrading..." : "Upgrade to Pro"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Subscription;
