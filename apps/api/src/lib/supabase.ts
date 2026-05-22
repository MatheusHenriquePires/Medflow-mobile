import { InternalServerErrorException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

function ensureValue(value: string | undefined, name: string) {
  if (!value) {
    throw new InternalServerErrorException(
      `Missing ${name} environment variable.`,
    );
  }

  return value;
}

export function createSupabaseAdminClient(
  supabaseUrl: string | undefined,
  serviceRoleKey: string | undefined,
): SupabaseClient {
  return createClient(
    ensureValue(supabaseUrl, 'SUPABASE_URL'),
    ensureValue(serviceRoleKey, 'SUPABASE_SERVICE_ROLE_KEY'),
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}

export function createSupabaseAuthClient(
  supabaseUrl: string | undefined,
  publishableKey: string | undefined,
): SupabaseClient {
  return createClient(
    ensureValue(supabaseUrl, 'SUPABASE_URL'),
    ensureValue(
      publishableKey,
      'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
    ),
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
