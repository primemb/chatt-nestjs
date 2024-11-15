import { Module } from '@nestjs/common';
import { AuthCheckService } from './auth-check.service';
import { JwtModule } from '@nestjs/jwt';
import { publicKey } from './keys/publickey';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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
  providers: [AuthCheckService, JwtAuthGuard],
  exports: [AuthCheckService, JwtAuthGuard],
})
export class AuthCheckModule {}
