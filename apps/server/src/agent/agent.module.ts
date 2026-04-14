import { Module } from "@nestjs/common";

import { AgentService } from "./agent.service.js";
import { FakeRuleAgentAdapter } from "./adapters/fake-rule-agent.adapter.js";

@Module({
  providers: [FakeRuleAgentAdapter, AgentService],
  exports: [AgentService]
})
export class AgentModule {}
