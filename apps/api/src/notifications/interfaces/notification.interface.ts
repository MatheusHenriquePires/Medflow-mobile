export interface NotificationRecord extends Record<string, unknown> {
  id: string;
  user_id?: string;
  title?: string;
  message?: string;
  type?: string;
  read_at?: string;
  created_at?: string;
}
