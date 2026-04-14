import type { ApiResult, ChatRequest, ChatResponse } from "@project/shared";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

export async function postChat(message: string): Promise<ApiResult<ChatResponse>> {
  const payload: ChatRequest = {
    message,
    mode: "rule"
  };

  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data: unknown = await response.json();
  return data as ApiResult<ChatResponse>;
}
