import { CardContent, CardTitle, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Label } from "../ui/label";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";
import { LogIn, LogOut } from "lucide-react";

interface Props {
  changeTab: (tab: string) => void;
}

const Login = ({ changeTab }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated, login, logout } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isAuthenticated) {
      toast.error("You are already logged in");
      return;
    }

    setIsLoading(true);
    try {
      await login({ email, password });
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return (
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground dark:text-primary">
          Already Logged In
        </CardTitle>
        <CardContent className="mt-6 space-y-4">
          <p className="text-foreground/70">
            You are already logged in. Please log out to switch accounts.
          </p>
          <Button 
            variant="destructive" 
            className="w-full dark:shadow-lg dark:shadow-destructive/50" 
            onClick={logout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </CardContent>
      </CardHeader>
    );
  }

  return (
    <CardHeader>
      <CardTitle className="text-2xl font-bold text-foreground dark:text-primary">
        Welcome Back
      </CardTitle>
      <CardContent className="mt-6">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground/80">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="dark:bg-background/50 dark:border-primary/30 dark:focus:border-primary"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground/80">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="dark:bg-background/50 dark:border-primary/30 dark:focus:border-primary"
              disabled={isLoading}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 dark:shadow-lg dark:shadow-primary/50 transition-all"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Logging in...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Log In
              </span>
            )}
          </Button>
        </form>
        <div className="mt-6 text-center text-sm">
          <span className="text-foreground/60">Don't have an account? </span>
          <Button
            variant="link"
            className="text-primary dark:text-primary font-semibold p-0 h-auto hover:underline"
            onClick={() => changeTab("signup")}
          >
            Create your account here
          </Button>
        </div>
      </CardContent>
    </CardHeader>
  );
};
export default Login;
