import { Injectable } from '@nestjs/common';

import { BaseCrudService } from '../common/services/base-crud.service';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DoctorRecord } from './interfaces/doctor.interface';

@Injectable()
export class DoctorsService extends BaseCrudService<
  DoctorRecord,
  CreateDoctorDto,
  UpdateDoctorDto
> {
  constructor(supabaseService: SupabaseService) {
    super(supabaseService, 'doctors');
  }
}
