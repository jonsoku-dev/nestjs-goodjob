import { ApiProperty, OmitType } from '@nestjs/swagger';
import { User } from '../users.schema';

export class ReadOnlyUserDto extends OmitType(User, ['password'] as const) {
  @ApiProperty({
    example: '6179f8b10121056d32bb9564',
    description: 'id',
  })
  id: string;
}
