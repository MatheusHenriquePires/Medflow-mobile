export interface AppointmentRecord extends Record<string, unknown> {
  id: string;
  doctor_id?: string;
  patient_id?: string;
  scheduled_at?: string;
  status?: string;
  notes?: string;
  created_at?: string;
}
