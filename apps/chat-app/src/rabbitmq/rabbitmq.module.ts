import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { CHAT_QUEUE, CHAT_SERVICE } from '@app/libs/constants';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: CHAT_SERVICE,
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            url: [configService.get('RABBITMQ_URL')],
            queue: CHAT_QUEUE,
            queueOptions: {
              durable: true,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class RabbitmqModule {}
