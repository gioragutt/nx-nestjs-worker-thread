import { NestFactory } from '@nestjs/core';
import { parentPort } from 'worker_threads';
import { WorkerModule } from './worker.module';
import { WorkerService } from './worker.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(WorkerModule);
  const response = app.get(WorkerService).getData();
  parentPort.postMessage(response);
}

bootstrap();
