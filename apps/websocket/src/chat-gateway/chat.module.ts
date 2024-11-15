import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { AuthCheckModule } from '@app/libs/auth-check/auth-check.module';
import { WsJwtGuard } from '../guards/ws-jwt.guard';

@Module({
  imports: [AuthCheckModule],
  providers: [ChatGateway, WsJwtGuard],
  exports: [ChatGateway],
})
export class ChatModule {}
