export interface UserProfile {
  id: string;
  nome: string;
  email: string;
  senha?: string | null;
  role: string;
  created_at?: string;
}
