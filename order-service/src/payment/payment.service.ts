import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { Order } from '../order/interface/order.interface';
import { paymentServiceSettings } from '../config/server.config';

@Injectable()
export class PaymentService {
  @Client({
    transport: Transport.TCP,
    options: {
      host: paymentServiceSettings.host,
      port: paymentServiceSettings.port,
    },
  })
  orderClient: ClientProxy;

  public async processPayment(order: Order): Promise<boolean> {
    const response = await this.orderClient.send<boolean>(
      { cmd: 'process-order' },
      order,
    );
    return response.toPromise();
  }
}
