import { Controller, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { LoggingInterceptor } from './interceptor/logging.interceptor';

@UseInterceptors(new LoggingInterceptor())
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'process-order' })
  public async processOrder(order: {}): Promise<boolean> {
    return this.appService.processOrder(order);
  }

  @MessagePattern({ cmd: 'ok' })
  public async ok(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
