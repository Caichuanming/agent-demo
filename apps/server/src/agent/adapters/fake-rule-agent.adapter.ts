import { randomUUID } from "node:crypto";

import { Injectable } from "@nestjs/common";

import type { AgentModelAdapter, AgentModelInput, AgentModelOutput, ToolCall } from "@project/shared";

@Injectable()
export class FakeRuleAgentAdapter implements AgentModelAdapter {
  readonly provider = "fake" as const;

  async decide(input: AgentModelInput): Promise<AgentModelOutput> {
    const text = input.message.trim();

    if (text.includes("订单")) {
      const toolCall: ToolCall<"getOrder"> = {
        id: randomUUID(),
        name: "getOrder",
        arguments: {
          orderNo: this.extractOrderNo(text)
        },
        source: "rule"
      };

      return {
        intent: "order_query",
        confidence: 0.95,
        toolCalls: [toolCall],
        replyDraft: "我来帮你查询订单信息。"
      };
    }

    if (text.includes("医生")) {
      const toolCall: ToolCall<"getDoctor"> = {
        id: randomUUID(),
        name: "getDoctor",
        arguments: {
          department: this.extractDepartment(text)
        },
        source: "rule"
      };

      return {
        intent: "doctor_query",
        confidence: 0.93,
        toolCalls: [toolCall],
        replyDraft: "我来帮你查询医生信息。"
      };
    }

    return {
      intent: "general_query",
      confidence: 0.8,
      toolCalls: [],
      replyDraft: "目前我可以帮你查订单或医生信息。你可以试试说“帮我查订单”或“帮我找医生”。"
    };
  }

  private extractOrderNo(text: string): string | undefined {
    const match = text.match(/(\d{6,})/);
    return match?.[1];
  }

  private extractDepartment(text: string): string | undefined {
    const departments = ["内科", "外科", "儿科", "皮肤科", "神经科"];
    const hit = departments.find((item) => text.includes(item));
    return hit;
  }
}
