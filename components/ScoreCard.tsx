"use client";

interface ScoreCardProps {
  score?: number;
}

export function ScoreCard({ score = 85 }: ScoreCardProps) {
  return (
    <div className="bg-surface border border-border rounded-lg p-bubble-pad space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-pill-meta uppercase">Score</span>
        <span className="text-2xl font-bold text-strategic-green">{score}</span>
      </div>
      <div className="text-xs text-muted">Integration Index: {score}%</div>
      <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden border border-border">
        <div
          className="h-full bg-gradient-to-r from-strategic-green to-precision-blue"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
