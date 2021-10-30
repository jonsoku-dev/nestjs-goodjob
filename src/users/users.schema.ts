import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export enum USER_ROLE {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum USER_SEX {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
}

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class User extends Document {
  @ApiProperty({
    example: 'the2792@gmail.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'jonsoku',
    description: 'username',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'Hi, i am jongseok lee',
    description: 'description',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'http://abc.com/image/efg.png',
    description: 'avatar',
  })
  @Prop()
  @IsString()
  avatar: string;

  @ApiProperty({
    example: '123456',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: false,
    description: 'isblock',
    default: false,
  })
  @Prop({
    default: false,
  })
  @IsBoolean()
  isblock: boolean;

  @ApiProperty({ enum: USER_ROLE, enumName: 'USER_ROLE' })
  @Prop({
    enum: USER_ROLE,
    default: USER_ROLE.USER,
  })
  @IsEnum(USER_ROLE)
  role: USER_ROLE;

  @ApiProperty({
    example: 20,
    description: 'age',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  @Max(100)
  age: number;

  @ApiProperty({ enum: USER_SEX, enumName: 'USER_SEX', required: true })
  @Prop({
    enum: USER_SEX,
    default: USER_SEX.FEMALE,
    required: true,
  })
  @IsEnum(USER_SEX)
  @IsNotEmpty()
  sex: USER_SEX;

  readonly readOnlyData: {
    id: string;
    email: string;
    username: string;
    description: string;
    age: number;
    role: USER_ROLE;
    avatar: string;
    isblock: boolean;
    sex: USER_SEX;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('readOnlyData').get(function (this: User) {
  return {
    id: this.id,
    email: this.email,
    username: this.username,
    description: this.description,
    age: this.age,
    role: this.role,
    avatar: this.avatar,
    isblock: this.isblock,
    sex: this.sex,
  };
});
