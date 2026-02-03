import Login from "@/components/SignUp/Login";
import SignUp from "@/components/SignUp/SignUp";
import { Card } from "@/components/ui/card";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs } from "@/components/ui/tabs";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/signin")({
  component: RouteComponent,
});

function RouteComponent() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="w-full min-h-dvh bg-gradient-to-tl from-purple-200 via-pink-100 to-blue-200 flex flex-col items-center p-4 pt-20">
      <Tabs
        defaultValue={activeTab}
        className="w-full md:w-2xl lg:w-4xl"
        onValueChange={(value) => setActiveTab(value)}
        value={activeTab}
      >
        <TabsList className="bg-transparent">
          <TabsTrigger
            className="data-[state=active]:bg-white/60"
            value="login"
          >
            Log In
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-white/60"
            value="signup"
          >
            Create Account
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card className="w-full md:w-2xl lg:w-4xl bg-white/60">
            <Login changeTab={(tab: string) => setActiveTab(tab)} />
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card className="w-full md:w-2xl lg:w-4xl bg-white/60">
            <SignUp changeTab={(tab: string) => setActiveTab(tab)} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
