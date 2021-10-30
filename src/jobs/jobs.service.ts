import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from './jobs.schema';
import { JobCreateRequestDto } from './dto/job.create.request.dto';
import { UsersRepository } from '../users/users.repository';
import { JobEditRequestDto } from './dto/job.edit.request.dto';

@Injectable()
export class JobsService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @InjectModel(Job.name) private readonly jobModel: Model<Job>,
  ) {}

  async getAllJob() {
    return this.jobModel.find();
  }

  async getJob(jobId: string) {
    return this.jobModel.findById(jobId);
  }

  async createJob(userId: string, body: JobCreateRequestDto) {
    const validatedUser =
      await this.usersRepository.findUserByIdWithoutPassword(userId);
    if (!validatedUser) {
      throw new UnauthorizedException('권한이 없습니다.');
    }
    let newJob = new this.jobModel({
      ...body,
      writer: validatedUser._id,
    });
    newJob = await newJob.save();
    return newJob;
  }

  async editJob(userId: string, jobId: string, body: JobEditRequestDto) {
    const validatedUser =
      await this.usersRepository.findUserByIdWithoutPassword(userId);
    if (!validatedUser) {
      throw new UnauthorizedException('권한이 없습니다.');
    }
    const foundJob = await this.jobModel.findById(jobId);
    if (!foundJob) {
      throw new NotFoundException('잡을 찾을 수 없습니다.');
    }
    if (!validatedUser._id.equals(foundJob.writer)) {
      throw new UnauthorizedException('권한이 없습니다.');
    }
    const editedJob = await this.jobModel.findByIdAndUpdate(
      foundJob._id,
      body,
      { new: true },
    );

    return editedJob;
  }

  async deleteJob(userId: string, jobId: string) {
    const validatedUser =
      await this.usersRepository.findUserByIdWithoutPassword(userId);
    if (!validatedUser) {
      throw new UnauthorizedException('권한이 없습니다.');
    }
    const foundJob = await this.jobModel.findById(jobId);
    if (!foundJob) {
      throw new NotFoundException('잡을 찾을 수 없습니다.');
    }
    if (!validatedUser._id.equals(foundJob.writer)) {
      throw new UnauthorizedException('권한이 없습니다.');
    }
    await this.jobModel.deleteOne({ _id: foundJob._id });
    return foundJob;
  }
}
