import type { ToolArgsMap, ToolName, ToolOutputMap } from "@project/shared";

export interface ToolHandler<TName extends ToolName> {
  readonly name: TName;
  execute(args: ToolArgsMap[TName]): Promise<ToolOutputMap[TName]>;
}
