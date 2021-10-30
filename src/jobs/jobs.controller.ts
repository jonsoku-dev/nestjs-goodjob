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
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { CurrentUser } from '../common/decorators/current.user.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JobReadonlyResponseDto } from './dto/job.readonly.response.dto';
import { JobsService } from './jobs.service';
import { JobCreateRequestDto } from './dto/job.create.request.dto';
import { JobEditRequestDto } from './dto/job.edit.request.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @ApiResponse({
    status: 500,
    description: '서버에러',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: [JobReadonlyResponseDto],
  })
  @ApiOperation({
    summary: '모든 잡 가져오기',
  })
  @Get()
  getAllJob() {
    return this.jobsService.getAllJob();
  }

  @ApiResponse({
    status: 500,
    description: '서버에러',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: JobReadonlyResponseDto,
  })
  @ApiOperation({
    summary: '특정 잡 가져오기',
  })
  @Get(':jobId')
  getJob(@Param('jobId') jobId: string) {
    return this.jobsService.getJob(jobId);
  }

  @ApiResponse({
    status: 500,
    description: '서버에러',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: JobReadonlyResponseDto,
  })
  @ApiOperation({
    summary: '잡 생성하기',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@CurrentUser() user, @Body() body: JobCreateRequestDto) {
    return this.jobsService.createJob(user._id, body);
  }

  @ApiResponse({
    status: 500,
    description: '서버에러',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: JobReadonlyResponseDto,
  })
  @ApiOperation({
    summary: '잡 수정하기',
  })
  @UseGuards(JwtAuthGuard)
  @Put(':jobId')
  edit(
    @Param('jobId') jobId: string,
    @CurrentUser() user,
    @Body() body: JobEditRequestDto,
  ) {
    return this.jobsService.editJob(user._id, jobId, body);
  }

  @ApiResponse({
    status: 500,
    description: '서버에러',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: JobReadonlyResponseDto,
  })
  @ApiOperation({
    summary: '잡 삭제하기',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':jobId')
  delete(@Param('jobId') jobId: string, @CurrentUser() user) {
    return this.jobsService.deleteJob(user._id, jobId);
  }
}
