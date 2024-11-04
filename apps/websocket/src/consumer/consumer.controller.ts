import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { ConsumerService } from './consumer.service';

@Controller()
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @EventPattern('chat_created')
  async handleChatCreated(@Payload() data: any) {
    return this.consumerService.handleChatCreated(data);
  }
}
