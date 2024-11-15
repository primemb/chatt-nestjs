import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { DatabaseModule } from '@app/libs/database/database.module';
import { Chat, ChatSchema } from './entities/chat.entity';
import { ChatsRepository } from './chat.repository';
import { AuthCheckModule } from '@app/libs/auth-check/auth-check.module';

@Module({
  imports: [
    AuthCheckModule,
    RabbitmqModule,
    DatabaseModule.forFeature([
      {
        name: Chat.name,
        schema: ChatSchema,
      },
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatsRepository],
})
export class ChatModule {}
