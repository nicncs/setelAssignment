import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'ok' })
  public async ok(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
