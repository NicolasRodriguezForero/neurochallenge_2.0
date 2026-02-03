import SequenceMemory from "@/components/Challenges/SequenceMemory";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/challenges/sequence-memory")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full min-h-dvh flex flex-col items-center px-4 gap-4 bg-gradient-to-br from-orange-200 via-pink-100 to-red-200">
      <h1 className="text-4xl font-extrabold text-gray-800 mt-20 animate-fade-in-up">
        Sequence Memory Challenge
      </h1>
      <div className="flex flex-col items-center animate-fade-in-up">
        <p>Just follow the sequence :)</p>
      </div>
      <div className="w-full aspect-square max-h-xl sm:w-xl">
        <SequenceMemory />
      </div>
    </div>
  );
}
