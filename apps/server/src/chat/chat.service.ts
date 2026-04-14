import { randomUUID } from "node:crypto";

import { Injectable } from "@nestjs/common";

import type {
  ApiResult,
  ChatRequest,
  ChatResponse,
  ToolExecutionResult
} from "@project/shared";

import { AgentService } from "../agent/agent.service.js";
import { ToolsRegistryService } from "../tools/tools-registry.service.js";
import { fail, ok } from "../common/api-result.util.js";

@Injectable()
export class ChatService {
  constructor(
    private readonly agentService: AgentService,
    private readonly toolsRegistry: ToolsRegistryService
  ) {}

  async handleChat(request: ChatRequest): Promise<ApiResult<ChatResponse>> {
    if (!request.message || request.message.trim().length === 0) {
      return fail({
        code: "INVALID_MESSAGE",
        message: "`message` is required and must not be empty"
      });
    }

    try {
      const decision = await this.agentService.decide(
        request.message,
        request.mode ?? "rule"
      );

      const toolResults: ToolExecutionResult[] = [];
      for (const call of decision.toolCalls) {
        const result = await this.toolsRegistry.execute(call);
        toolResults.push(result);
      }

      const answer = this.composeAnswer(decision.fallbackText, toolResults);

      const response: ChatResponse = {
        sessionId: request.sessionId ?? randomUUID(),
        answer,
        decision,
        toolResults
      };

      return ok(response);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown chat processing error";

      return fail({
        code: "CHAT_PROCESS_FAILED",
        message: errorMessage
      });
    }
  }

  private composeAnswer(
    fallbackText: string | undefined,
    toolResults: ToolExecutionResult[]
  ): string {
    if (toolResults.length === 0) {
      return fallbackText ?? "我可以帮你查询订单或医生信息。";
    }

    const orderResult = toolResults.find(
      (item): item is ToolExecutionResult<"getOrder"> =>
        item.status === "success" && item.name === "getOrder" && Boolean(item.data)
    );
    if (orderResult?.data) {
      const order = orderResult.data;
      return `已为你查询到订单：${order.orderNo}，状态：${order.status}，金额：${order.amountCny} 元。`;
    }

    const doctorResult = toolResults.find(
      (item): item is ToolExecutionResult<"getDoctor"> =>
        item.status === "success" && item.name === "getDoctor" && Boolean(item.data)
    );
    if (doctorResult?.data) {
      const doctor = doctorResult.data;
      return `已为你查询到医生：${doctor.name}（${doctor.title}），科室：${doctor.department}，出诊状态：${doctor.available ? "可预约" : "暂不可预约"}。`;
    }

    return "工具调用已执行，但暂无可展示的数据。";
  }
}
