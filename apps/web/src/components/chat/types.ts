import type { ChatRole } from "@project/shared";

export interface ChatUIMessage {
  id: string;
  role: ChatRole;
  content: string;
}
