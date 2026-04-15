import { Inject, Injectable } from "@nestjs/common";

import type { ToolCall, ToolExecutionResult, ToolName } from "@project/shared";

import { GetDoctorTool } from "./implementations/get-doctor.tool.js";
import { GetOrderTool } from "./implementations/get-order.tool.js";
import type { ToolHandler } from "./tool-handler.interface.js";

@Injectable()
export class ToolsRegistryService {
  private readonly tools: Map<ToolName, ToolHandler<ToolName>>;

  constructor(
    @Inject(GetOrderTool) getOrderTool: GetOrderTool,
    @Inject(GetDoctorTool) getDoctorTool: GetDoctorTool
  ) {
    this.tools = new Map<ToolName, ToolHandler<ToolName>>([
      [getOrderTool.name, getOrderTool as ToolHandler<ToolName>],
      [getDoctorTool.name, getDoctorTool as ToolHandler<ToolName>]
    ]);
  }

  async execute(call: ToolCall): Promise<ToolExecutionResult> {
    const handler = this.tools.get(call.name);
    if (!handler) {
      return {
        callId: call.id,
        name: call.name,
        status: "failed",
        errorMessage: `Tool \"${call.name}\" is not registered`
      };
    }

    try {
      const data = await handler.execute(call.arguments as never);
      return {
        callId: call.id,
        name: call.name,
        status: "success",
        data
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown tool error";
      return {
        callId: call.id,
        name: call.name,
        status: "failed",
        errorMessage
      };
    }
  }

  listTools(): ToolName[] {
    return [...this.tools.keys()];
  }
}
