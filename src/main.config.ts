import { CORS } from './utils/cors';

import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import helmet from 'helmet';
import { ExceptionsFilter } from './common/exceptions/exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupApplication = (app: INestApplication) => {
  app.use(helmet());
  app.enableCors(CORS);

  app.useGlobalFilters(new ExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
  });

  const config = new DocumentBuilder()
    .setTitle('Openpass Dragon Ball API challenge')
    .setDescription('API to manage Dragon Ball characters')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
};
