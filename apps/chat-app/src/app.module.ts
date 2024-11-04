import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app/libs';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/chat-app/.env'],
    }),
    PrismaModule,
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
