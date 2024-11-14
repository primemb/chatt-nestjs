import { AbstractRepository } from '@app/libs/database/abstract.repository';
import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { Chat } from './entities/chat.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ChatsRepository extends AbstractRepository<Chat> {
  protected readonly logger = new Logger(ChatsRepository.name);

  constructor(@InjectModel(Chat.name) chatModel: Model<Chat>) {
    super(chatModel);
  }
}
