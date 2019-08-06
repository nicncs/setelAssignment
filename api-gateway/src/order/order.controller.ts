import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './interface/order.interface';
import { ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiOperation({ title: 'Get all orders' })
  async getAll(): Promise<Order[]> {
    return this.orderService.getAll();
  }

  @Post()
  @ApiOperation({ title: 'Create new order' })
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Cancel order by id' })
  @ApiImplicitParam({
    name: 'id',
    description: 'Order id',
    required: true,
    type: 1,
  })
  async cancel(@Param('id') id: number | string): Promise<Order> {
    return this.orderService.cancelById(id);
  }

  @Get(':id')
  @ApiOperation({ title: 'Get order by id' })
  @ApiImplicitParam({
    name: 'id',
    description: 'Order id',
    required: true,
    type: 1,
  })
  async fetchById(@Param('id') id: number | string): Promise<Order> {
    return this.orderService.findById(id);
  }

  @Get(':id/status')
  @ApiOperation({ title: 'Get status for order by id' })
  @ApiImplicitParam({
    name: 'id',
    description: 'Order id',
    required: true,
    type: 1,
  })
  async statusById(@Param('id') id: number | string): Promise<string> {
    return this.orderService.statusById(id);
  }
}
