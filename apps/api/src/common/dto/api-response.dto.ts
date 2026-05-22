import { ApiProperty } from '@nestjs/swagger';

import { ApiErrorDto } from './api-error.dto';

export class ApiResponseDto<TData = unknown> {
  @ApiProperty({ nullable: true })
  data!: TData | null;

  @ApiProperty({ nullable: true, type: ApiErrorDto })
  error!: ApiErrorDto | null;

  @ApiProperty({ example: 200 })
  status!: number;
}
