"use client";

import { Message } from "@/data/domain";
import { MessageBubble } from "./MessageBubble";

interface ConversationThreadProps {
  messages: Message[];
}

export function ConversationThread({ messages }: ConversationThreadProps) {
  return (
    <div className="flex-1 overflow-y-auto p-panel-pad space-y-msg-gap">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted">Waiting for conversation to start...</p>
        </div>
      ) : (
        messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))
      )}
    </div>
  );
}
