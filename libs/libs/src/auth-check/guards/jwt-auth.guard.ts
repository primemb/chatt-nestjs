import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthCheckService } from '../auth-check.service';
import { REQUEST_USER_KEY } from '../auth-check.constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authCheckService: AuthCheckService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authToken = this.extractTokenFromHeader(request);

    if (!authToken) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    try {
      const payload = await this.authCheckService.verifyToken(authToken);
      request[REQUEST_USER_KEY] = payload;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const token = request.headers.authorization?.startsWith('Bearer ')
      ? request.headers.authorization.split(' ')[1]
      : request.headers.authorization;

    return token;
  }
}
