import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import type { AuthenticatedUser } from '../common/types/authenticated-user.type';
import { SupabaseService } from '../supabase/supabase.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly usersService: UsersService,
  ) {}

  async signup(payload: SignUpDto) {
    const existingUser = await this.usersService.findByEmail(payload.email);

    if (existingUser) {
      throw new ConflictException('User already exists.');
    }

    const client = this.supabaseService.getAdminClient();
    const { data, error } = await client.auth.admin.createUser({
      email: payload.email,
      password: payload.password,
      email_confirm: true,
      user_metadata: {
        nome: payload.nome,
        telefone: payload.telefone,
        cpf: payload.cpf,
        dataNascimento: payload.dataNascimento,
        role: payload.role ?? 'PATIENT',
      },
    });

    this.supabaseService.handleError(error, 'Failed to create Supabase auth user');

    if (!data.user) {
      throw new UnauthorizedException('Supabase did not return a user.');
    }

    const profile = await this.usersService.createProfile({
      id: data.user.id,
      nome: payload.nome,
      email: payload.email,
      role: payload.role ?? 'PATIENT',
      senha: null,
      telefone: payload.telefone,
      cpf: payload.cpf,
      dataNascimento: payload.dataNascimento,
      metadata: {
        telefone: payload.telefone,
        cpf: payload.cpf,
        dataNascimento: payload.dataNascimento,
      },
    });

    return {
      user: data.user,
      profile,
    };
  }

  async login(payload: LoginDto) {
    const client = this.supabaseService.getAuthClient();
    const { data, error } = await client.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });

    this.supabaseService.handleError(error, 'Failed to sign in');

    if (!data.user || !data.session) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const profile = await this.usersService.findById(data.user.id);

    return {
      user: data.user,
      profile,
      session: data.session,
    };
  }

  async me(user: AuthenticatedUser) {
    return {
      user: user.authUser,
      profile: user.profile,
    };
  }
}
