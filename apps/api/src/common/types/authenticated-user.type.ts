import type { User } from '@supabase/supabase-js';

import type { UserProfile } from '../../users/interfaces/user-profile.interface';

export interface AuthenticatedUser {
  accessToken: string;
  authUser: User;
  profile: UserProfile | null;
  role: string | null;
}
