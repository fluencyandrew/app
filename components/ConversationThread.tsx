"use client";

import { Message } from "@/data/domain";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "./MessageBubble";

interface ConversationThreadProps {
  messages: Message[];
}

export function ConversationThread({ messages }: ConversationThreadProps) {
  return (
    <ScrollArea className="h-full w-full bg-gradient-to-b from-background via-background to-background">
      <div className="flex flex-col gap-6 p-6">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full min-h-[400px]">
            <div className="text-center space-y-2">
              <p className="text-muted-foreground text-sm font-medium">
                Waiting for conversation to start...
              </p>
              <p className="text-muted-foreground/60 text-xs">
                The simulation will begin when you're ready.
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
      </div>
    </ScrollArea>
  );
}
