import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';

@Module({
  imports: [BullModule.forRoot({}), BullModule.registerQueue({ name: 'jobs' })],
  providers: [WorkerService],
})
export class WorkerModule {}
