import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/libs/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/chat-app/.env.development'],
    }),
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
