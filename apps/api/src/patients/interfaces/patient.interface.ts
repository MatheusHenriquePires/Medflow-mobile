export interface PatientRecord extends Record<string, unknown> {
  id: string;
  nome?: string;
  email?: string;
  telefone?: string;
  birth_date?: string;
  document?: string;
  created_at?: string;
}
