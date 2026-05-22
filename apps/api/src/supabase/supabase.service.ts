import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthError, AuthResponse, PostgrestError, SupabaseClient } from '@supabase/supabase-js';

import {
  createSupabaseAdminClient,
  createSupabaseAuthClient,
} from '../lib/supabase';

@Injectable()
export class SupabaseService {
  private adminClient?: SupabaseClient;

  constructor(private readonly configService: ConfigService) {}

  getAdminClient(): SupabaseClient {
    if (!this.adminClient) {
      this.adminClient = createSupabaseAdminClient(
        this.configService.get<string>('SUPABASE_URL'),
        this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY'),
      );
    }

    return this.adminClient;
  }

  getAuthClient(): SupabaseClient {
    return createSupabaseAuthClient(
      this.configService.get<string>('SUPABASE_URL'),
      this.configService.get<string>('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'),
    );
  }

  handleError(error: PostgrestError | AuthError | null, context: string): void {
    if (!error) {
      return;
    }

    if ('status' in error && error.status === 401) {
      throw new UnauthorizedException(`${context}: ${error.message}`);
    }

    if ('code' in error && error.code) {
      throw new BadRequestException({
        message: `${context}: ${error.message}`,
        code: error.code,
      });
    }

    throw new InternalServerErrorException(`${context}: ${error.message}`);
  }

  ensureData<T>(data: T | null, context: string): T {
    if (data === null) {
      throw new InternalServerErrorException(`${context}: empty response from Supabase.`);
    }

    return data;
  }

  async ensureAuthResponse<T>(
    response: AuthResponse,
    context: string,
  ): Promise<T> {
    this.handleError(response.error, context);
    return this.ensureData(response.data as T | null, context);
  }
}
