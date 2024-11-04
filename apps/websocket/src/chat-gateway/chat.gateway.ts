import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    this.server.emit('connection', 'New client connected');
  }

  handleDisconnect(client: Socket) {
    this.server.emit('disconnection', 'Client disconnected');
  }

  sendMessage(message: any) {
    this.server.emit('chat_created', message);
  }
}
