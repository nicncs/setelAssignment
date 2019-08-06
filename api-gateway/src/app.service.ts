import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import {
  orderServiceSettings,
  paymentServiceSettings,
} from './config/server.config';
import { CMD } from './order/constant/order.constant';

@Injectable()
export class AppService {
  @Client({
    transport: Transport.TCP,
    options: {
      host: orderServiceSettings.host,
      port: orderServiceSettings.port,
    },
  })
  orderClient: ClientProxy;

  @Client({
    transport: Transport.TCP,
    options: {
      host: paymentServiceSettings.host,
      port: paymentServiceSettings.port,
    },
  })
  paymentClient: ClientProxy;

  getRoot() {
    return { msg: 'This is order app' };
  }

  async getOrderRoot() {
    const response = await this.orderClient.send({ cmd: CMD.OK }, {});
    return response.toPromise();
  }

  async getPaymentRoot() {
    const response = await this.paymentClient.send({ cmd: CMD.OK }, {});
    return response.toPromise();
  }
}
