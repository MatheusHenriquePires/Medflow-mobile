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
      })
      .select('*')
      .single();

    this.supabaseService.handleError(error, 'Failed to create user profile');
    return this.supabaseService.ensureData(data as UserProfile | null, 'Failed to create user profile');
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
    const { data, error } = await client
      .from('users')
      .update(payload)
      .eq('id', id)
      .select('*')
      .maybeSingle();

    this.supabaseService.handleError(error, 'Failed to update user');

    if (!data) {
      throw new NotFoundException('User not found.');
    }

    return data as UserProfile;
  }
}
