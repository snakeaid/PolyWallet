import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './modules/logger/logger.service';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggerService = await app.resolve(LoggerService);
  const configService = app.get(ConfigService);
  const isProduction = configService.get('NODE_ENV') === 'production';
  const port = configService.get('APP_PORT') || 3012;

  if (configService.get('NODE_ENV') !== 'production') {
    const options = new DocumentBuilder().build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('api', app, document);
  }

  app.enableCors();
  await app.listen(3001);

  app.useLogger(loggerService);
  loggerService.setContext('bootstrap');

  loggerService
    .toScopeLogger(null)
    .log(`Application started ${!isProduction ? `on ${port} port.` : ``} `);
}

bootstrap();
