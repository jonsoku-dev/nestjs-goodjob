import { PartialType } from '@nestjs/swagger';
import { CommentCreateRequestDto } from './comment.create.request.dto';

export class CommentEditRequestDto extends PartialType(
  CommentCreateRequestDto,
) {}
