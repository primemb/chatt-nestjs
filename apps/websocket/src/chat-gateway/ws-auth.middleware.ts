import { REQUEST_USER_KEY } from '@app/libs/auth-check/auth-check.constants';
import { AuthCheckService } from '@app/libs/auth-check/auth-check.service';
import { TokenPayload } from '@app/libs/auth-check/interface/token-payload.interface';
import { Socket } from 'socket.io';

export interface AuthSocket extends Socket {
  user: TokenPayload;
}
export type SocketMiddleware = (
  socket: Socket,
  next: (err?: Error) => void,
) => void;
export const WSAuthMiddleware = (
  authCheckService: AuthCheckService,
): SocketMiddleware => {
  return async (client: AuthSocket, next) => {
    try {
      const authToken: string = client.handshake.headers.authorization;
      if (!authToken) {
        next({
          name: 'Unauthorizaed',
          message: 'Unauthorizaed',
        });
      }

      const token = authToken.startsWith('Bearer ')
        ? authToken.split(' ')[1]
        : authToken;
      const payload = (await authCheckService.verifyToken(
        token,
      )) as TokenPayload;
      client[REQUEST_USER_KEY] = payload;
      next();
    } catch (error) {
      next({
        name: 'Unauthorizaed',
        message: 'Unauthorizaed',
      });
    }
  };
};
