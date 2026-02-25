"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";

interface TimerBarProps {
  seconds?: number;
  onTimeUp?: () => void;
}

export function TimerBar({ seconds = 60, onTimeUp }: TimerBarProps) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) {
      onTimeUp?.();
      return;
    }

    const timer = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [remaining, onTimeUp]);

  const percentage = (remaining / seconds) * 100;
  const isLowTime = remaining < 10;

  return (
    <Card
      className={`card-elevated border-border/50 bg-card/80 card-elevated-hover transition-all duration-200 ${
        isLowTime ? "border-caution-amber/60 bg-caution-amber/5" : ""
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="section-label">Time Remaining</CardTitle>
          </div>
          <span
            className={`text-lg font-bold tabular-nums transition-colors duration-200 ${
              isLowTime ? "text-caution-amber animate-pulse-subtle" : "text-precision-blue"
            }`}
          >
            {remaining}s
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <Progress
          value={percentage}
          className={`h-2.5 ${isLowTime ? "opacity-100" : ""}`}
        />
      </CardContent>
    </Card>
  );
}
