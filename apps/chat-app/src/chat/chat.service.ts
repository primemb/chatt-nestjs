import { Inject, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { CHAT_SERVICE } from '@app/libs/constants';
import { ClientProxy } from '@nestjs/microservices';
import { ChatsRepository } from './chat.repository';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '@app/libs/auth-check/interface/token-payload.interface';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatsRepository: ChatsRepository,
    @Inject(CHAT_SERVICE) private client: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  async createMessage(data: CreateChatDto, user: TokenPayload) {
    const chat = await this.chatsRepository.create({
      ...data,
      sender: user.sub,
    });

    console.log(this.configService.get('RABBITMQ_URL'));
    await this.client.connect();
    this.client.emit('chat_created', chat).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      },
    );

    return chat;
  }

  async getMessages() {
    return this.chatsRepository.find({});
  }

  async getMessageById(id: string) {
    return this.chatsRepository.findOne({ _id: id });
  }

  async updateMessage(id: string, data: UpdateChatDto) {
    return this.chatsRepository.findOneAndUpdate({ _id: id }, { ...data });
  }

  async deleteMessage(id: string) {
    return this.chatsRepository.findOneAndDelete({ _id: id });
  }
}
