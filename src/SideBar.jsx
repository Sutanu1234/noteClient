import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Home from "./pages/home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import NotePage from "./pages/notes/NotePage";
import Subscription from "./pages/sub/subscription";
import { Crown } from "lucide-react";
import Member from "./pages/member/Member";

// ProtectedRoute component
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function SideBar() {
  const [plan, setPlan] = useState(localStorage.getItem("plan"));
  const [credits, setCredits] = useState(0);

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const tenantId = localStorage.getItem("tenantId");

  useEffect(() => {
    const fetchTenantPlan = async () => {
      if (!tenantId || !token) return;

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/tenants/${tenantId}/plan`,
          {
            headers: { Authorization: `Bearer ${token}` },
            method: "GET",
          }
        );

        const data = await res.json();
        if (res.ok) {
          setPlan(data.plan);
          setCredits(data.credits);
          localStorage.setItem("plan", data.plan);
        } else {
          console.error("Failed to fetch plan:", data.message);
        }
      } catch (err) {
        console.error("Error fetching tenant plan:", err);
      }
    };

    fetchTenantPlan();
  }, [tenantId, token]);

  const isPro = plan === "pro";

  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <SidebarInset>
        <div className="flex items-center justify-between p-4">
          <SidebarTrigger />
          {isPro ? (
            <div className="bg-[#eb9200] rounded-md p-2 text-white text-md font-medium flex items-center gap-2">
              <Crown size={16} />
              <p>Unlimited</p>
            </div>
          ) : (
            <div className="bg-[#eb9200] rounded-md p-2 text-white text-md font-medium">
              Credits: {credits}
            </div>
          )}
        </div>
        <Separator />
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notes"
              element={
                <ProtectedRoute>
                  <NotePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sub"
              element={
                <ProtectedRoute>
                  <Subscription />
                </ProtectedRoute>
              }
            />
            <Route
              path="/members"
              element={
                <ProtectedRoute>
                  <Member />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
