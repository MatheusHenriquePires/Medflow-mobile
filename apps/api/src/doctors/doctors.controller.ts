import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { SupabaseAuthGuard } from '../auth/guards/supabase-auth.guard';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DoctorsService } from './doctors.service';

@ApiTags('doctors')
@ApiBearerAuth()
@UseGuards(SupabaseAuthGuard, RolesGuard)
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  @Roles('ADMIN', 'DOCTOR')
  @ApiOperation({ summary: 'Lista médicos' })
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'DOCTOR')
  @ApiOperation({ summary: 'Busca médico por id' })
  findOne(@Param('id') id: string) {
    return this.doctorsService.findById(id);
  }

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Cria médico' })
  create(@Body() payload: CreateDoctorDto) {
    return this.doctorsService.create(payload);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Atualiza médico' })
  update(@Param('id') id: string, @Body() payload: UpdateDoctorDto) {
    return this.doctorsService.update(id, payload);
  }
}
