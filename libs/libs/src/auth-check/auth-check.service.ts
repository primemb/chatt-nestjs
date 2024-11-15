import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthCheckService {
  constructor(private readonly jwtService: JwtService) {}

  async verifyToken(token: string) {
    return this.jwtService.verify(token);
  }
}
