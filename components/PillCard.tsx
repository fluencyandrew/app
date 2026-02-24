"use client";

import { Pill } from "@/data/domain";

interface PillCardProps {
  pill: Pill;
}

export function PillCard({ pill }: PillCardProps) {
  return (
    <div className="pill-card space-y-4 bg-gradient-to-br from-authority-purple/10 to-precision-blue/5 border border-authority-purple/30">
      <div>
        <div className="pill-label">Role Hierarchy</div>
        <div className="pill-value">{pill.roleHierarchy || "Peer to Peer"}</div>
      </div>

      <div>
        <div className="pill-label">Emotional Temperature</div>
        <div className="pill-value capitalize">{pill.emotionalTemperature}</div>
      </div>

      <div>
        <div className="pill-label">Temporal Condition</div>
        <div className="pill-value capitalize">{pill.temporalCondition}</div>
      </div>

      <div>
        <div className="pill-label">Status Signal</div>
        <div className="pill-value">{pill.statusSignal}</div>
      </div>

      <div>
        <div className="pill-label">Communicative Effect</div>
        <div className="pill-value text-sm">{pill.participantStructure}</div>
      </div>
    </div>
  );
}
