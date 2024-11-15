import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { CHAT_QUEUE } from '@app/libs/constants';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);

  const configService = app.get(ConfigService);

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [configService.get<string>('RABBITMQ_URL')],
  //     queue: CHAT_QUEUE,
  //     queueOptions: {
  //       durable: true,
  //     },
  //   },
  // });

  // await app.startAllMicroservices();
  await app.listen(configService.get<number>('PORT'));

  console.log(`Gateway is running on: ${await app.getUrl()}`);
}
bootstrap();
