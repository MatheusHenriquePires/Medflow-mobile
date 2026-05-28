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

  async createForPatient(userId: string, payload: CreateAppointmentDto) {
    const patientId = await this.findPatientId(userId);
    const appointmentPayload = this.toDatabasePayload(payload);

    return this.create({
      ...appointmentPayload,
      patient_id: patientId,
      status: payload.status ?? 'PENDING',
    });
  }

  async updateForPatient(id: string, userId: string, payload: UpdateAppointmentDto) {
    const patientId = await this.findPatientId(userId);
    const appointmentPayload = this.toDatabasePayload(payload);

    return this.update(id, {
      ...appointmentPayload,
      patient_id: patientId,
    });
  }

  private async findPatientId(userId: string): Promise<string> {
    const client = this.supabaseService.getAdminClient();
    const { data, error } = await client
      .from('patients')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    this.supabaseService.handleError(error, 'Failed to fetch patient profile');

    if (data?.id) {
      return data.id as string;
    }

    const { data: insertedPatient, error: insertError } = await client
      .from('patients')
      .insert({ user_id: userId })
      .select('id')
      .single();

    this.supabaseService.handleError(insertError, 'Failed to create patient profile');
    return this.supabaseService.ensureData(
      insertedPatient as { id: string } | null,
      'Failed to create patient profile',
    ).id;
  }

  private toDatabasePayload(payload: CreateAppointmentDto | UpdateAppointmentDto) {
    const {
      metadata: _metadata,
      scheduled_at,
      notes,
      ...appointmentPayload
    } = payload;

    return {
      ...appointmentPayload,
      ...(scheduled_at ? { data_consulta: scheduled_at } : {}),
      ...(notes ? { observacoes: notes } : {}),
    };
  }
}
