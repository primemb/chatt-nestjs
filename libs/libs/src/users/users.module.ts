import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './user.repository';
import { DatabaseModule } from '../database/database.module';
import { User, UserSchema } from './entities/user.entity';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
