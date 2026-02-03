import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { Target as TargetIcon } from "lucide-react";

interface Target {
  id: number;
  x: number;
  y: number;
}

const GAME_DURATION = 30; // seconds
const TARGET_SIZE = 70; // px - Aumentado para mejor visibilidad
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
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto">
      {/* Stats */}
      <div className="flex gap-6">
        <div className="glass-effect px-6 py-3 rounded-full border border-border dark:border-primary/20">
          <span className="text-lg font-semibold text-foreground/80">
            Score: <span className="text-primary dark:text-[var(--neon-cyan)] font-bold">{score}</span>
          </span>
        </div>
        <div className="glass-effect px-6 py-3 rounded-full border border-border dark:border-primary/20">
          <span className="text-lg font-semibold text-foreground/80">
            Time: <span className="text-primary dark:text-[var(--neon-purple)] font-bold">{timeLeft}s</span>
          </span>
        </div>
      </div>

      {/* Game Board */}
      <div
        className={`relative rounded-3xl overflow-hidden shadow-xl`}
        style={{ 
          width: BOARD_WIDTH, 
          height: BOARD_HEIGHT,
          backgroundColor: 'rgba(240, 240, 245, 0.5)',
          border: gameActive ? '4px solid rgb(59, 130, 246)' : '4px solid rgb(99, 102, 241)',
          backdropFilter: 'blur(10px)'
        }}
      >
        {gameActive && target && (
          <button
            className="absolute group animate-pulse-glow"
            style={{
              left: target.x,
              top: target.y,
              width: TARGET_SIZE,
              height: TARGET_SIZE,
            }}
            onClick={handleTargetClick}
            aria-label="Target"
          >
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-primary/30 dark:bg-[var(--neon-pink)]/30 blur-lg animate-pulse" />
            
            {/* Main target circle */}
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary to-accent dark:from-[var(--neon-pink)] dark:to-[var(--neon-purple)] border-4 border-white dark:border-white/90 shadow-2xl dark:shadow-[var(--neon-pink)]/50 flex items-center justify-center group-hover:scale-110 transition-transform">
              {/* Center dot */}
              <div className="w-3 h-3 rounded-full bg-white dark:bg-white shadow-lg" />
              
              {/* Crosshair */}
              <div className="absolute inset-0 flex items-center justify-center">
                <TargetIcon className="w-10 h-10 text-white/70 dark:text-white/80" strokeWidth={2.5} />
              </div>
            </div>
          </button>
        )}
        
        {!gameActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 backdrop-blur-sm">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 dark:shadow-lg dark:shadow-primary/50 text-xl px-12"
              onClick={startGame}
            >
              Start Game
            </Button>
            {timeLeft !== GAME_DURATION && (
              <div className="glass-effect px-8 py-4 rounded-2xl border border-border dark:border-primary/20">
                <div className="text-sm text-foreground/60 mb-1">Final Score</div>
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent dark:from-[var(--neon-cyan)] dark:to-[var(--neon-purple)]">
                  {score}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="text-foreground/60 dark:text-foreground/70 text-center">
        Click the target as many times as you can in 30 seconds!
      </div>
    </div>
  );
}
