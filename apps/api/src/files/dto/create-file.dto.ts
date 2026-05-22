import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateFileDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  patient_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  medical_record_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  appointment_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  file_name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  file_url?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  mime_type?: string;

  @ApiPropertyOptional({ type: 'object', additionalProperties: true })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
