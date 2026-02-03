import React, { useState, useRef } from "react";

interface RoundResult {
  reactionTime: number | null;
  tooEarly: boolean;
}

const TOTAL_ROUNDS = 5;

export default function ReactionTimeChallenge() {
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
    setMessage("Wait for green...");
    setReactionTime(null);
    timerRef.current && clearTimeout(timerRef.current);
    const delay = 1000 + Math.random() * 2000;
    timerRef.current = setTimeout(() => {
      goTimeRef.current = Date.now();
      setPhase("go");
      setMessage("Click!");
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
      setMessage(`Reaction time: ${rt} ms`);
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
    } else if (phase === "finished") {
      // Restart
      setRound(0);
      setResults([]);
      setPhase("waiting");
      setMessage("Click to start");
    }
  };

  React.useEffect(() => {
    return () => {
      timerRef.current && clearTimeout(timerRef.current);
    };
  }, []);

  let bgColor = "bg-red-800/80 animate";
  if (phase === "go") bgColor = "bg-green-500";
  if (phase === "finished") bgColor = "bg-blue-500";
  if (phase === "result" && !results[round]?.tooEarly && reactionTime !== null)
    bgColor = "bg-blue-500";

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

  return (
    <div className="flex flex-col items-center gap-6 w-full px-4">
      {/* <div className="text-lg font-semibold">
        Round {Math.min(round + 1, TOTAL_ROUNDS)} / {TOTAL_ROUNDS}
      </div> */}
      <div
        className={`w-full h-96 flex items-center justify-center rounded-2xl cursor-pointer select-none ${bgColor} shadow-lg`}
        onClick={handleClick}
      >
        <span className="text-3xl text-white font-bold text-center px-4">
          {phase === "finished" ? (
            <span>
              Average reaction time: {average ? `${average} ms` : "N/A"}
            </span>
          ) : (
            message
          )}
        </span>
      </div>
      {/* {phase === "finished" && (
        <div className="mt-4 text-2xl font-bold text-gray-800">
          Average reaction time: {average ? `${average} ms` : "N/A"}
        </div>
      )} */}
      {/* {results.length > 0 && (
        <div className="mt-2 text-gray-700">
          {results.map((r, i) => (
            <div key={i}>
              Round {i + 1}: {r.tooEarly ? "Too early" : r.reactionTime + " ms"}
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
}
