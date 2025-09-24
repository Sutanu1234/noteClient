import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

export function UserForm({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/register/member`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            inviteCode: inviteCode || undefined,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast("Registration failed", { type: "error" });
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("tenantId", data.user.tenant || "");
        toast("Registration successful", { type: "success" });
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      toast("Something went wrong. Please try again.", { type: "error" });
    }

    setLoading(false);
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleRegister}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-[#eb9200]">
          Sign Up as a new Member
        </h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter the details below to register as new Member
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="invitecode">Invite Code (optional)</Label>
          <Input
            id="invitecode"
            type="number"
            placeholder="123456"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            onWheel={(e) => e.target.blur()}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[#eb9200]"
          disabled={loading}
        >
          {loading ? "Registering..." : "Sign Up"}
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
