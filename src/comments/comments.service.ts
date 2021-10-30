import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './comments.schema';
import { Model } from 'mongoose';
import { CommentCreateRequestDto } from './dto/comment.create.request.dto';
import { CommentEditRequestDto } from './dto/comment.edit.request.dto';
import { UsersRepository } from '../users/users.repository';
import * as mongoose from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  async getAllComment(targetUserId: string) {
    let postId;
    try {
      postId = new mongoose.Types.ObjectId(targetUserId);
    } catch (e) {
      throw new BadRequestException('잘못된 유저 아이디입니다.');
    }
    return this.commentModel.find({
      post: postId,
    });
  }

  async createComment(
    userId: string,
    targetUserId: string,
    body: CommentCreateRequestDto,
  ) {
    const validatedTargetUser =
      await this.usersRepository.findUserByIdWithoutPassword(targetUserId);

    if (!validatedTargetUser) {
      throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
    }

    const validatedUser =
      await this.usersRepository.findUserByIdWithoutPassword(userId);

    if (!validatedUser) {
      throw new NotFoundException('권한이없습니다.');
    }

    let newComment = new this.commentModel({
      ...body,
      post: validatedTargetUser._id,
      writer: validatedUser._id,
    });
    newComment = await newComment.save();
    return newComment;
  }

  async editComment(
    userId: string,
    commentId: string,
    targetUserId: string,
    body: CommentEditRequestDto,
  ) {
    const validatedTargetUser =
      await this.usersRepository.findUserByIdWithoutPassword(targetUserId);

    if (!validatedTargetUser) {
      throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
    }

    const foundComment = await this.commentModel.findById(commentId);

    if (!foundComment) {
      throw new NotFoundException('해당 댓글을 찾을 수 없습니다.');
    }

    const validatedUser =
      await this.usersRepository.findUserByIdWithoutPassword(userId);

    if (!validatedUser._id.equals(foundComment.writer)) {
      throw new NotFoundException('권한이없습니다.');
    }

    const editedComment = await this.commentModel.findByIdAndUpdate(
      foundComment._id,
      body,
      {
        new: true,
      },
    );

    return editedComment;
  }

  async deleteComment(userId: string, commentId: string, targetUserId: string) {
    const validatedTargetUser =
      await this.usersRepository.findUserByIdWithoutPassword(targetUserId);

    if (!validatedTargetUser) {
      throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
    }

    const foundComment = await this.commentModel.findById(commentId);

    if (!foundComment) {
      throw new NotFoundException('해당 댓글을 찾을 수 없습니다.');
    }

    const validatedUser =
      await this.usersRepository.findUserByIdWithoutPassword(userId);

    if (!validatedUser._id.equals(foundComment.writer)) {
      throw new NotFoundException('권한이없습니다.');
    }

    await this.commentModel.deleteOne({ _id: foundComment._id });

    return foundComment;
  }
}
