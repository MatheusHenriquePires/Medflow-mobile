export interface UserProfile {
  id: string;
  nome: string;
  email: string;
  senha?: string | null;
  role: string;
  telefone?: string | null;
  cpf?: string | null;
  dataNascimento?: string | null;
  metadata?: Record<string, unknown> | null;
  created_at?: string;
}
