"use client";

import { useState } from "react";

import { postChat } from "@/lib/api-client";

import { ChatInput } from "./ChatInput";
import { MessageList } from "./MessageList";
import type { ChatUIMessage } from "./types";

function createMessage(role: ChatUIMessage["role"], content: string): ChatUIMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content
  };
}

export function ChatWindow() {
  const [messages, setMessages] = useState<ChatUIMessage[]>([
    createMessage("assistant", "你好，我是 AI 医疗助手。你可以让我查询订单或医生信息。")
  ]);
  const [loading, setLoading] = useState(false);

  async function handleSend(message: string): Promise<void> {
    setMessages((prev) => [...prev, createMessage("user", message)]);
    setLoading(true);

    try {
      const result = await postChat(message);

      if (!result.success) {
        setMessages((prev) => [
          ...prev,
          createMessage("assistant", `请求失败：${result.error.message}`)
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        createMessage("assistant", result.data.answer)
      ]);
    } catch (error) {
      const messageText = error instanceof Error ? error.message : "Unknown network error";
      setMessages((prev) => [
        ...prev,
        createMessage("assistant", `网络异常：${messageText}`)
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        maxWidth: 760,
        margin: "40px auto",
        padding: 16
      }}
    >
      <h1 style={{ marginTop: 0 }}>AI 医疗助手（MVP）</h1>
      <section
        style={{
          display: "grid",
          gap: 12,
          padding: 16,
          background: "#eef2ff",
          border: "1px solid #dbeafe",
          borderRadius: 14,
          minHeight: 420
        }}
      >
        <MessageList messages={messages} />
        <ChatInput disabled={loading} onSend={handleSend} />
      </section>
    </main>
  );
}
