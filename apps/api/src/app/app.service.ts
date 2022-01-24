import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class AppService {
  constructor(@InjectQueue('jobs') private jobsQueue: Queue) {
    setInterval(async () => {
      const jobs = await this.jobsQueue.getJobs([
        'active',
        'waiting',
        'completed',
        'failed',
      ]);

      const jobsByState = await jobs.reduce(async (acc, job) => {
        const jobsByState = await acc;
        const status = await job.getState();
        jobsByState[status] ??= [];
        jobsByState[status].push(job.id);
        return jobsByState;
      }, Promise.resolve({} as Record<string, unknown[]>));

      console.table(
        Object.entries(jobsByState).map(([state, jobIds]) => {
          return { state, jobs: jobIds.length };
        })
      );
    }, 5000);
  }

  async startJob(throwError: boolean) {
    const { id } = await this.jobsQueue.add('job', {
      hello: 'world',
      throwError,
    });
    return id;
  }
}
