"use client";

interface PointsCounterProps {
  points: number;
}

export default function PointsCounter({ points }: PointsCounterProps) {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
      <div className="glass border-2 border-blue-500 rounded-xl p-6 shadow-lg float-effect">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-gray-600 font-bold mb-2">
            Points
          </p>
          <p className="text-4xl font-bold text-blue-600">{Math.max(0, points)}</p>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-300 text-xs text-gray-700 space-y-1 font-medium">
          <p>✓ Correct: +1</p>
          <p>✗ Wrong: -1</p>
        </div>
      </div>
    </div>
  );
}
