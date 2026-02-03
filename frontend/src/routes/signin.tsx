import Login from "@/components/SignUp/Login";
import SignUp from "@/components/SignUp/SignUp";
import { Card } from "@/components/ui/card";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs } from "@/components/ui/tabs";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/signin")({
  component: RouteComponent,
});

function RouteComponent() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="relative w-full min-h-dvh bg-gradient-to-br from-background via-primary/5 to-accent/10 dark:from-background dark:via-primary/10 dark:to-accent/20 flex flex-col items-center justify-center p-4 pt-24 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 dark:bg-[var(--neon-cyan)]/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 dark:bg-[var(--neon-purple)]/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary dark:text-[var(--neon-cyan)] animate-pulse-glow" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent dark:from-[var(--neon-cyan)] dark:to-[var(--neon-purple)]">
              Welcome Back
            </h1>
          </div>
          <p className="text-foreground/60 dark:text-foreground/70">
            Sign in to continue your cognitive training journey
          </p>
        </div>

        <Tabs
          defaultValue={activeTab}
          className="w-full"
          onValueChange={(value) => setActiveTab(value)}
          value={activeTab}
        >
          <TabsList className="grid w-full grid-cols-2 glass-effect p-1 mb-6 dark:border dark:border-primary/20">
            <TabsTrigger
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:shadow-lg dark:data-[state=active]:shadow-primary/50 transition-all"
              value="login"
            >
              Log In
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:shadow-lg dark:data-[state=active]:shadow-primary/50 transition-all"
              value="signup"
            >
              Create Account
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-0">
            <Card className="glass-effect border-border dark:border-primary/20 dark:shadow-lg dark:shadow-primary/10">
              <Login changeTab={(tab: string) => setActiveTab(tab)} />
            </Card>
          </TabsContent>
          
          <TabsContent value="signup" className="mt-0">
            <Card className="glass-effect border-border dark:border-primary/20 dark:shadow-lg dark:shadow-primary/10">
              <SignUp changeTab={(tab: string) => setActiveTab(tab)} />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
