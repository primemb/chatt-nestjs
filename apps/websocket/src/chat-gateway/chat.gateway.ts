import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TokenPayload } from '@app/libs/auth-check/interface/token-payload.interface';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { AuthCheckService } from '@app/libs/auth-check/auth-check.service';
import { WSAuthMiddleware } from './ws-auth.middleware';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements NestGateway {
  constructor(private readonly authCheckService: AuthCheckService) {}

  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    const middle = WSAuthMiddleware(this.authCheckService);
    server.use(middle);
    console.log(`WS ${ChatGateway.name} init`);
  }

  handleConnection(client: Socket) {
    const user = client['user'];
    console.log(`User ${user.email} connected`);
    // You can emit an event or perform actions with the user information
  }

  handleDisconnect(client: Socket) {
    const user = client['user'] as TokenPayload;
    //console.log(`User ${user.email} disconnected`);
    // Handle disconnection logic
  }

  sendMessage(message: any) {
    this.server.emit('chat_created', message);
  }
}
