import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export abstract class AbstractEntity {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
}
