import { Challenge } from "@/types/challenge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Play, Zap } from "lucide-react";

interface Props {
  challenge: Challenge;
}

const ChallengeCard = ({ challenge }: Props) => {
  const navigate = useNavigate();

  // Different gradient colors for variety
  const gradients = [
    "from-[var(--neon-cyan)] to-[var(--neon-blue)]",
    "from-[var(--neon-purple)] to-[var(--neon-pink)]",
    "from-[var(--neon-green)] to-[var(--neon-cyan)]",
  ];
  
  const gradient = gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <Card className="group relative glass-effect border-border dark:border-primary/20 hover:scale-105 hover:shadow-xl dark:hover:shadow-primary/20 transition-all duration-300 cursor-pointer overflow-hidden">
      {/* Gradient accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} dark:opacity-100 opacity-50`} />
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      <CardHeader className="relative space-y-3">
        <div className="flex items-start justify-between">
          <Zap className="w-6 h-6 text-primary dark:text-[var(--neon-cyan)] group-hover:scale-110 transition-transform" />
          <div className="px-2 py-1 rounded-full text-xs font-medium glass-effect dark:border dark:border-primary/30 text-foreground/70">
            Free
          </div>
        </div>
        
        <CardTitle className="text-xl font-bold text-foreground dark:text-primary group-hover:text-primary dark:group-hover:text-[var(--neon-cyan)] transition-colors">
          {challenge.name}
        </CardTitle>
        
        <CardDescription className="text-foreground/70 dark:text-foreground/80 leading-relaxed min-h-[3rem]">
          {challenge.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="relative">
        <Button 
          onClick={() => navigate({ to: challenge.link })}
          className="w-full bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/80 dark:shadow-lg dark:shadow-primary/50 group/btn transition-all"
        >
          <span className="flex items-center gap-2">
            <Play className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            Start Challenge
          </span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ChallengeCard;
