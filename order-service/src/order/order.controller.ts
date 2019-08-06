import { Controller, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { Order } from './interface/order.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { LoggingInterceptor } from '../interceptor/logging.interceptor';

@UseInterceptors(new LoggingInterceptor())
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern({ cmd: 'create-order' })
  public async create(order: CreateOrderDto): Promise<Order> {
    return this.orderService.create(order);
  }

  @MessagePattern({ cmd: 'cancel-order' })
  public async cancel(id: string | number): Promise<Order> {
    return this.orderService.cancelById(id);
  }

  @MessagePattern({ cmd: 'get-order' })
  public async get(id: string | number): Promise<Order> {
    return this.orderService.findById(id);
  }

  @MessagePattern({ cmd: 'get-order-status' })
  public async getStatus(id: string | number): Promise<string> {
    const order = await this.orderService.findById(id);
    if (!order) {
      return 'notfound';
    }
    return order.state;
  }

  @MessagePattern({ cmd: 'get-all' })
  public async getAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }
}
