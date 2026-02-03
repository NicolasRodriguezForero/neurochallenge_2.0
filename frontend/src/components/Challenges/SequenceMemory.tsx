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
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Button className="" onClick={startGame}>
          Start the Game
        </Button>
      </div>
    );
  } else if (gameState === "playing") {
    return (
      <div className="w-full h-full flex flex-col">
        <div className="w-full flex justify-center items-center py-2">
          <span className="text-lg font-semibold">Score: {score}</span>
        </div>
        <div className="w-full h-full flex flex-wrap">
          {cells.map((cell) => (
            <div
              key={cell.id}
              className={`w-1/3 h-1/3 p-2 ${
                isShowingSequence ? "" : "cursor-pointer"
              }`}
              onClick={() => !isShowingSequence && handleCellClick(cell.id)}
            >
              <div
                className={`w-full h-full flex items-center justify-center ${
                  cell.isActive ? "bg-gray-800" : "bg-gray-800/40"
                } rounded-xl shadow-lg transition-colors duration-200`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    );
  } else if (gameState === "finished") {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Finished</h1>
        <span className="text-2xl mt-2">Final Score: {score}</span>
        <Button
          className="mt-4"
          onClick={() => {
            setGameState("idle");
            setSequence([]);
            setUserStep(0);
            setScore(0);
          }}
        >
          Restart
        </Button>
      </div>
    );
  }

  return <></>;
};

export default SequenceMemory;
