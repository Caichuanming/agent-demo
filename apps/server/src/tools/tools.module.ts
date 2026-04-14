import { Module } from "@nestjs/common";

import { DomainModule } from "../domain/domain.module.js";
import { GetDoctorTool } from "./implementations/get-doctor.tool.js";
import { GetOrderTool } from "./implementations/get-order.tool.js";
import { ToolsRegistryService } from "./tools-registry.service.js";

@Module({
  imports: [DomainModule],
  providers: [GetOrderTool, GetDoctorTool, ToolsRegistryService],
  exports: [ToolsRegistryService]
})
export class ToolsModule {}
