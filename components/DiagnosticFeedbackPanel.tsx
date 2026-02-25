"use client";

import { Pill } from "@/data/domain";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

interface DiagnosticFeedbackPanelProps {
  pill: Pill | null;
  isCorrect?: boolean;
  feedback?: string;
}

export function DiagnosticFeedbackPanel({
  pill,
  isCorrect = true,
  feedback,
}: DiagnosticFeedbackPanelProps) {
  if (!pill) return null;

  return (
    <div className="animate-fade-in-up">
      <Card className={`border feedback-panel ${
        isCorrect
          ? "border-strategic-green/40 bg-gradient-to-br from-strategic-green/10 to-strategic-green/5"
          : "border-caution-amber/40 bg-gradient-to-br from-caution-amber/10 to-caution-amber/5"
      }`}>
        <CardHeader className="pb-4">
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <CheckCircle2 className="h-5 w-5 text-strategic-green flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 text-caution-amber flex-shrink-0 mt-0.5" />
            )}
            <div>
              <CardTitle className="text-base">
                {isCorrect ? "Excellent Choice" : "Consider This"}
              </CardTitle>
              {feedback && (
                <p className="text-sm text-muted-foreground mt-1">{feedback}</p>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Status Signal */}
          <div>
            <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-2">
              Status Signal
            </p>
            <Badge
              variant="secondary"
              className="bg-accent/20 text-accent/90 border-accent/40"
            >
              {pill.statusSignal}
            </Badge>
          </div>

          <Separator className="bg-border/20" />

          {/* Communicative Parameters */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
              Communicative Parameters
            </p>

            <div className="grid grid-cols-2 gap-2">
              {pill.roleHierarchy && (
                <div className="flex items-center gap-2">
                  <Info className="h-3 w-3 text-muted-foreground/60" />
                  <span className="text-xs text-muted-foreground">
                    <span className="font-semibold">Role:</span> {pill.roleHierarchy}
                  </span>
                </div>
              )}

              {pill.emotionalTemperature && (
                <div className="flex items-center gap-2">
                  <Info className="h-3 w-3 text-muted-foreground/60" />
                  <span className="text-xs text-muted-foreground">
                    <span className="font-semibold">Tone:</span> {pill.emotionalTemperature}
                  </span>
                </div>
              )}

              {pill.temporalCondition && (
                <div className="flex items-center gap-2">
                  <Info className="h-3 w-3 text-muted-foreground/60" />
                  <span className="text-xs text-muted-foreground">
                    <span className="font-semibold">Temporal:</span> {pill.temporalCondition}
                  </span>
                </div>
              )}

              {pill.participantStructure && (
                <div className="flex items-center gap-2">
                  <Info className="h-3 w-3 text-muted-foreground/60" />
                  <span className="text-xs text-muted-foreground">
                    <span className="font-semibold">Effect:</span> {pill.participantStructure}
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
