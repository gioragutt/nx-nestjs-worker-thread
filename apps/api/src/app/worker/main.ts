import { NestFactory } from '@nestjs/core';
import { setInterval } from 'timers/promises';
import { WorkerModule } from './worker.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(WorkerModule);
  await app.init();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for await (const _ of setInterval(1000)) {
    if (Math.random() < 0.005) {
      throw new Error('Alas, I died!');
    }
  }
}

bootstrap();
