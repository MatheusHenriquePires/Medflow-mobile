export interface MedicalRecordRecord extends Record<string, unknown> {
  id: string;
  patient_id?: string;
  doctor_id?: string;
  appointment_id?: string;
  description?: string;
  diagnosis?: string;
  prescription?: string;
  created_at?: string;
}
