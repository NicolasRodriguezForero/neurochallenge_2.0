import { getChallenges } from "@/lib/challenges";
import { useEffect } from "react";
import { Challenge } from "@/types/challenge";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import ChallengeCardSkeleton from "@/components/Challenges/ChallengeCardSkeleton";
import ChallengeCard from "@/components/Challenges/ChallengeCard";

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
    <div className="w-full min-h-dvh bg-gradient-to-bl from-blue-200 via-pink-100 to-green-200 flex flex-col items-center gap-4">
      <h1 className="text-4xl font-extrabold text-gray-800 mt-20 animate-fade-in-up">
        Challenges
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {!challenges.length &&
          Array.from({ length: 10 }).map((_, index) => (
            <ChallengeCardSkeleton key={index} />
          ))}
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </div>
  );
}
