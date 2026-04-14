import type { ChatUIMessage } from "./types";

interface MessageListProps {
  messages: ChatUIMessage[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      {messages.map((message) => {
        const alignRight = message.role === "user";
        return (
          <div
            key={message.id}
            style={{
              justifySelf: alignRight ? "end" : "start",
              maxWidth: "80%",
              padding: "10px 12px",
              borderRadius: 12,
              background: alignRight ? "#2563eb" : "#ffffff",
              color: alignRight ? "#ffffff" : "#111827",
              border: alignRight ? "none" : "1px solid #e5e7eb",
              whiteSpace: "pre-wrap"
            }}
          >
            {message.content}
          </div>
        );
      })}
    </div>
  );
}
