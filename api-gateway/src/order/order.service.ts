import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { Order } from './interface/order.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { CMD } from './constant/order.constant';
import { orderServiceSettings } from '../config/server.config';

@Injectable()
export class OrderService {
  @Client({
    transport: Transport.TCP,
    options: {
      host: orderServiceSettings.host,
      port: orderServiceSettings.port,
    },
  })
  orderClient: ClientProxy;

  async getAll(): Promise<Order[]> {
    const response = await this.orderClient.send<Order[]>(
      { cmd: CMD.INDEX },
      {},
    );
    return response.toPromise();
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const response = await this.orderClient.send<Order>(
      { cmd: CMD.CREATE },
      createOrderDto,
    );
    return response.toPromise();
  }

  async cancelById(id: string | number): Promise<Order> {
    const response = await this.orderClient.send<Order>(
      { cmd: CMD.CANCEL },
      id,
    );
    return response.toPromise();
  }

  async findById(id: string | number): Promise<Order> {
    const response = await this.orderClient.send<Order>({ cmd: CMD.GET }, id);
    return response.toPromise();
  }

  async statusById(id: string | number): Promise<string> {
    const response = await this.orderClient.send<string>(
      { cmd: CMD.STATUS },
      id,
    );
    return response.toPromise();
  }
}
