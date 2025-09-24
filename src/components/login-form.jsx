import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

export function LoginForm({ className, ...props }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("Login failed");
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("email", data.user.email);
        if (data.user.tenant != null) {
          localStorage.setItem("tenantId", data.user.tenant._id);
          localStorage.setItem("plan", data.user.tenant.plan);
        } else {
          localStorage.removeItem("tenantId");
        }

        toast("Login successful", { type: "success" });
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      toast("Something went wrong. Try again.", { type: "error" });
    }

    setLoading(false);
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleLogin}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-[#eb9200]">
          Login to your account
        </h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
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

        <Button
          type="submit"
          className="w-full bg-[#eb9200]"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <div className="text-center text-sm mt-2">
          Don't have an account?{" "}
          <span
            className="text-[#eb9200] cursor-pointer underline"
            onClick={() => navigate("/register-admin")}
          >
            Register Admin
          </span>{" "}
          or{" "}
          <span
            className="text-[#eb9200] cursor-pointer underline"
            onClick={() => navigate("/register-user")}
          >
            Register User
          </span>
        </div>
      </div>
    </form>
  );
}
