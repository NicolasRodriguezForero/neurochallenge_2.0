import { useState, useCallback, useEffect } from "react";
import { Button } from "../ui/button";

const SequenceMemory = () => {
  const [gameState, setGameState] = useState<"idle" | "playing" | "finished">(
    "idle"
  );
  const [sequence, setSequence] = useState<number[]>([]); // Secuencia a seguir
  const [userStep, setUserStep] = useState(0); // Paso actual del usuario
  const [isShowingSequence, setIsShowingSequence] = useState(false); // Si se está mostrando la secuencia
  const [score, setScore] = useState(0); // Puntuación

  const generateNumber = () => {
    return Math.floor(Math.random() * 9) + 1;
  };

  // 9 cells in a 3x3 grid
  const [cells, setCells] = useState([
    {
      id: 1,
      value: 1,
      isActive: false,
    },
    {
      id: 2,
      value: 2,
      isActive: false,
    },
    {
      id: 3,
      value: 3,
      isActive: false,
    },
    {
      id: 4,
      value: 4,
      isActive: false,
    },
    {
      id: 5,
      value: 5,
      isActive: false,
    },
    {
      id: 6,
      value: 6,
      isActive: false,
    },
    {
      id: 7,
      value: 7,
      isActive: false,
    },
    {
      id: 8,
      value: 8,
      isActive: false,
    },
    {
      id: 9,
      value: 9,
      isActive: false,
    },
  ]);

  const setCellState = useCallback((cellId: number, isActive: boolean) => {
    setCells((prevCells) =>
      prevCells.map((cell) =>
        cell.id === cellId ? { ...cell, isActive } : cell
      )
    );
  }, []);

  // Muestra la secuencia iluminando las celdas una por una
  const showSequence = useCallback(async (seq: number[]) => {
    setIsShowingSequence(true);
    for (let i = 0; i < seq.length; i++) {
      setCellState(seq[i], true);
      await new Promise((res) => setTimeout(res, 500));
      setCellState(seq[i], false);
      await new Promise((res) => setTimeout(res, 200));
    }
    setIsShowingSequence(false);
    setUserStep(0);
  }, [setCellState]);

  // Inicia el juego y la primera secuencia
  const startGame = () => {
    const first = generateNumber();
    setSequence([first]);
    setScore(0); // Reinicia la puntuación
    setGameState("playing");
  };

  // Cuando cambia la secuencia o el estado del juego, mostrar la secuencia
  useEffect(() => {
    if (gameState === "playing" && sequence.length > 0) {
      showSequence(sequence);
    }
  }, [gameState, sequence, showSequence]);

  // Maneja el click del usuario
  const handleCellClick = useCallback(
    (cellId: number) => {
      if (isShowingSequence || gameState !== "playing") return;
      if (cellId === sequence[userStep]) {
        // Correcto
        setCellState(cellId, true);
        setTimeout(() => {
          setCellState(cellId, false);
        }, 300);
        if (userStep + 1 === sequence.length) {
          // Usuario completó la secuencia, agregar uno nuevo
          setTimeout(() => {
            setSequence((prev) => [...prev, generateNumber()]);
            setScore((prev) => prev + 1); // Suma un punto
          }, 500);
        } else {
          setUserStep((prev) => prev + 1);
        }
      } else {
        // Incorrecto, terminar juego
        setGameState("finished");
      }
    },
    [isShowingSequence, gameState, sequence, userStep, setCellState]
  );

  if (gameState === "idle") {
    return (
      <div className="w-full h-full glass-effect rounded-3xl flex flex-col items-center justify-center p-8 dark:border dark:border-primary/20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent dark:from-[var(--neon-cyan)] dark:to-[var(--neon-purple)]">
            Ready to Test Your Memory?
          </h2>
          <p className="text-foreground/70 dark:text-foreground/80">
            Watch the pattern and repeat it back
          </p>
        </div>
        <Button 
          size="lg"
          className="bg-primary hover:bg-primary/90 dark:shadow-lg dark:shadow-primary/50 text-lg px-12" 
          onClick={startGame}
        >
          Start Game
        </Button>
      </div>
    );
  } else if (gameState === "playing") {
    return (
      <div className="w-full h-full glass-effect rounded-3xl flex flex-col dark:border dark:border-primary/20 overflow-hidden">
        <div className="w-full flex justify-center items-center py-6 border-b border-border dark:border-primary/20">
          <div className="text-center">
            <div className="text-sm text-foreground/60 dark:text-foreground/70 mb-1">Score</div>
            <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent dark:from-[var(--neon-cyan)] dark:to-[var(--neon-pink)]">
              {score}
            </span>
          </div>
        </div>
        <div className="w-full h-full p-6 grid grid-cols-3 grid-rows-3 gap-3">
          {cells.map((cell) => (
            <div
              key={cell.id}
              className={`w-full h-full ${
                isShowingSequence ? "" : "cursor-pointer"
              }`}
              onClick={() => !isShowingSequence && handleCellClick(cell.id)}
            >
              <div
                className={`w-full h-full flex items-center justify-center rounded-2xl transition-all duration-200 border-2 ${
                  cell.isActive 
                    ? "bg-primary dark:bg-primary border-primary dark:border-primary dark:shadow-lg dark:shadow-primary/50 scale-95" 
                    : "bg-muted dark:bg-card/50 border-border dark:border-primary/30 hover:bg-muted/80 dark:hover:bg-card/70 hover:border-primary/50 dark:hover:border-primary/60 hover:scale-105"
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    );
  } else if (gameState === "finished") {
    return (
      <div className="w-full h-full glass-effect rounded-3xl flex flex-col items-center justify-center p-8 dark:border dark:border-primary/20">
        <div className="text-center mb-8 animate-fade-in-up">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent dark:from-[var(--neon-cyan)] dark:to-[var(--neon-purple)]">
            Game Over!
          </h2>
          <div className="mb-2 text-foreground/70 dark:text-foreground/80">
            Final Score
          </div>
          <span className="text-6xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent dark:from-[var(--neon-pink)] dark:to-[var(--neon-cyan)]">
            {score}
          </span>
        </div>
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 dark:shadow-lg dark:shadow-primary/50 text-lg px-12"
          onClick={() => {
            setGameState("idle");
            setSequence([]);
            setUserStep(0);
            setScore(0);
          }}
        >
          Play Again
        </Button>
      </div>
    );
  }

  return <></>;
};

export default SequenceMemory;
