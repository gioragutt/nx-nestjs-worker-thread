import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkerService {
  getData(): { message: string } {
    return { message: 'Worker response!' };
  }
}
