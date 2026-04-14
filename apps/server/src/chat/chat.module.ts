import { Module } from "@nestjs/common";

import { ChatController } from "./chat.controller.js";
import { ChatService } from "./chat.service.js";
import { AgentModule } from "../agent/agent.module.js";
import { ToolsModule } from "../tools/tools.module.js";

@Module({
  imports: [AgentModule, ToolsModule],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule {}
