"use client";

import { Message } from "@/data/domain";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  // Get initials for avatar fallback
  const getInitials = (label?: string) => {
    if (!label) return "?";
    return label
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      className={`flex gap-4 items-end animate-slide-up ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar */}
      <Avatar className="h-14 w-14 flex-shrink-0 ring-1 ring-border/30">
        <AvatarImage
          src={message.avatarUrl}
          alt={message.roleLabel || "Speaker"}
        />
        <AvatarFallback className="bg-accent/20 text-accent font-semibold">
          {getInitials(message.roleLabel)}
        </AvatarFallback>
      </Avatar>

      {/* Message Content */}
      <div className={`flex flex-col gap-2 max-w-sm ${isUser ? "items-end" : "items-start"}`}>
        {/* Role Badge */}
        {message.roleLabel && (
          <Badge
            variant="outline"
            className={`text-xs font-semibold tracking-widest uppercase transition-all duration-200 ${
              isUser
                ? "border-accent/50 text-accent bg-accent/5"
                : "border-muted-foreground/30 text-muted-foreground bg-muted/5"
            }`}
          >
            {message.roleLabel}
          </Badge>
        )}

        {/* Message Card */}
        <Card
          className={`message-bubble transition-all duration-200 border ${
            isUser
              ? "message-bubble-user"
              : "message-bubble-interlocutor"
          }`}
        >
          <CardContent className="p-4">
            <p className="text-conversation leading-relaxed text-foreground">
              {message.content}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
