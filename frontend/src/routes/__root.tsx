import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/hooks/useAuth";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <AuthProvider>
        <Outlet />
        <Header />
        <TanStackRouterDevtools />
        <Toaster richColors />
      </AuthProvider>
    </>
  ),
});
