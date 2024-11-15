import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { UsersService } from '@app/libs/users/users.service';
import { CreateUserDto } from '@app/libs/users/dto/create-user.dto';
import { User } from '@app/libs/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '@app/libs/auth-check/interface/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(user: User) {
    const expires = new Date();

    expires.setSeconds(
      expires.getSeconds() + this.configService.getOrThrow('JWT_EXPIRATION'),
    );

    const token = await this.generateToken(user);

    return { token };
  }

  async register(registerDto: CreateUserDto) {
    const userExist = await this.userService.findOne(registerDto.email);

    if (userExist) {
      throw new UnprocessableEntityException('User already exists');
    }

    const password = await this.hashingService.hash(registerDto.password);

    const user = await this.userService.create({ ...registerDto, password });

    const token = await this.generateToken(user);

    return { token };
  }

  async verifyUser(email: string, password: string) {
    const user = await this.userService.findOne(email);

    const passwordIsValid = await this.hashingService.compare(
      password,
      user.password,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  private async generateToken(user: User) {
    const tokenPayload: TokenPayload = {
      sub: user._id.toHexString(),
      email: user.email,
    };

    return this.jwtService.sign(tokenPayload);
  }
}
