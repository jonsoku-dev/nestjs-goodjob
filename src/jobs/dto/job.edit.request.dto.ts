import { PartialType } from '@nestjs/swagger';
import { JobCreateRequestDto } from './job.create.request.dto';

export class JobEditRequestDto extends PartialType(JobCreateRequestDto) {}
