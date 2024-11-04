import { Injectable } from '@nestjs/common';
import { ChatGateway } from '../chat-gateway/chat.gateway';
@Injectable()
export class ConsumerService {
  constructor(private readonly chatGateWay: ChatGateway) {}
  async handleChatCreated(data: any) {
    console.log('Chat created', data);

    this.chatGateWay.sendMessage(data);
  }
}
