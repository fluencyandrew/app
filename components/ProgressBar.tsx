interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden shadow-sm">
      <div
        className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-300 shadow-md"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
