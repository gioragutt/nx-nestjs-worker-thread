import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { threadId } from 'worker_threads';

@Processor('jobs')
export class WorkerService {
  @Process('job')
  async doJob(job: Job<{ hello: string; throwError: boolean }>) {
    console.log('Job', job.id, 'received in', threadId, 'with', job.data);

    const start = Date.now();
    while (Date.now() - start < 5000) {
      continue;
    }

    if (job.data.throwError) {
      throw new Error('Alas, I die!');
    }

    console.log('Hello', job.data.hello, 'from', threadId);
    return { handledBy: threadId };
  }
}
