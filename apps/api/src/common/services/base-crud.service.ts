import { Injectable, NotFoundException } from '@nestjs/common';

import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export abstract class BaseCrudService<
  TRecord extends object,
  TCreate extends object,
  TUpdate extends object,
> {
  protected constructor(
    protected readonly supabaseService: SupabaseService,
    private readonly tableName: string,
  ) {}

  async findAll(): Promise<TRecord[]> {
    const client = this.supabaseService.getAdminClient();
    const { data, error } = await client.from(this.tableName).select('*');

    this.supabaseService.handleError(error, `Failed to fetch ${this.tableName}`);
    return (data ?? []) as TRecord[];
  }

  async findById(id: string): Promise<TRecord> {
    const client = this.supabaseService.getAdminClient();
    const { data, error } = await client
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    this.supabaseService.handleError(error, `Failed to fetch ${this.tableName}`);

    if (!data) {
      throw new NotFoundException(`${this.tableName} record not found.`);
    }

    return data as TRecord;
  }

  async create(payload: TCreate): Promise<TRecord> {
    const client = this.supabaseService.getAdminClient();
    const { data, error } = await client
      .from(this.tableName)
      .insert(payload as Record<string, unknown>)
      .select('*')
      .maybeSingle();

    this.supabaseService.handleError(error, `Failed to create ${this.tableName}`);
    return this.supabaseService.ensureData(
      data as TRecord | null,
      `Failed to create ${this.tableName}`,
    );
  }

  async update(id: string, payload: TUpdate): Promise<TRecord> {
    const client = this.supabaseService.getAdminClient();
    const { data, error } = await client
      .from(this.tableName)
      .update(payload as Record<string, unknown>)
      .eq('id', id)
      .select('*')
      .maybeSingle();

    this.supabaseService.handleError(error, `Failed to update ${this.tableName}`);

    if (!data) {
      throw new NotFoundException(`${this.tableName} record not found.`);
    }

    return data as TRecord;
  }
}
