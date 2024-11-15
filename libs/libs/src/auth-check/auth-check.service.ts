import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interface/token-payload.interface';

@Injectable()
export class AuthCheckService {
  constructor(private readonly jwtService: JwtService) {}

  async verifyToken(token: string): Promise<TokenPayload> {
    return this.jwtService.verify(token);
  }
}
