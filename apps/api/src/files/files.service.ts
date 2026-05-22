import { Injectable } from '@nestjs/common';

import { BaseCrudService } from '../common/services/base-crud.service';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileRecord } from './interfaces/file-record.interface';

@Injectable()
export class FilesService extends BaseCrudService<FileRecord, CreateFileDto, UpdateFileDto> {
  constructor(supabaseService: SupabaseService) {
    super(supabaseService, 'files');
  }
}
