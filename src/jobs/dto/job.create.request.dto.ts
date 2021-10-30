import { Job } from '../jobs.schema';
import { PickType } from '@nestjs/swagger';

export class JobCreateRequestDto extends PickType(Job, [
  'title',
  'content',
  'department',
  'employmentType',
  'requirement',
  'salary',
]) {}
