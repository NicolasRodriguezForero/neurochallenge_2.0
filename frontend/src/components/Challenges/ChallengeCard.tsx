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

interface Props {
  challenge: Challenge;
}

const ChallengeCard = ({ challenge }: Props) => {
  const navigate = useNavigate();

  return (
    <Card className="w-xs animate-fade-in-up bg-white/60 hover:scale-105 transition-all duration-300 cursor-pointer">
      <CardHeader>
        <CardTitle>{challenge.name}</CardTitle>
        <CardDescription>{challenge.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={() => navigate({ to: challenge.link })}>Start</Button>
      </CardContent>
    </Card>
  );
};

export default ChallengeCard;
