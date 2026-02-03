import React, { useState, useRef } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "@tanstack/react-router";
import { RotateCcw, Grid3x3 } from "lucide-react";

interface RoundResult {
  reactionTime: number | null;
  tooEarly: boolean;
}

const TOTAL_ROUNDS = 5;

export default function ReactionTimeChallenge() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<
    "waiting" | "ready" | "go" | "result" | "finished"
  >("waiting");
  const [message, setMessage] = useState<string>("Click to start");
  const [round, setRound] = useState(0);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const goTimeRef = useRef<number>(0);

  const startRound = () => {
    setPhase("ready");
    setMessage("Wait for it...");
    setReactionTime(null);
    timerRef.current && clearTimeout(timerRef.current);
    const delay = 1000 + Math.random() * 2000;
    timerRef.current = setTimeout(() => {
      goTimeRef.current = Date.now();
      setPhase("go");
      setMessage("Click Now!");
    }, delay);
  };

  const handleClick = () => {
    if (phase === "waiting") {
      setRound(0);
      setResults([]);
      startRound();
    } else if (phase === "ready") {
      // Clicked too early
      timerRef.current && clearTimeout(timerRef.current);
      setPhase("result");
      setMessage("Too early!");
      setResults((prev) => [...prev, { reactionTime: null, tooEarly: true }]);
    } else if (phase === "go") {
      // Correct click
      const rt = Date.now() - goTimeRef.current;
      setReactionTime(rt);
      setPhase("result");
      setMessage(`${rt} ms`);
      setResults((prev) => [...prev, { reactionTime: rt, tooEarly: false }]);
    } else if (phase === "result") {
      // Next round or finish
      if (round + 1 < TOTAL_ROUNDS) {
        setRound((r) => r + 1);
        startRound();
      } else {
        setPhase("finished");
        setMessage("Finished!");
      }
    }
  };

  const restartGame = () => {
    setRound(0);
    setResults([]);
    setPhase("waiting");
    setMessage("Click to start");
    setReactionTime(null);
  };

  React.useEffect(() => {
    return () => {
      timerRef.current && clearTimeout(timerRef.current);
    };
  }, []);

  // Colors matching the page aesthetic
  let bgColorClass = "bg-destructive/80 dark:bg-destructive/60"; // Red for waiting/ready
  let borderClass = "border-destructive dark:border-destructive/50";
  
  if (phase === "go") {
    bgColorClass = "bg-[var(--neon-green)] dark:bg-[var(--neon-green)]";
    borderClass = "border-[var(--neon-green)]";
  }
  
  if (phase === "result" && !results[round]?.tooEarly && reactionTime !== null) {
    bgColorClass = "bg-primary dark:bg-primary";
    borderClass = "border-primary";
  }

  const average =
    results.length === TOTAL_ROUNDS
      ? Math.round(
          results
            .filter((r) => !r.tooEarly && r.reactionTime !== null)
            .reduce((a, b) => a + (b.reactionTime || 0), 0) /
            results.filter((r) => !r.tooEarly && r.reactionTime !== null)
              .length || 0
        )
      : null;

  if (phase === "finished") {
    return (
      <div className="flex flex-col items-center gap-6 w-full px-4 max-w-2xl mx-auto">
        <div className="glass-effect w-full rounded-3xl p-8 border border-border dark:border-primary/20 text-center">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent dark:from-[var(--neon-cyan)] dark:to-[var(--neon-purple)]">
            Completed!
          </h2>
          
          <div className="mb-8">
            <div className="text-sm text-foreground/60 mb-2">Average Reaction Time</div>
            <div className="text-6xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent dark:from-[var(--neon-green)] dark:to-[var(--neon-cyan)]">
              {average ? `${average}` : "N/A"}
              <span className="text-3xl ml-2">ms</span>
            </div>
          </div>

          <div className="space-y-2 mb-8">
            <div className="text-sm text-foreground/60 mb-3">Results per Attempt</div>
            {results.map((r, i) => (
              <div 
                key={i} 
                className="flex justify-between items-center p-3 rounded-lg glass-effect border border-border dark:border-primary/20"
              >
                <span className="font-medium">Attempt {i + 1}</span>
                <span className={`font-bold ${r.tooEarly ? 'text-destructive' : 'text-primary dark:text-[var(--neon-cyan)]'}`}>
                  {r.tooEarly ? "Too early" : `${r.reactionTime} ms`}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="flex-1 bg-primary hover:bg-primary/90 dark:shadow-lg dark:shadow-primary/50"
              onClick={() => navigate({ to: "/challenges" })}
            >
              <Grid3x3 className="w-5 h-5 mr-2" />
              Other Challenge
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 dark:border-primary/50 dark:text-primary dark:hover:bg-primary/10"
              onClick={restartGame}
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Play Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full px-4 max-w-2xl mx-auto">
      <div className="glass-effect px-6 py-3 rounded-full border border-border dark:border-primary/20">
        <span className="text-lg font-semibold text-foreground/80">
          Attempt {Math.min(round + 1, TOTAL_ROUNDS)} / {TOTAL_ROUNDS}
        </span>
      </div>

      <div
        className={`w-full h-96 flex flex-col items-center justify-center rounded-3xl cursor-pointer select-none ${bgColorClass} shadow-lg border-4 ${borderClass} transition-all duration-200 hover:scale-[1.02]`}
        onClick={handleClick}
      >
        <span className="text-4xl md:text-5xl text-white font-bold text-center px-4 mb-4">
          {message}
        </span>
        {phase === "result" && (
          <span className="text-xl text-white/90 font-medium">
            Click for next attempt
          </span>
        )}
      </div>

      {results.length > 0 && phase !== "finished" && (
        <div className="glass-effect w-full rounded-2xl p-6 border border-border dark:border-primary/20">
          <div className="text-sm text-foreground/60 mb-3 text-center">Previous Results</div>
          <div className="space-y-2">
            {results.map((r, i) => (
              <div 
                key={i} 
                className="flex justify-between items-center p-2 rounded-lg bg-muted/50 dark:bg-card/30"
              >
                <span className="text-sm font-medium">Attempt {i + 1}</span>
                <span className={`text-sm font-bold ${r.tooEarly ? 'text-destructive' : 'text-primary dark:text-[var(--neon-cyan)]'}`}>
                  {r.tooEarly ? "Too early" : `${r.reactionTime} ms`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
