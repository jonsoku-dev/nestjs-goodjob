import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Comment extends Document {
  @ApiProperty({
    example: 'sadsadlkasdjlkasjdkasdjsad',
    description: 'post',
    required: true,
  })
  @Prop({
    required: true,
    type: Types.ObjectId,
  })
  @IsNotEmpty()
  post: Types.ObjectId | string;

  @ApiProperty({
    example: 'sadsadlkasdjlkasjdkasdjsad',
    description: '작성자',
    required: true,
  })
  @Prop({
    required: true,
    type: Types.ObjectId,
  })
  @IsNotEmpty()
  writer: Types.ObjectId | string;

  @ApiProperty({
    example: 'chance',
    description: 'chance',
  })
  @Prop()
  @IsNumber()
  @IsPositive()
  @Min(0)
  @Max(5)
  @IsOptional()
  chance: number;

  @ApiProperty({
    example: 'welfare',
    description: 'welfare',
  })
  @Prop()
  @IsNumber()
  @IsPositive()
  @Min(0)
  @Max(5)
  @IsOptional()
  welfare: number;

  @ApiProperty({
    example: 'balance',
    description: 'balance',
  })
  @Prop()
  @IsNumber()
  @IsPositive()
  @Min(0)
  @Max(5)
  @IsOptional()
  balance: number;

  @ApiProperty({
    example: 'culture',
    description: 'culture',
  })
  @Prop()
  @IsNumber()
  @IsPositive()
  @Min(0)
  @Max(5)
  @IsOptional()
  culture: number;

  @ApiProperty({
    example: 'salary',
    description: 'salary',
  })
  @Prop()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  salary: number;

  @ApiProperty({
    example: 'title',
    description: 'title',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'content',
    description: 'content',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
