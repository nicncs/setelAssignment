import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import { serverSettings } from './config/server.config';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('/api/v1');

  const options = new DocumentBuilder()
    .setBasePath('/api/v1')
    .setTitle('Order app REST API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      retryAttempts: 5,
      retryDelay: 1000,
    },
  });

  const logger = new Logger('Order app');
  app.use(
    morgan(
      ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]',
      {
        stream: {
          write(str) {
            logger.log(str);
          },
        },
      },
    ),
  );

  await app.listen(serverSettings.port, serverSettings.host, () =>
    console.log(
      `Order app is listening at ${serverSettings.host}:${serverSettings.port}`,
    ),
  );
}
bootstrap();
