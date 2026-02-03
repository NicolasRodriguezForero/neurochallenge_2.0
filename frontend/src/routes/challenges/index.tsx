import { getChallenges } from "@/lib/challenges";
import { useEffect } from "react";
import { Challenge } from "@/types/challenge";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import ChallengeCardSkeleton from "@/components/Challenges/ChallengeCardSkeleton";
import ChallengeCard from "@/components/Challenges/ChallengeCard";
import { Brain, Sparkles } from "lucide-react";

export const Route = createFileRoute("/challenges/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  const fetchChallenges = async () => {
    const challenges = await getChallenges();
    setChallenges(challenges);
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  return (
    <div className="relative w-full min-h-dvh bg-gradient-to-br from-background via-primary/5 to-accent/10 dark:from-background dark:via-primary/10 dark:to-accent/20 flex flex-col items-center overflow-hidden pt-24 pb-16">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 dark:bg-[var(--neon-cyan)]/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 dark:bg-[var(--neon-purple)]/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-down">
          <div className="inline-flex items-center gap-3 mb-4 py-2">
            <Brain className="w-12 h-12 text-primary dark:text-[var(--neon-cyan)] animate-pulse-glow" />
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent dark:from-[var(--neon-cyan)] dark:via-[var(--neon-purple)] dark:to-[var(--neon-pink)] leading-tight pb-1">
              Challenges
            </h1>
            <Sparkles className="w-12 h-12 text-accent dark:text-[var(--neon-purple)] animate-pulse-glow" />
          </div>
          <p className="text-lg text-foreground/60 dark:text-foreground/70 max-w-2xl mx-auto">
            Test your cognitive abilities with our scientifically designed challenges
          </p>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
          {!challenges.length &&
            Array.from({ length: 6 }).map((_, index) => (
              <ChallengeCardSkeleton key={index} />
            ))}
          {challenges.map((challenge, index) => (
            <div
              key={challenge.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ChallengeCard challenge={challenge} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
