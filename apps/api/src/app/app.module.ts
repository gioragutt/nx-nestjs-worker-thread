import { BullModule } from '@nestjs/bull';
import {
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { Worker } from 'worker_threads';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [BullModule.forRoot({}), BullModule.registerQueue({ name: 'jobs' })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  workers = new Set<Worker>();

  async onApplicationShutdown(signal?: string) {
    console.log('Application shutting down with signal', signal);
    await Promise.allSettled([...this.workers].map((w) => w.terminate()));
  }

  onApplicationBootstrap() {
    for (let i = 0; i < 8; i++) {
      this.createWorker();
    }
  }

  private createWorker() {
    const worker = new Worker(__dirname + '/worker.js');
    console.log('Created worker', worker.threadId);
    this.workers.add(worker);

    worker.once('error', (err) => {
      console.log('Worker', worker.threadId, 'thrown error', err);
      this.workers.delete(worker);
      this.createWorker();
    });

    worker.once('exit', (code) => {
      console.log('Worker', worker.threadId, 'exited with code', code);
      this.workers.delete(worker);
    });
  }
}
