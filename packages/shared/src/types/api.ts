import type { ID, ISODateTimeString } from "./common";
import type { AgentDecision, AgentMode } from "./agent";
import type { ToolExecutionResult } from "./tool";

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string | number | boolean>;
}

export interface ApiMeta {
  requestId: ID;
  timestamp: ISODateTimeString;
  version: string;
}

export type ApiResult<T> =
  | {
      success: true;
      data: T;
      meta: ApiMeta;
    }
  | {
      success: false;
      error: ApiError;
      meta: ApiMeta;
    };

export interface ChatRequest {
  sessionId?: ID;
  message: string;
  mode?: AgentMode;
  userId?: ID;
}

export interface ChatResponse {
  sessionId: ID;
  answer: string;
  decision: AgentDecision;
  toolResults: ToolExecutionResult[];
}
