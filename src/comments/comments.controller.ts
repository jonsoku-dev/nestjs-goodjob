import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { CurrentUser } from '../common/decorators/current.user.decorator';
import { CommentsService } from './comments.service';
import { CommentReadonlyResponseDto } from './dto/comment.readonly.response.dto';
import { CommentCreateRequestDto } from './dto/comment.create.request.dto';
import { CommentEditRequestDto } from './dto/comment.edit.request.dto';

@Controller(':targetUserId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiResponse({
    status: 500,
    description: '서버에러',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: [CommentReadonlyResponseDto],
  })
  @ApiOperation({
    summary: '모든 댓글 가져오기',
  })
  @Get()
  getAllComment(@Param('targetUserId') targetUserId: string) {
    return this.commentsService.getAllComment(targetUserId);
  }

  @ApiResponse({
    status: 500,
    description: '서버에러',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: CommentReadonlyResponseDto,
  })
  @ApiOperation({
    summary: '댓글 생성하기',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @CurrentUser() user,
    @Param('targetUserId') targetUserId: string,
    @Body() body: CommentCreateRequestDto,
  ) {
    return this.commentsService.createComment(user.id, targetUserId, body);
  }

  @ApiResponse({
    status: 500,
    description: '서버에러',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: CommentReadonlyResponseDto,
  })
  @ApiOperation({
    summary: '댓글 수정하기',
  })
  @UseGuards(JwtAuthGuard)
  @Put(':commentId')
  edit(
    @Param('commentId') commentId: string,
    @Param('targetUserId') targetUserId: string,
    @CurrentUser() user,
    @Body() body: CommentEditRequestDto,
  ) {
    return this.commentsService.editComment(
      user.id,
      commentId,
      targetUserId,
      body,
    );
  }

  @ApiResponse({
    status: 500,
    description: '서버에러',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: CommentReadonlyResponseDto,
  })
  @ApiOperation({
    summary: '댓글 삭제하기',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':commentId')
  delete(
    @Param('commentId') commentId: string,
    @Param('targetUserId') targetUserId: string,
    @CurrentUser() user,
  ) {
    return this.commentsService.deleteComment(user.id, commentId, targetUserId);
  }
}
