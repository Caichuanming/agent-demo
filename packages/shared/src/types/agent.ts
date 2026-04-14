import type { ToolCall } from "./tool";
import type { ModelProvider } from "./common";

export type AgentIntent = "order_query" | "doctor_query" | "general_query";

export type AgentMode = "rule" | "llm" | "auto";

export interface AgentDecision {
  intent: AgentIntent;
  confidence: number;
  shouldCallTools: boolean;
  toolCalls: ToolCall[];
  fallbackText?: string;
  mode: AgentMode;
  reason: string;
}

export interface AgentModelInput {
  message: string;
  mode: AgentMode;
  availableTools: string[];
}

export interface AgentModelOutput {
  intent: AgentIntent;
  confidence: number;
  toolCalls: ToolCall[];
  replyDraft?: string;
}

export interface AgentModelAdapter {
  provider: ModelProvider;
  decide(input: AgentModelInput): Promise<AgentModelOutput>;
}
