import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { serverSettings } from './config/server.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: serverSettings.host,
      port: serverSettings.port,
      retryAttempts: 5,
      retryDelay: 1000,
    },
  });
  app.listen(() =>
    console.log(
      `Payment service is listening at ${serverSettings.host}:${
        serverSettings.port
      }`,
    ),
  );
}
bootstrap();
