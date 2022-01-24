import { Controller, Get, ParseBoolPipe, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getData(@Query('throwError', new ParseBoolPipe()) throwError: boolean) {
    return await this.appService.startJob(throwError);
  }
}
