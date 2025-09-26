import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DelegationModule } from './delegation.module';

async function bootstrap() {
  const app = await NestFactory.create(DelegationModule);

  // Enable CORS
  app.enableCors();

  // Swagger configuration for Delegation Module
  const config = new DocumentBuilder()
    .setTitle('Lendr Delegation API')
    .setDescription(
      'Delegation Smart Contract API for managing NFT delegations and rental agreements',
    )
    .setVersion('1.0')
    .addTag('delegation', 'Delegation contract operations')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/delegation', app, document, {
    customSiteTitle: 'Lendr Delegation API Documentation',
    customfavIcon: '/favicon.ico',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    ],
  });

  const port = process.env.DELEGATION_PORT || 3002;
  await app.listen(port);

  console.log(`Delegation API is running on: http://localhost:${port}`);
  console.log(
    `Delegation Swagger documentation available at: http://localhost:${port}/api/delegation`,
  );
}

bootstrap();
