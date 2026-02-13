import { createFileRoute } from '@tanstack/react-router';
import TicTacToe from '../../components/Challenges/TicTacToe';

export const Route = createFileRoute('/challenges/tic-tac-toe')({
  component: TicTacToeRoute,
});

function TicTacToeRoute() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-primary/5 dark:from-background dark:via-background dark:to-primary/10 py-20 px-4">
      {/* Decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 dark:bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 py-2">
          <h1 
            className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent dark:from-[var(--neon-cyan)] dark:via-[var(--neon-purple)] dark:to-[var(--neon-pink)] leading-tight pb-1"
          >
            Tic-Tac-Toe
          </h1>
          <p className="text-lg text-foreground/60 dark:text-foreground/70 max-w-2xl mx-auto">
            Challenge the AI bot in a classic game of strategy
          </p>
        </div>

        <TicTacToe />
      </div>
    </div>
  );
}
