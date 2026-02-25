"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressMeterProps {
  current?: number;
  total?: number;
}

export function ProgressMeter({ current = 3, total = 12 }: ProgressMeterProps) {
  const percentage = (current / total) * 100;

  return (
    <Card className="card-elevated border-border/50 bg-card/80 card-elevated-hover">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="section-label">Progress</CardTitle>
          <span className="text-sm font-bold text-precision-blue">
            {current}/{total}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <Progress value={percentage} className="h-2.5" />
        <p className="text-xs text-muted-foreground/70 mt-2">
          {Math.round(percentage)}% complete
        </p>
      </CardContent>
    </Card>
  );
}
