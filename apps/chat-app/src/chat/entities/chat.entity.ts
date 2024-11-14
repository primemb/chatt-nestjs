import { AbstractEntity } from '@app/libs/database/abstract.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Chat extends AbstractEntity {
  @Prop({
    required: true,
  })
  sender: string;

  @Prop({
    required: true,
  })
  receiver: string;

  @Prop({
    required: true,
  })
  content: string;

  @Prop()
  timestamp?: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
