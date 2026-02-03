import { createFileRoute } from "@tanstack/react-router";
import ReactionTimeChallenge from "../../components/Challenges/ReactionTimeChallenge";

export const Route = createFileRoute("/challenges/reaction-time")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full min-h-dvh flex flex-col items-center gap-4 bg-gradient-to-bl from-green-200 via-blue-200 to-red-200">
      <h1 className="text-4xl font-extrabold text-gray-800 mt-20">
        Reaction Time
      </h1>
      <p className="text-gray-800">
        React to a stimulus as quickly as possible.
      </p>
      <ReactionTimeChallenge />
    </div>
  );
}
