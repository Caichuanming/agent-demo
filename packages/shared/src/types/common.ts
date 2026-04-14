export type ID = string;
export type ISODateTimeString = string;

export type RuntimeEnv = "local" | "dev" | "test" | "prod";

export type ChatRole = "user" | "assistant" | "system" | "tool";

export interface ChatMessage {
  id: ID;
  role: ChatRole;
  content: string;
  createdAt: ISODateTimeString;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}

export type ModelProvider = "fake" | "openai" | "anthropic" | "custom";
