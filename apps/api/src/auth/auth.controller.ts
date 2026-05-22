import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../common/types/authenticated-user.type';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { SupabaseAuthGuard } from './guards/supabase-auth.guard';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Cria usuário no Supabase Auth e na tabela users' })
  signup(@Body() payload: SignUpDto) {
    return this.authService.signup(payload);
  }

  @Post('login')
  @ApiOperation({ summary: 'Realiza login via Supabase Auth' })
  login(@Body() payload: LoginDto) {
    return this.authService.login(payload);
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @ApiOperation({ summary: 'Retorna o usuário autenticado a partir do JWT do Supabase' })
  me(@CurrentUser() user: AuthenticatedUser) {
    return this.authService.me(user);
  }
}
