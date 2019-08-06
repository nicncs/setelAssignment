import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule } from './order/order.module';
import { dbSettings } from './config/server.config';

@Module({
  imports: [
    MongooseModule.forRoot(dbSettings.url, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }),
    OrderModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
