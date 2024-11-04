import { NestFactory } from '@nestjs/core';
import { WebsocketModule } from './websocket.module';

async function bootstrap() {
  const app = await NestFactory.create(WebsocketModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
