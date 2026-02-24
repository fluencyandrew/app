"use client";

import { Message } from "@/data/domain";

export function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-4 items-end ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && message.avatarUrl && (
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={message.avatarUrl}
            alt={message.roleLabel || "Interlocutor"}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
        {message.roleLabel && (
          <span className="text-pill-meta mb-2">{message.roleLabel.toUpperCase()}</span>
        )}
        <div className="message-bubble">
          <p className="text-conversation leading-relaxed">{message.content}</p>
        </div>
      </div>

      {isUser && message.avatarUrl && (
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={message.avatarUrl}
            alt="You"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
