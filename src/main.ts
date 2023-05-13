import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.APP_PORT;
  const swaggerLink = process.env.SWAGGER_LINK;

  const config = new DocumentBuilder()
    .setTitle('Twilo Test Server')
    .setDescription('Server test send OTP by Server')
    .setVersion('1.0.0')
    .addTag('Twilo')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => {
    console.log(`Server running on:  ${PORT}`);
    console.log(`Swagger link: ${swaggerLink}`);
  });
}
bootstrap();
