import { PickType } from '@nestjs/swagger';
import { User } from '../users.schema';

export class SignupRequestDto extends PickType(User, [
  'email',
  'username',
  'description',
  'password',
  'age',
  'sex',
] as const) {}
