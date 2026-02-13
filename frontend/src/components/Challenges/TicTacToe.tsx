import { useState } from "react";
import { Button } from "../ui/button";
import { RotateCcw, Trophy, X as XIcon, Circle } from "lucide-react";

type Cell = null | 'X' | 'O';
type Board = Cell[];
type Difficulty = 'easy' | 'medium' | 'hard';
type GameState = 'setup' | 'playing' | 'finished';

const WIN_PATTERNS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

export default function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [gameState, setGameState] = useState<GameState>('setup');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [winner, setWinner] = useState<Cell>(null);
  const [winningPattern, setWinningPattern] = useState<number[]>([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  // Check for winner
  const checkWinner = (currentBoard: Board): Cell => {
    for (const pattern of WIN_PATTERNS) {
      const [a, b, c] = pattern;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        setWinningPattern(pattern);
        return currentBoard[a];
      }
    }
    return null;
  };

  // Check if board is full
  const isBoardFull = (currentBoard: Board): boolean => {
    return currentBoard.every(cell => cell !== null);
  };

  // Easy Bot - Random move
  const easyBot = (currentBoard: Board): number => {
    const emptyCells = currentBoard
      .map((cell, index) => cell === null ? index : null)
      .filter(index => index !== null) as number[];
    
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  };

  // Find winning move for a player
  const findWinningMove = (currentBoard: Board, player: Cell): number => {
    for (const pattern of WIN_PATTERNS) {
      const [a, b, c] = pattern;
      const cells = [currentBoard[a], currentBoard[b], currentBoard[c]];
      
      if (
        cells.filter(cell => cell === player).length === 2 &&
        cells.filter(cell => cell === null).length === 1
      ) {
        if (currentBoard[a] === null) return a;
        if (currentBoard[b] === null) return b;
        if (currentBoard[c] === null) return c;
      }
    }
    return -1;
  };

  // Medium Bot - Basic strategy
  const mediumBot = (currentBoard: Board): number => {
    // Try to win
    const winMove = findWinningMove(currentBoard, 'O');
    if (winMove !== -1) return winMove;
    
    // Block player
    const blockMove = findWinningMove(currentBoard, 'X');
    if (blockMove !== -1) return blockMove;
    
    // Take center if available
    if (currentBoard[4] === null) return 4;
    
    // Take a corner
    const corners = [0, 2, 6, 8];
    const emptyCorners = corners.filter(i => currentBoard[i] === null);
    if (emptyCorners.length > 0) {
      return emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
    }
    
    // Random
    return easyBot(currentBoard);
  };

  // Minimax algorithm for hard bot
  const minimax = (currentBoard: Board, depth: number, isMaximizing: boolean): number => {
    const boardWinner = checkWinnerForMinimax(currentBoard);
    
    if (boardWinner === 'O') return 10 - depth;
    if (boardWinner === 'X') return depth - 10;
    if (isBoardFull(currentBoard)) return 0;
    
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = 'O';
          const score = minimax(currentBoard, depth + 1, false);
          currentBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = 'X';
          const score = minimax(currentBoard, depth + 1, true);
          currentBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  // Check winner for minimax (without setting state)
  const checkWinnerForMinimax = (currentBoard: Board): Cell => {
    for (const pattern of WIN_PATTERNS) {
      const [a, b, c] = pattern;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }
    return null;
  };

  // Hard Bot - Minimax
  const hardBot = (currentBoard: Board): number => {
    let bestScore = -Infinity;
    let bestMove = -1;
    
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        currentBoard[i] = 'O';
        const score = minimax([...currentBoard], 0, false);
        currentBoard[i] = null;
        
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    
    return bestMove;
  };

  // Get bot move based on difficulty
  const getBotMove = (currentBoard: Board): number => {
    switch (difficulty) {
      case 'easy':
        return easyBot(currentBoard);
      case 'medium':
        return mediumBot(currentBoard);
      case 'hard':
        return hardBot(currentBoard);
      default:
        return easyBot(currentBoard);
    }
  };

  // Handle player move
  const handleCellClick = (index: number) => {
    if (!isPlayerTurn || board[index] !== null || gameState !== 'playing') return;
    
    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    
    // Check if player won
    const playerWon = checkWinner(newBoard);
    if (playerWon) {
      setWinner('X');
      setGameState('finished');
      return;
    }
    
    // Check draw
    if (isBoardFull(newBoard)) {
      setGameState('finished');
      return;
    }
    
    // Bot's turn
    setIsPlayerTurn(false);
    setTimeout(() => {
      const botMove = getBotMove(newBoard);
      newBoard[botMove] = 'O';
      setBoard(newBoard);
      
      // Check if bot won
      const botWon = checkWinner(newBoard);
      if (botWon) {
        setWinner('O');
        setGameState('finished');
        return;
      }
      
      // Check draw
      if (isBoardFull(newBoard)) {
        setGameState('finished');
        return;
      }
      
      setIsPlayerTurn(true);
    }, 500);
  };

  // Start game
  const startGame = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setBoard(Array(9).fill(null));
    setWinner(null);
    setWinningPattern([]);
    setIsPlayerTurn(true);
    setGameState('playing');
  };

  // Reset game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setWinningPattern([]);
    setIsPlayerTurn(true);
    setGameState('setup');
  };

  // Setup screen
  if (gameState === 'setup') {
    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
        <div className="glass-effect w-full rounded-3xl p-8 border border-border dark:border-primary/20 text-center">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent dark:from-[var(--neon-cyan)] dark:to-[var(--neon-pink)]">
            Choose Difficulty
          </h2>
          
          <div className="space-y-4">
            <Button
              size="lg"
              className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 dark:shadow-lg dark:shadow-green-700/50 text-white text-xl"
              onClick={() => startGame('easy')}
            >
              Easy - Random Moves
            </Button>
            
            <Button
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 dark:shadow-lg dark:shadow-primary/50 text-xl"
              onClick={() => startGame('medium')}
            >
              Medium - Basic Strategy
            </Button>
            
            <Button
              size="lg"
              className="w-full bg-destructive hover:bg-destructive/90 dark:shadow-lg dark:shadow-destructive/50 text-xl"
              onClick={() => startGame('hard')}
            >
              Hard - Unbeatable AI
            </Button>
          </div>
          
          <p className="text-foreground/60 dark:text-foreground/70 mt-8 text-sm">
            You play as <span className="text-primary dark:text-[var(--neon-cyan)] font-bold">X</span>, 
            Bot plays as <span className="text-destructive dark:text-[var(--neon-pink)] font-bold">O</span>
          </p>
        </div>
      </div>
    );
  }

  // Finished screen
  if (gameState === 'finished') {
    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
        <div className="glass-effect w-full rounded-3xl p-8 border border-border dark:border-primary/20 text-center">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-primary dark:text-[var(--neon-cyan)]" />
          
          <h2 className="text-4xl font-bold mb-4">
            {winner === 'X' ? (
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent dark:from-[var(--neon-cyan)] dark:to-green-400">
                You Won!
              </span>
            ) : winner === 'O' ? (
              <span className="bg-gradient-to-r from-destructive to-accent bg-clip-text text-transparent dark:from-[var(--neon-pink)] dark:to-red-400">
                Bot Won!
              </span>
            ) : (
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent dark:from-red-400 dark:to-[var(--neon-cyan)]">
                Draw!
              </span>
            )}
          </h2>
          
          <p className="text-foreground/70 dark:text-foreground/80 mb-8">
            Difficulty: <span className="font-bold capitalize">{difficulty}</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="flex-1 bg-primary hover:bg-primary/90 dark:shadow-lg dark:shadow-primary/50"
              onClick={() => startGame(difficulty)}
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Play Again
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="flex-1 dark:border-primary/50 dark:text-primary dark:hover:bg-primary/10"
              onClick={resetGame}
            >
              Change Difficulty
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Playing screen
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
      {/* Status */}
      <div className="flex gap-4 w-full justify-center">
        <div className="glass-effect px-6 py-3 rounded-full border border-border dark:border-primary/20">
          <span className="text-lg font-semibold text-foreground/80">
            Difficulty: <span className="text-primary dark:text-[var(--neon-cyan)] font-bold capitalize">{difficulty}</span>
          </span>
        </div>
        
        <div className={`glass-effect px-6 py-3 rounded-full border-2 ${
          isPlayerTurn 
            ? 'border-primary dark:border-[var(--neon-cyan)]' 
            : 'border-destructive dark:border-[var(--neon-pink)]'
        }`}>
          <span className="text-lg font-semibold">
            {isPlayerTurn ? (
              <span className="text-primary dark:text-[var(--neon-cyan)]">Your Turn</span>
            ) : (
              <span className="text-destructive dark:text-[var(--neon-pink)]">Bot's Turn...</span>
            )}
          </span>
        </div>
      </div>

      {/* Board */}
      <div className="glass-effect rounded-3xl p-8 border-4 border-primary dark:border-primary/50 dark:shadow-lg dark:shadow-primary/20">
        <div className="grid grid-cols-3 grid-rows-3 gap-4">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleCellClick(index)}
              disabled={!isPlayerTurn || cell !== null}
              style={{
                border: winningPattern.includes(index) 
                  ? '4px solid rgb(22, 163, 74)' 
                  : '4px solid rgb(99, 102, 241)'
              }}
              className={`glass-effect rounded-2xl w-24 h-24 transition-all duration-200 flex items-center justify-center text-6xl font-bold
                ${winningPattern.includes(index) 
                  ? 'bg-green-600/20 dark:shadow-lg dark:shadow-green-600/50' 
                  : 'hover:scale-105 dark:border-primary/30 dark:hover:border-primary/60'
                }
                ${!isPlayerTurn || cell !== null ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {cell === 'X' && (
                <XIcon className="w-16 h-16 text-primary dark:text-[var(--neon-cyan)]" strokeWidth={3} />
              )}
              {cell === 'O' && (
                <Circle className="w-16 h-16 text-destructive dark:text-[var(--neon-pink)]" strokeWidth={3} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <Button
        variant="outline"
        className="dark:border-primary/50 dark:text-primary dark:hover:bg-primary/10"
        onClick={resetGame}
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        New Game
      </Button>
    </div>
  );
}
