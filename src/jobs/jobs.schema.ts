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
export class Job extends Document {
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

  @ApiProperty({
    example: 'department',
    description: 'department',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  department: string;

  @ApiProperty({
    example: 'employmentType',
    description: 'employmentType',
  })
  @Prop()
  @IsString()
  @IsOptional()
  employmentType: string;

  @ApiProperty({
    example: 'requirement',
    description: 'requirement',
    required: true,
  })
  @Prop()
  @IsString()
  @IsOptional()
  requirement: string;

  @ApiProperty({
    example: 'salary',
    description: 'salary',
  })
  @Prop()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  salary: number;
}

export const JobSchema = SchemaFactory.createForClass(Job);
