import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async processOrder(order): Promise<boolean> {
    const isConfirmed = Math.random() >= 0.2;
    return Promise.resolve(isConfirmed);
  }
}
