import { Inject, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PrismaService } from '@app/libs';
import { CHAT_SERVICE } from '@app/libs/constants';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    @Inject(CHAT_SERVICE) private client: ClientProxy,
  ) {}

  async createMessage(data: CreateChatDto) {
    const chat = await this.prisma.chatMessage.create({ data });

    this.client.emit('chat_created', chat);

    return chat;
  }

  async getMessages() {
    return this.prisma.chatMessage.findMany();
  }

  async getMessageById(id: string) {
    return this.prisma.chatMessage.findUnique({ where: { id } });
  }

  async updateMessage(id: string, data: UpdateChatDto) {
    return this.prisma.chatMessage.update({ where: { id }, data });
  }

  async deleteMessage(id: string) {
    return this.prisma.chatMessage.delete({ where: { id } });
  }
}
