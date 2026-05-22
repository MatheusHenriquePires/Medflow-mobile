import type { ApiResponse } from '../types/api-response.type';

export function toApiResponse<T>(
  data: T | null,
  status: number,
  error: unknown = null,
): ApiResponse<T> {
  return {
    data,
    error,
    status,
  };
}
