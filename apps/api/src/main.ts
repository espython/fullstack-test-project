import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const logger = app.get(LoggerService);
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  await app.listen(3000);
}
bootstrap();
