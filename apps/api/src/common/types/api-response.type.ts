export interface ApiResponse<T> {
  data: T | null;
  error: unknown;
  status: number;
}
