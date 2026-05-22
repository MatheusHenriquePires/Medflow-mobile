import { ApiProperty } from '@nestjs/swagger';

export class ApiErrorDto {
  @ApiProperty({ example: 'Unauthorized' })
  message!: string | string[];

  @ApiProperty({ example: 'UnauthorizedException' })
  name!: string;
}
