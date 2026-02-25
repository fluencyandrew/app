"use client";

import { Pill } from "@/data/domain";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface PillCardProps {
  pill: Pill;
}

const metaLabels: Record<string, string> = {
  roleHierarchy: "Role Hierarchy",
  emotionalTemperature: "Emotional Temperature",
  temporalCondition: "Temporal Condition",
  statusSignal: "Status Signal",
  participantStructure: "Communicative Effect",
};

const metaTooltips: Record<string, string> = {
  roleHierarchy: "The hierarchical relationship between participants (peer-to-peer, superior-subordinate, etc.)",
  emotionalTemperature: "The emotional tone or temperature of the exchange (warm, neutral, formal, etc.)",
  temporalCondition: "The temporal context (immediate, future reference, hypothetical, etc.)",
  statusSignal: "The social signal conveyed through language choices",
  participantStructure: "How the participant role shapes communicative possibilities",
};

export function PillCard({ pill }: PillCardProps) {
  const metaItems = [
    { key: "roleHierarchy", value: pill.roleHierarchy || "Peer to Peer" },
    { key: "emotionalTemperature", value: pill.emotionalTemperature },
    { key: "temporalCondition", value: pill.temporalCondition },
    { key: "statusSignal", value: pill.statusSignal },
    { key: "participantStructure", value: pill.participantStructure },
  ];

  return (
    <TooltipProvider>
      <Card className="border-authority-purple/40 bg-gradient-to-br from-authority-purple/15 to-precision-blue/10 card-elevated">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <CardTitle className="section-label">Active Pill</CardTitle>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help transition-colors" />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="text-xs max-w-xs">
                  The active pill represents the communicative parameters governing this interaction.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {metaItems.map((item, idx) => (
            <div key={idx}>
              {idx > 0 && <Separator className="mb-4 bg-border/20" />}

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground tracking-widest uppercase font-semibold">
                    {metaLabels[item.key] || item.key}
                  </p>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground/50 hover:text-muted-foreground cursor-help transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p className="text-xs max-w-xs">
                        {metaTooltips[item.key] || "Additional context information"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <Badge
                  variant="secondary"
                  className="bg-authority-purple/20 text-authority-purple/90 border-authority-purple/30 text-sm font-medium capitalize"
                >
                  {item.value}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
