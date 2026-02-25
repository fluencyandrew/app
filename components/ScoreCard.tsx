"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ScoreCardProps {
  score?: number;
  total?: number;
}

export function ScoreCard({ score = 85, total = 100 }: ScoreCardProps) {
  const percentage = (score / total) * 100;

  // Determine color based on score
  const getScoreColor = (s: number) => {
    if (s >= 85) return "text-strategic-green";
    if (s >= 70) return "text-precision-blue";
    return "text-caution-amber";
  };

  return (
    <Card className="card-elevated border-border/50 bg-card/80 card-elevated-hover">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="section-label">Score</CardTitle>
          <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
            {score}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Progress value={percentage} className="h-2.5" />
        <p className="text-xs text-muted-foreground/70">
          Integration Index: <span className="font-semibold text-foreground">{Math.round(percentage)}%</span>
        </p>
      </CardContent>
    </Card>
  );
}
