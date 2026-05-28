export interface AppointmentRecord extends Record<string, unknown> {
  id: string;
  doctor_id?: string;
  patient_id?: string;
  data_consulta?: string;
  status?: string;
  observacoes?: string;
  meet_link?: string;
  created_at?: string;
}
