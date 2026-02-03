import { useState } from "react";
import { Button } from "../ui/button";
import { CardContent, CardTitle, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";

interface Props {
  changeTab: (tab: string) => void;
}

const SignUp = ({ changeTab }: Props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    
    setPasswordError("");
    setIsLoading(true);
    
    try {
      // TODO: Implement signup logic with API
      console.log(username, email, password);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Account created successfully!");
      changeTab("login");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Account creation failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardHeader>
      <CardTitle className="text-2xl font-bold text-foreground dark:text-primary">
        Create Account
      </CardTitle>
      <CardContent className="mt-6">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground/80">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="johndoe"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="dark:bg-background/50 dark:border-primary/30 dark:focus:border-primary"
                disabled={isLoading}
              />
            </div>
            
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
          </div>
          
          <div className="space-y-4">
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
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground/80">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="dark:bg-background/50 dark:border-primary/30 dark:focus:border-primary"
                disabled={isLoading}
              />
              {passwordError && (
                <p className="text-destructive text-sm font-medium animate-fade-in">
                  {passwordError}
                </p>
              )}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 dark:shadow-lg dark:shadow-primary/50 transition-all"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating account...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Create Account
              </span>
            )}
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <span className="text-foreground/60">Already have an account? </span>
          <Button
            variant="link"
            className="text-primary dark:text-primary font-semibold p-0 h-auto hover:underline"
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
