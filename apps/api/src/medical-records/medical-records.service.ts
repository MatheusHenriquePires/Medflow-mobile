import { Injectable } from '@nestjs/common';

import { BaseCrudService } from '../common/services/base-crud.service';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { MedicalRecordRecord } from './interfaces/medical-record.interface';

@Injectable()
export class MedicalRecordsService extends BaseCrudService<
  MedicalRecordRecord,
  CreateMedicalRecordDto,
  UpdateMedicalRecordDto
> {
  constructor(supabaseService: SupabaseService) {
    super(supabaseService, 'medical_records');
  }
}
