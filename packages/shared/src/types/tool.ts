import type { ID } from "./common";
import type { Doctor, Order } from "./domain";

export type ToolName = "getOrder" | "getDoctor";

export interface GetOrderArgs {
  orderNo?: string;
  patientName?: string;
}

export interface GetDoctorArgs {
  department?: string;
  doctorName?: string;
}

export interface ToolArgsMap {
  getOrder: GetOrderArgs;
  getDoctor: GetDoctorArgs;
}

export interface ToolOutputMap {
  getOrder: Order;
  getDoctor: Doctor;
}

export type ToolCallSource = "rule" | "llm";

export interface ToolCall<TName extends ToolName = ToolName> {
  id: ID;
  name: TName;
  arguments: ToolArgsMap[TName];
  source: ToolCallSource;
}

export type ToolExecutionStatus = "success" | "failed" | "skipped";

export interface ToolExecutionResult<TName extends ToolName = ToolName> {
  callId: ID;
  name: TName;
  status: ToolExecutionStatus;
  data?: ToolOutputMap[TName];
  errorMessage?: string;
}
