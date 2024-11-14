import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const port = app.get(ConfigService).get('PORT');

  await app.listen(port ?? 3000);

  console.log(`Application is running on : ${await app.getUrl()}`);
}
bootstrap();
