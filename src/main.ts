import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { setupApplication } from './main.config';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('Main Module');
  const app = await NestFactory.create(AppModule);

  setupApplication(app);

  const PORT = envs.port || 3000;

  await app.listen(PORT, () => {
    logger.log(`Server running on port: ${PORT}`);
  });
}
bootstrap();
