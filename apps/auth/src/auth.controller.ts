import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { CurrentUser } from '@app/libs/auth-check/decorators/current-user.decorator';
import { CreateUserDto } from '@app/libs/users/dto/create-user.dto';
import { User } from '@app/libs/users/entities/user.entity';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@CurrentUser() user: User) {
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() registerDto: CreateUserDto) {
    return this.authService.register(registerDto);
  }
}
