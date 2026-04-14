import { useState } from "react";

interface ChatInputProps {
  disabled?: boolean;
  onSend: (message: string) => Promise<void>;
}

export function ChatInput({ disabled = false, onSend }: ChatInputProps) {
  const [value, setValue] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      return;
    }

    setValue("");
    await onSend(trimmed);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="请输入消息，例如：帮我查订单 123456"
        disabled={disabled}
        style={{
          flex: 1,
          padding: "10px 12px",
          borderRadius: 10,
          border: "1px solid #d1d5db",
          outline: "none"
        }}
      />
      <button
        type="submit"
        disabled={disabled}
        style={{
          padding: "10px 14px",
          borderRadius: 10,
          border: "none",
          background: disabled ? "#9ca3af" : "#2563eb",
          color: "#ffffff",
          cursor: disabled ? "not-allowed" : "pointer"
        }}
      >
        发送
      </button>
    </form>
  );
}
