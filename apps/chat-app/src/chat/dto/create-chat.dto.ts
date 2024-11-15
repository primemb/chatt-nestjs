import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsMongoId,
} from 'class-validator';

export class CreateChatDto {
  @IsString()
  @IsMongoId()
  receiver: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsDateString()
  timestamp?: string;
}
