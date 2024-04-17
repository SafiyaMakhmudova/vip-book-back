import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 3003;

    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('/api');
    app.use(cookieParser());

    const config = new DocumentBuilder()
      .setTitle('Online book shop')
      .setDescription('REST API')
      .setVersion('1.0.0')
      .addTag('Nestjs, Postgress, Sequelize ')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    app.listen(PORT, () => {
      console.log(`Server ${PORT} da ishga tushdi`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
