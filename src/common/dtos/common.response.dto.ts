import { ApiProperty } from '@nestjs/swagger';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CommonResponseDto<T> {
  @ApiProperty({
    example: true,
    description: '성공여부',
  })
  success: boolean;

  @ApiModelProperty({
    description: 'data',
  })
  readonly data: T;

  constructor(data: any = {}) {
    this.data = data;
  }
}
