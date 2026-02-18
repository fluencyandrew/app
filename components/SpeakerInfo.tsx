"use client";

interface SpeakerProps {
  name: string;
  role: string;
  goal: string;
  avatarUrl?: string;
  side: "left" | "right";
}

export default function SpeakerInfo({ name, role, goal, avatarUrl, side }: SpeakerProps) {
  const isLeft = side === "left";

  return (
    <div className={`flex flex-col items-center gap-3`}>
      {/* Avatar */}
      <div className={`w-24 h-24 rounded-full overflow-hidden border-3 ${isLeft ? "border-orange-400" : "border-blue-500"} bg-gray-200 flex-shrink-0 shadow-md`}>
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
            <span className="text-xs text-gray-600">No avatar</span>
          </div>
        )}
      </div>

      {/* Name */}
      <div className="text-center">
        <p className="text-xs text-gray-600 uppercase tracking-wide font-bold">{isLeft ? "Them" : "You"}</p>
      </div>

      {/* Role */}
      {role && (
        <div className="text-center">
          <p className="text-sm font-bold text-gray-900">{name}</p>
          <p className="text-xs text-gray-600">{role}</p>
        </div>
      )}

      {/* Goal */}
      {goal && (
        <div className={`text-xs text-gray-800 leading-relaxed p-3 rounded-lg bg-gradient-to-br ${isLeft ? "from-orange-100 to-orange-50 border-2 border-orange-300" : "from-blue-100 to-blue-50 border-2 border-blue-300"} w-full max-w-sm shadow-sm`}>
          <p className="text-gray-700 text-xs font-semibold mb-1">Goal:</p>
          <p className="text-gray-800 text-xs">{goal}</p>
        </div>
      )}
    </div>
  );
}
