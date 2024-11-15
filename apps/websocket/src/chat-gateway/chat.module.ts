import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { AuthCheckModule } from '@app/libs/auth-check/auth-check.module';

@Module({
  imports: [AuthCheckModule],
  providers: [ChatGateway],
  exports: [ChatGateway],
})
export class ChatModule {}
