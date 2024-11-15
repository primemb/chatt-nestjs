import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findOne(email: string) {
    return await this.usersRepository.findOne({ email });
  }

  async create(createUserInput: CreateUserDto) {
    try {
      return await this.usersRepository.create({
        ...createUserInput,
      });
    } catch (err) {
      if (err.message.includes('E11000')) {
        throw new UnprocessableEntityException('Email already exists');
      }
      throw err;
    }
  }
}
