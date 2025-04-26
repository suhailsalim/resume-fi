import { NestFactory } from '@nestjs/core';
import { LangchainService } from './modules/langchain/langchain.service';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Security
  app.use(helmet());
  app.enableCors();
  
  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  
  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Resume-fy API')
    .setDescription('API documentation for Resume-fy application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Initialize Langchain service
  const langchainService = app.get(LangchainService);
  await langchainService.init();

  
  // Prefix for all routes
  app.setGlobalPrefix('api');
  
  // Start the server
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

async function main(){
    await bootstrap();
}
main();