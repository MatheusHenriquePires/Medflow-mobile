import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import type { AuthenticatedUser } from '../common/types/authenticated-user.type';
import { SupabaseAuthGuard } from '../auth/guards/supabase-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(SupabaseAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('ADMIN', 'DOCTOR')
  @ApiOperation({ summary: 'Lista usuários da clínica' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me/profile')
  @Roles('ADMIN', 'DOCTOR', 'PATIENT')
  @ApiOperation({ summary: 'Busca o próprio perfil do usuário autenticado' })
  findMe(@CurrentUser() user: AuthenticatedUser) {
    return this.usersService.findById(user.authUser.id);
  }

  @Patch('me/profile')
  @Roles('ADMIN', 'DOCTOR', 'PATIENT')
  @ApiOperation({ summary: 'Atualiza o próprio perfil do usuário autenticado' })
  updateMe(@CurrentUser() user: AuthenticatedUser, @Body() payload: UpdateUserDto) {
    return this.usersService.update(user.authUser.id, payload);
  }

  @Get(':id')
  @Roles('ADMIN', 'DOCTOR')
  @ApiOperation({ summary: 'Busca usuário por id' })
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Atualiza perfil de usuário' })
  update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return this.usersService.update(id, payload);
  }
}
