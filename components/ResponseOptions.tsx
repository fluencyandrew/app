"use client";

import { Sense } from "@/data/domain";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";

interface ResponseOptionsProps {
  options: Sense[];
  onSelect?: (option: Sense) => void;
  selectedId?: string;
}

export function ResponseOptions({
  options,
  onSelect,
  selectedId,
}: ResponseOptionsProps) {
  return (
    <div className="border-t border-border/50 bg-gradient-to-t from-background via-background/80 to-background/50 backdrop-blur-sm p-6">
      <div className="space-y-3">
        {/* Section Label */}
        <div className="mb-4">
          <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
            Select Response
          </p>
        </div>

        {/* Options Container */}
        <div className="space-y-3">
          {options.map((option) => {
            const isSelected = selectedId === option.id;

            return (
              <button
                key={option.id}
                onClick={() => onSelect?.(option)}
                className="w-full text-left transition-all duration-200 focus-ring group"
                aria-pressed={isSelected}
              >
                <Card
                  className={`option-card cursor-pointer overflow-hidden ${
                    isSelected ? "option-card-selected" : ""
                  }`}
                >
                  <CardContent className="p-4 space-y-3">
                    {/* Option Text */}
                    <div className="flex items-start gap-3">
                      {/* Selection Indicator */}
                      <div
                        className={`flex-shrink-0 h-5 w-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 mt-0.5 ${
                          isSelected
                            ? "bg-accent/20 border-accent/80"
                            : "border-border/60 group-hover:border-accent/50"
                        }`}
                      >
                        {isSelected && (
                          <Check className="h-3 w-3 text-accent animate-fade-in-down" />
                        )}
                      </div>

                      {/* Response Text */}
                      <div className="flex-1">
                        <p className={`text-replaceable leading-snug transition-colors duration-200 ${
                          isSelected
                            ? "text-foreground"
                            : "text-foreground/90 group-hover:text-foreground"
                        }`}>
                          {option.fullFormTemplate}
                        </p>
                      </div>
                    </div>

                    {/* Pill Metadata */}
                    {option.pill && (
                      <>
                        <Separator className="my-2 bg-border/30" />
                        <div className="flex gap-2 flex-wrap">
                          <Badge
                            variant="secondary"
                            className={`text-xs font-medium transition-colors duration-200 ${
                              isSelected
                                ? "bg-accent/30 text-accent/90"
                                : "bg-muted/50 text-muted-foreground"
                            }`}
                          >
                            {option.pill.statusSignal}
                          </Badge>
                          {option.pill.roleHierarchy && (
                            <Badge
                              variant="outline"
                              className={`text-xs font-medium transition-colors duration-200 ${
                                isSelected
                                  ? "border-accent/50 text-accent/80"
                                  : "border-border/50 text-muted-foreground/70"
                              }`}
                            >
                              {option.pill.roleHierarchy}
                            </Badge>
                          )}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
