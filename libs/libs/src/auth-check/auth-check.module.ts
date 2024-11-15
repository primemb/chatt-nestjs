import { Module } from '@nestjs/common';
import { AuthCheckService } from './auth-check.service';
import { JwtModule } from '@nestjs/jwt';
import { join, resolve } from 'path';
import * as fs from 'fs';
import { publicKey } from './keys/publickey';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          publicKey: publicKey,
          verifyOptions: {
            algorithms: ['RS256'],
          },
        };
      },
    }),
  ],
  providers: [AuthCheckService],
  exports: [AuthCheckService],
})
export class AuthCheckModule {}
