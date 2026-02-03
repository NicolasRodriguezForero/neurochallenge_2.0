import { CardContent, CardTitle, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Label } from "../ui/label";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";

interface Props {
  changeTab: (tab: string) => void;
}

const Login = ({ changeTab }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, login, logout } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isAuthenticated) {
      toast.error("You are already logged in");
      return;
    }

    try {
      await login({ email, password });
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed");
    }
  };

  if (isAuthenticated) {
    return (
      <CardHeader>
        <CardTitle>Already Logged In</CardTitle>
        <CardContent className="mt-4">
          <p>You are already logged in. Please log out to switch accounts.</p>
          <Button variant="destructive" className="" onClick={logout}>
            Log Out
          </Button>
        </CardContent>
      </CardHeader>
    );
  } else {
    return (
      <CardHeader>
        <CardTitle>Log In</CardTitle>
        <CardContent className="mt-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full bg-gray-800">
              Log In
            </Button>
          </form>
          <div className="mt-2 text-center text-sm -mb-4">
            <span className="text-gray-600">Don't have an account? </span>
            <Button
              variant="link"
              className="text-gray-800 font-medium p-0"
              onClick={() => changeTab("signup")}
            >
              Create your account here
            </Button>
          </div>
        </CardContent>
      </CardHeader>
    );
  }
};
export default Login;
