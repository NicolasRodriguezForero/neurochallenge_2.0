import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";

export function MouseGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const location = useLocation();
  
  // Disable mouse glow on game pages
  const isGamePage = location.pathname.includes('/challenges/sequence-memory') || 
                     location.pathname.includes('/challenges/reaction-time') || 
                     location.pathname.includes('/challenges/aim-trainer') ||
                     location.pathname.includes('/challenges/tic-tac-toe');

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  // Don't render glow on game pages
  if (isGamePage) return null;

  return (
    <>
      {/* Mouse glow effect - Multiple layers for better effect */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-200"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--glow-primary), 0.08), transparent 50%)`,
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--glow-secondary), 0.12), transparent 60%)`,
        }}
      />
      
      {/* CSS variables for glow colors */}
      <style>{`
        :root {
          --glow-primary: 59, 130, 246; /* Blue */
          --glow-secondary: 139, 92, 246; /* Purple */
        }
        
        .dark {
          --glow-primary: 34, 211, 238; /* Cyan */
          --glow-secondary: 168, 85, 247; /* Purple neon */
        }
      `}</style>
    </>
  );
}
