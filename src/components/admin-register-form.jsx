/* eslint-disable no-unused-vars */
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function AdminForm({ className, ...props }) {
  const [form, setForm] = useState({ email: "", password: "", tenantName: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register/admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) toast("Failed to register", { type: "error" });

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("tenantId", data.user.tenant);
      localStorage.setItem("plan", data.user.tenant.plan);

      toast("Tenant created successfully!", { type: "success" });
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (err) {
      toast("An error occurred. Please try again.", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-[#eb9200]">
          Create a new Tenant
        </h1>
        <p className="text-muted-foreground text-sm">
          Enter the details below to create a new Tenant
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="tenant">Tenant Name</Label>
          <Input
            id="tenant"
            type="text"
            value={form.tenantName}
            onChange={(e) => setForm({ ...form, tenantName: e.target.value })}
            placeholder="Acme"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-[#eb9200]"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Tenant"}
        </Button>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="underline underline-offset-4">
            Sign in
          </a>
        </div>
      </div>
    </form>
  );
}
