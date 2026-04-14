import type { AgentMode, ChatRequest, ID } from "@project/shared";

export class ChatRequestDto implements ChatRequest {
  message!: string;
  mode?: AgentMode;
  sessionId?: ID;
  userId?: ID;
}
