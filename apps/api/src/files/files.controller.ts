import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SupabaseAuthGuard } from '../auth/guards/supabase-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FilesService } from './files.service';

@ApiTags('files')
@ApiBearerAuth()
@UseGuards(SupabaseAuthGuard, RolesGuard)
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get()
  @Roles('ADMIN', 'DOCTOR')
  @ApiOperation({ summary: 'Lista arquivos' })
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'DOCTOR', 'PATIENT')
  @ApiOperation({ summary: 'Busca arquivo por id' })
  findOne(@Param('id') id: string) {
    return this.filesService.findById(id);
  }

  @Post()
  @Roles('ADMIN', 'DOCTOR')
  @ApiOperation({ summary: 'Cria arquivo' })
  create(@Body() payload: CreateFileDto) {
    return this.filesService.create(payload);
  }

  @Patch(':id')
  @Roles('ADMIN', 'DOCTOR')
  @ApiOperation({ summary: 'Atualiza arquivo' })
  update(@Param('id') id: string, @Body() payload: UpdateFileDto) {
    return this.filesService.update(id, payload);
  }
}
