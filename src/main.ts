import { NestFactory } from '@nestjs/core';
import { IdentityModule } from './identity/identity.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(IdentityModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({}));
  await app.listen(3000);
}
bootstrap();
