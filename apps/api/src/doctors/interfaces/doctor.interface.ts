export interface DoctorRecord extends Record<string, unknown> {
  id: string;
  user_id?: string;
  nome?: string;
  especialidade?: string;
  crm?: string;
  created_at?: string;
}
