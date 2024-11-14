import { Module } from '@nestjs/common';
import { ConsumerModule } from './consumer/consumer.module';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat-gateway/chat.module';

@Module({
  imports: [
    ChatModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/websocket/.env.development'],
    }),
    ConsumerModule,
  ],
})
export class GatewayModule {}
