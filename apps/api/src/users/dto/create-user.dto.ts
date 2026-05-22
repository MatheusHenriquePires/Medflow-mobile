import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsIn, IsOptional, IsString, MinLength } from 'class-validator';

import { APP_ROLES } from '../../common/constants/roles.constant';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  nome!: string;

  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({ enum: APP_ROLES, default: 'PATIENT' })
  @IsOptional()
  @IsIn(APP_ROLES)
  role?: string;

  @ApiPropertyOptional({ minLength: 6 })
  @IsOptional()
  @IsString()
  @MinLength(6)
  senha?: string;
}
