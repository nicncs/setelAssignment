import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const logger = new Logger('Payment Service');

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    logger.log(
      `Request: ${context.getClass().name} ${
        context.getHandler().name
      } ${JSON.stringify(context.getArgs())}`,
    );

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(result => logger.log(`Response: ${JSON.stringify(result)}`)));
  }
}
