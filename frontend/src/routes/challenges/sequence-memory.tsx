import SequenceMemory from "@/components/Challenges/SequenceMemory";
import { createFileRoute } from "@tanstack/react-router";
import { Brain, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/challenges/sequence-memory")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-dvh flex flex-col items-center px-4 py-6 bg-gradient-to-br from-background via-primary/5 to-accent/10 dark:from-background dark:via-primary/10 dark:to-accent/20 overflow-hidden pt-24">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 dark:bg-[var(--neon-cyan)]/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 dark:bg-[var(--neon-pink)]/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => navigate({ to: "/challenges" })}
          className="mb-6 dark:text-primary dark:hover:bg-primary/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Challenges
        </Button>

        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-down">
          <div className="inline-flex items-center gap-3 mb-4 py-2">
            <Brain className="w-10 h-10 text-primary dark:text-[var(--neon-cyan)] animate-pulse-glow" />
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent dark:from-[var(--neon-cyan)] dark:to-[var(--neon-purple)] leading-tight pb-1">
              Sequence Memory
            </h1>
          </div>
          <p className="text-foreground/70 dark:text-foreground/80 text-lg">
            Memorize the sequence and repeat it back. How far can you go?
          </p>
        </div>

        {/* Game Container */}
        <div className="w-full aspect-square max-w-2xl mx-auto animate-fade-in-up">
          <SequenceMemory />
        </div>
      </div>
    </div>
  );
}
