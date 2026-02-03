import { createFileRoute } from "@tanstack/react-router";
import AimTrainer from "../../components/Challenges/AimTrainer";

export const Route = createFileRoute("/challenges/aim-trainer")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full min-h-dvh flex flex-col items-center pt-20 gap-4 bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200">
      <h1 className="text-4xl font-extrabold text-gray-800">Aim Trainer</h1>
      <p className="text-gray-800">
        Improve your aim with this target practice game.
      </p>
      <AimTrainer />
    </div>
  );
}
