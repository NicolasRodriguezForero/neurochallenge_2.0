import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const ChallengeCardSkeleton = () => {
  return (
    <Card className="w-xs animate-fade-in-up bg-white/60">
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-20 h-4 bg-gray-400" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="w-20 h-4 bg-gray-400" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="w-full h-20 bg-gray-400" />
      </CardContent>
    </Card>
  );
};

export default ChallengeCardSkeleton;
