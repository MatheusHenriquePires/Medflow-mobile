import { Injectable } from '@nestjs/common';

import { BaseCrudService } from '../common/services/base-crud.service';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationRecord } from './interfaces/notification.interface';

@Injectable()
export class NotificationsService extends BaseCrudService<
  NotificationRecord,
  CreateNotificationDto,
  UpdateNotificationDto
> {
  constructor(supabaseService: SupabaseService) {
    super(supabaseService, 'notifications');
  }
}
