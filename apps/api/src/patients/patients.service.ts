import { Injectable } from '@nestjs/common';

import { BaseCrudService } from '../common/services/base-crud.service';
import { SupabaseService } from '../supabase/supabase.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientRecord } from './interfaces/patient.interface';

@Injectable()
export class PatientsService extends BaseCrudService<
  PatientRecord,
  CreatePatientDto,
  UpdatePatientDto
> {
  constructor(supabaseService: SupabaseService) {
    super(supabaseService, 'patients');
  }
}
