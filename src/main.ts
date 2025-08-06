import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Store management')
    .setDescription(`Store management by RestAPI`)
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  SwaggerModule.setup('swagger', app, () =>
    SwaggerModule.createDocument(app, config),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
