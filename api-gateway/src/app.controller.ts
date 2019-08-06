import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root() {
    return this.appService.getRoot();
  }

  @Get('order-service-status')
  orderRoot() {
    return this.appService.getOrderRoot();
  }

  @Get('payment-service-status')
  paymentRoot() {
    return this.appService.getPaymentRoot();
  }
}
