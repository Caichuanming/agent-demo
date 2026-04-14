import { Body, Controller, Post } from "@nestjs/common";

import type { ApiResult, ChatResponse } from "@project/shared";

import { ChatService } from "./chat.service.js";
import { ChatRequestDto } from "./dto/chat-request.dto.js";

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post("chat")
  async chat(@Body() body: ChatRequestDto): Promise<ApiResult<ChatResponse>> {
    return this.chatService.handleChat(body);
  }
}
