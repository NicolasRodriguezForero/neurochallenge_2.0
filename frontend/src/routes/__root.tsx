import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { MouseGlow } from "@/components/MouseGlow";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeProvider>
        <AuthProvider>
          <MouseGlow />
          <Outlet />
          <Header />
          <TanStackRouterDevtools />
          <Toaster richColors />
        </AuthProvider>
      </ThemeProvider>
    </>
  ),
});
