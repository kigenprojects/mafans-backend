import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { 
    logger: ['error']
  })
  app.setGlobalPrefix('v1')

  const config = new DocumentBuilder()
    .setTitle('Mafans API Documentation')
    .setDescription('Mafans API Documentation')
    .setVersion('0.1')
    .addTag('Mafans')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/documentation', app, document)

  app.enableCors({
    origin: '*'
  })
  await app.listen(3000)
}
bootstrap();
