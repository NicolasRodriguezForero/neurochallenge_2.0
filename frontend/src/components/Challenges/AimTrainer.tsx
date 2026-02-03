import { useState, useRef } from "react";
import { Button } from "../ui/button";

interface Target {
  id: number;
  x: number;
  y: number;
}

const GAME_DURATION = 30; // seconds
const TARGET_SIZE = 60; // px
const BOARD_WIDTH = 800;
const BOARD_HEIGHT = 400;

export default function AimTrainer() {
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [target, setTarget] = useState<Target | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameActive(true);
    spawnTarget();
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          endGame();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const endGame = () => {
    setGameActive(false);
    setTarget(null);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const spawnTarget = () => {
    const x = Math.random() * (BOARD_WIDTH - TARGET_SIZE);
    const y = Math.random() * (BOARD_HEIGHT - TARGET_SIZE);
    setTarget({ id: Date.now(), x, y });
  };

  const handleTargetClick = () => {
    if (!gameActive) return;
    setScore((s) => s + 1);
    spawnTarget();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-8">
        <div className="text-lg font-semibold">Score: {score}</div>
        <div className="text-lg font-semibold">Time: {timeLeft}s</div>
      </div>
      <div
        className={`relative ${gameActive && "bg-gray-800/40 shadow-lg"} rounded-lg border-gray-200`}
        style={{ width: BOARD_WIDTH, height: BOARD_HEIGHT }}
      >
        {gameActive && target && (
          <button
            className="absolute bg-gray-800 hover:bg-gray-600 rounded-full border-4 border-gray-950 shadow-lg transition-all duration-75"
            style={{
              left: target.x,
              top: target.y,
              width: TARGET_SIZE,
              height: TARGET_SIZE,
            }}
            onClick={handleTargetClick}
            aria-label="Target"
          />
        )}
        {!gameActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-transparent rounded-lg">
            <Button
              className="px-6 py-3 rounded-lg font-bold text-xl shadow hover:bg-gray-800 transition"
              onClick={startGame}
            >
              Start Game
            </Button>
            {timeLeft !== GAME_DURATION && (
              <div
                className={`text-2xl font-bold ${gameActive ? "text-white/70" : "text-gray-800"}`}
              >
                Final Score: {score}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="text-gray-500 text-sm mt-2">
        Click the target as many times as you can in 30 seconds!
      </div>
    </div>
  );
}
