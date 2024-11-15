import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import * as fs from 'fs';
import { join, resolve } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '@app/libs/users/users.module';
import { DatabaseModule } from '@app/libs/database/database.module';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/auth/.env.development'],
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        privateKey: fs.readFileSync(
          join(
            resolve(),
            'libs',
            'libs',
            'src',
            'auth-check',
            'keys',
            'private.key',
          ),
          'utf8',
        ),
        signOptions: {
          algorithm: 'RS256',
          expiresIn: configService.get('JWT_EXPIRATION'),
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    LocalStrategy,
    AuthService,
  ],
})
export class AuthModule {}
