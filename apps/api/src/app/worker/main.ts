import { NestFactory } from '@nestjs/core';
import { parentPort } from 'worker_threads';
import { WorkerModule } from './worker.module';
import { WorkerService } from './worker.service';

async function bootstrap() {
  const app = await NestFactory.create(WorkerModule);
  const service = await app.resolve(WorkerService);
  const response = service.getData();
  parentPort.postMessage(response);
}

bootstrap();
