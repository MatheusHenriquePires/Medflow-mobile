import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Health check da API' })
  getHealth() {
    return {
      service: 'medflow-api',
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
