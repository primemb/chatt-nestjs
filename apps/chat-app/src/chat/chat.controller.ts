import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { JwtAuthGuard } from '@app/libs/auth-check/guards/jwt-auth.guard';
import { CurrentUser } from '@app/libs/auth-check/decorators/current-user.decorator';
import { TokenPayload } from '@app/libs/auth-check/interface/token-payload.interface';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createChatDto: CreateChatDto,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.chatService.createMessage(createChatDto, user);
  }

  @Get()
  findAll() {
    return this.chatService.getMessages();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.getMessageById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.updateMessage(id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.deleteMessage(id);
  }
}
