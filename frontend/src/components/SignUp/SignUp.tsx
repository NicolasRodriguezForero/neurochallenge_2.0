import { useState } from "react";
import { Button } from "../ui/button";
import { CardContent, CardTitle, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";

interface Props {
  changeTab: (tab: string) => void;
}

const SignUp = ({ changeTab }: Props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");
    // TODO: Implement signup logic
    console.log(username, email, password);
    if (true) {
      toast.success("Account created successfully!");
    } else {
      toast.error("Account creation failed");
    }
  };

  return (
    <CardHeader>
      <CardTitle>Create your Account</CardTitle>
      <CardContent className="mt-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="John Doe"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
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
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {passwordError && (
              <p className="text-red-500 text-xs">{passwordError}</p>
            )}
          </div>

          <Button type="submit" className="w-full bg-gray-800">
            Create Account
          </Button>
        </form>
        <div className="mt-2 text-center text-sm -mb-4">
          <span className="text-gray-600">Already have an account? </span>
          <Button
            variant="link"
            className="text-gray-800 font-medium p-0"
            onClick={() => changeTab("login")}
          >
            Log in here
          </Button>
        </div>
      </CardContent>
    </CardHeader>
  );
};

export default SignUp;
