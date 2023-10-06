import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('app')
  @Get('ping')
  getHello(): string {
    return this.appService.getHello();
  }
}
