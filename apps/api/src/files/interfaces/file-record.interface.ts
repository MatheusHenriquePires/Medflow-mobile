export interface FileRecord extends Record<string, unknown> {
  id: string;
  patient_id?: string;
  medical_record_id?: string;
  appointment_id?: string;
  file_name?: string;
  file_url?: string;
  mime_type?: string;
  created_at?: string;
}
