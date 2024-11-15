import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '@app/libs/users/users.module';
import { DatabaseModule } from '@app/libs/database/database.module';
import { LocalStrategy } from './strategies/local.strategy';
import { privateKey } from '@app/libs/auth-check/keys/privatekey';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/auth/.env.development'],
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        privateKey: privateKey,
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
