import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from '../../users/users.service';
import type { AuthenticatedUser } from '../../common/types/authenticated-user.type';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{
      headers: Record<string, string | undefined>;
      user?: AuthenticatedUser;
    }>();

    const authorization = request.headers.authorization;

    if (!authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing bearer token.');
    }

    const accessToken = authorization.replace('Bearer ', '').trim();
    const client = this.supabaseService.getAdminClient();
    const { data, error } = await client.auth.getUser(accessToken);

    this.supabaseService.handleError(error, 'Failed to validate Supabase token');

    if (!data.user) {
      throw new UnauthorizedException('Invalid Supabase token.');
    }

    const profile = await this.usersService.findById(data.user.id);
    request.user = {
      accessToken,
      authUser: data.user,
      profile,
      role: profile.role,
    };

    return true;
  }
}
