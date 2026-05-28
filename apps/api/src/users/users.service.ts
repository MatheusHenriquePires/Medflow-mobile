import { Injectable, NotFoundException } from '@nestjs/common';

import { SupabaseService } from '../supabase/supabase.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserProfile } from './interfaces/user-profile.interface';

@Injectable()
export class UsersService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async createProfile(
    payload: Omit<CreateUserDto, 'senha'> & { id: string; senha?: string | null },
  ): Promise<UserProfile> {
    const client = this.supabaseService.getAdminClient();
    const { data, error } = await client
      .from('users')
      .insert({
        id: payload.id,
        nome: payload.nome,
        email: payload.email,
        senha: payload.senha ?? null,
        role: payload.role ?? 'PATIENT',
        telefone: payload.telefone ?? null,
        cpf: payload.cpf ?? null,
      })
      .select('*')
      .single();

    this.supabaseService.handleError(error, 'Failed to create user profile');
    const profile = this.supabaseService.ensureData(
      data as UserProfile | null,
      'Failed to create user profile',
    );

    if (payload.role === 'PATIENT' || !payload.role) {
      await this.upsertPatientProfile(payload.id, payload.dataNascimento);
    }

    return profile;
  }

  async findAll(): Promise<UserProfile[]> {
    const client = this.supabaseService.getAdminClient();
    const { data, error } = await client
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    this.supabaseService.handleError(error, 'Failed to fetch users');
    return (data ?? []) as UserProfile[];
  }

  async findById(id: string): Promise<UserProfile> {
    const client = this.supabaseService.getAdminClient();
    const { data, error } = await client.from('users').select('*').eq('id', id).maybeSingle();

    this.supabaseService.handleError(error, 'Failed to fetch user');

    if (!data) {
      throw new NotFoundException('User not found.');
    }

    return data as UserProfile;
  }

  async findByEmail(email: string): Promise<UserProfile | null> {
    const client = this.supabaseService.getAdminClient();
    const { data, error } = await client
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    this.supabaseService.handleError(error, 'Failed to fetch user by email');
    return (data as UserProfile | null) ?? null;
  }

  async update(id: string, payload: UpdateUserDto): Promise<UserProfile> {
    const client = this.supabaseService.getAdminClient();
    const { dataNascimento, metadata, ...profilePayload } = payload;
    const authMetadata = {
      ...(metadata ?? {}),
      ...(profilePayload.nome ? { nome: profilePayload.nome } : {}),
      ...(profilePayload.telefone ? { telefone: profilePayload.telefone } : {}),
      ...(profilePayload.cpf ? { cpf: profilePayload.cpf } : {}),
      ...(dataNascimento ? { dataNascimento } : {}),
    };

    if (Object.keys(authMetadata).length > 0 || profilePayload.email) {
      const { error } = await client.auth.admin.updateUserById(id, {
        ...(profilePayload.email ? { email: profilePayload.email } : {}),
        ...(Object.keys(authMetadata).length > 0 ? { user_metadata: authMetadata } : {}),
      });

      this.supabaseService.handleError(error, 'Failed to update auth user metadata');
    }

    const sanitizedPayload = Object.fromEntries(
      Object.entries(profilePayload).filter(([, value]) => value !== undefined),
    ) as UpdateUserDto;

    if (dataNascimento) {
      await this.upsertPatientProfile(id, dataNascimento);
    }

    if (Object.keys(sanitizedPayload).length === 0) {
      return this.findById(id);
    }

    const { data, error } = await client
      .from('users')
      .update(sanitizedPayload)
      .eq('id', id)
      .select('*')
      .maybeSingle();

    this.supabaseService.handleError(error, 'Failed to update user');

    if (!data) {
      throw new NotFoundException('User not found.');
    }

    return data as UserProfile;
  }

  private async upsertPatientProfile(userId: string, dataNascimento?: string): Promise<void> {
    const client = this.supabaseService.getAdminClient();
    const { data, error } = await client
      .from('patients')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    this.supabaseService.handleError(error, 'Failed to fetch patient profile');

    if (data?.id) {
      if (dataNascimento) {
        const { error: updateError } = await client
          .from('patients')
          .update({ data_nascimento: dataNascimento })
          .eq('id', data.id);

        this.supabaseService.handleError(updateError, 'Failed to update patient profile');
      }

      return;
    }

    const { error: insertError } = await client.from('patients').insert({
      user_id: userId,
      data_nascimento: dataNascimento ?? null,
    });

    this.supabaseService.handleError(insertError, 'Failed to create patient profile');
  }
}
