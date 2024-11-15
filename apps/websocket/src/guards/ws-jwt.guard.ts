import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { AuthCheckService } from '@app/libs/auth-check/auth-check.service';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private readonly authCheckService: AuthCheckService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const client: Socket = context.switchToWs().getClient();

    const authToken: string = client.handshake.headers.authorization;

    if (!authToken) {
      client.emit('error', 'Authentication token missing');
      client.disconnect();
      return false;
    }

    try {
      const token = authToken.startsWith('Bearer ')
        ? authToken.split(' ')[1]
        : authToken;
      const payload = this.authCheckService.verifyToken(token);
      client['user'] = payload; // Attach user info to client object
      return true;
    } catch (err) {
      client.emit('error', 'Invalid or expired token');
      client.disconnect();
      return false;
    }
  }
}
