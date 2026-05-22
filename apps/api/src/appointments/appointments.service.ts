import { Injectable } from '@nestjs/common';

import { BaseCrudService } from '../common/services/base-crud.service';
import { SupabaseService } from '../supabase/supabase.service';
import { AppointmentRecord } from './interfaces/appointment.interface';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsService extends BaseCrudService<
  AppointmentRecord,
  CreateAppointmentDto,
  UpdateAppointmentDto
> {
  constructor(supabaseService: SupabaseService) {
    super(supabaseService, 'appointments');
  }
}
