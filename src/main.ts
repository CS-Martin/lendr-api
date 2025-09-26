import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Lendr API')
    .setDescription(
      'Complete API for interacting with Factory and Delegation smart contracts on Polygon Amoy testnet',
    )
    .setVersion('1.0')
    .addTag('app', 'Application endpoints')
    .addTag('factory', 'Factory contract operations')
    .addTag('delegation', 'Delegation contract operations')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Lendr API Documentation',
    customfavIcon: '/favicon.ico',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    ],
  });

  await app.listen(process.env.PORT ?? 3000);

  Logger.log(`🚀 Application is running on: http://localhost:3000`);
  Logger.log(`🚀 API Documentation is running on: http://localhost:3000/api`);
}

bootstrap();
