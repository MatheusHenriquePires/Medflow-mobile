import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SupabaseAuthGuard } from '../auth/guards/supabase-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@ApiTags('appointments')
@ApiBearerAuth()
@UseGuards(SupabaseAuthGuard, RolesGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  @Roles('ADMIN', 'DOCTOR')
  @ApiOperation({ summary: 'Lista consultas' })
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'DOCTOR', 'PATIENT')
  @ApiOperation({ summary: 'Busca consulta por id' })
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findById(id);
  }

  @Post()
  @Roles('ADMIN', 'DOCTOR')
  @ApiOperation({ summary: 'Cria consulta' })
  create(@Body() payload: CreateAppointmentDto) {
    return this.appointmentsService.create(payload);
  }

  @Patch(':id')
  @Roles('ADMIN', 'DOCTOR')
  @ApiOperation({ summary: 'Atualiza consulta' })
  update(@Param('id') id: string, @Body() payload: UpdateAppointmentDto) {
    return this.appointmentsService.update(id, payload);
  }
}
