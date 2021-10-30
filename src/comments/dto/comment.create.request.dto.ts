import { Comment } from '../comments.schema';
import { PickType } from '@nestjs/swagger';

export class CommentCreateRequestDto extends PickType(Comment, [
  'title',
  'chance',
  'content',
  'welfare',
  'balance',
  'culture',
  'salary',
]) {}
