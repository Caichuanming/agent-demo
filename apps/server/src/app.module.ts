import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { ChatModule } from "./chat/chat.module.js";
import configuration from "./config/configuration.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    ChatModule
  ]
})
export class AppModule {}
