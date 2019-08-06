import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Machine, interpret, StateMachine } from 'xstate';
import { Order } from './interface/order.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { STATES, DELAY_FOR_DELIVERY } from './constant/order.constant';
import { PaymentService } from '../payment/payment.service';

interface OrderStateSchema {
  states: {
    [state: string]: {};
  };
}

type OrderEvent = { type: 'OK' } | { type: 'NOTOK' };

@Injectable()
export class OrderService {
  private orderMachine: StateMachine<any, OrderStateSchema, OrderEvent>;

  constructor(
    private readonly paymentService: PaymentService,
    @InjectModel('Order') private readonly orderModel: Model<Order>,
  ) {
    this.orderMachine = Machine({
      id: 'order',
      initial: STATES.CREATED,
      states: {
        [STATES.CREATED]: {
          on: { OK: STATES.CONFIRMED, NOTOK: STATES.CANCELLED },
        },
        [STATES.CONFIRMED]: {
          on: { OK: STATES.DELIVERED, NOTOK: STATES.CANCELLED },
        },
        [STATES.CANCELLED]: {},
        [STATES.DELIVERED]: {},
      },
    });
  }

  async removeById(id: string | number): Promise<any> {
    const removedOrder = await this.orderModel.findByIdAndRemove(id);
    return removedOrder;
  }

  async create(order: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(order);
    await createdOrder.save();
    setTimeout(() => {
      this.processPayments(createdOrder).then(processedOrder =>
        this.deliver(processedOrder),
      );
    }, 0);
    return Promise.resolve(createdOrder);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderModel.find().exec();
  }

  async updateById(
    id: string | number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(
      id,
      updateOrderDto,
      { new: true },
    );
    return updatedOrder;
  }

  async findById(id: number | string): Promise<Order> {
    return this.orderModel.findById(id).exec();
  }

  async cancelById(id: string | number): Promise<Order> {
    const order = await this.findById(id);
    if (!order) {
      return order;
    }

    const result = this.orderMachine.transition(order.state, 'NOTOK');
    if (result.value === STATES.CANCELLED) {
      await this.orderModel.findByIdAndUpdate(id, { state: STATES.CANCELLED });
    }
    return this.findById(id);
  }

  async processPayments(order: Order): Promise<Order> {
    if (!order) {
      return order;
    }

    const isConfirmed = await this.paymentService.processPayment(order);
    const result = this.orderMachine.transition(
      order.state,
      isConfirmed ? 'OK' : 'NOTOK',
    );
    await this.orderModel.findByIdAndUpdate(order.id, {
      state: result.value,
    });
    return this.findById(order.id);
  }

  async deliver(order: Order): Promise<Order> {
    return new Promise(async resolve => {
      setTimeout(async () => {
        const currentOrder = await this.findById(order.id);
        if (!currentOrder || currentOrder.state !== STATES.CONFIRMED) {
          return resolve(currentOrder);
        }

        await this.orderModel.findByIdAndUpdate(order.id, {
          state: STATES.DELIVERED,
        });
        resolve(this.findById(order.id));
      }, DELAY_FOR_DELIVERY);
    });
  }
}
