import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FactoryModule } from './factory.module';

async function bootstrap() {
  const app = await NestFactory.create(FactoryModule);

  // Enable CORS
  app.enableCors();

  // Swagger configuration for Factory Module
  const config = new DocumentBuilder()
    .setTitle('Lendr Factory API')
    .setDescription('Factory Smart Contract API for creating rental agreements')
    .setVersion('1.0')
    .addTag('factory', 'Factory contract operations')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/factory', app, document, {
    customSiteTitle: 'Lendr Factory API Documentation',
    customfavIcon: '/favicon.ico',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    ],
  });

  const port = process.env.FACTORY_PORT || 3001;
  await app.listen(port);

  console.log(`Factory API is running on: http://localhost:${port}`);
  console.log(
    `Factory Swagger documentation available at: http://localhost:${port}/api/factory`,
  );
}

bootstrap();
