type Job<T> = {
  id: string;
  data: T;
};

type JobHandler<T> = (job: Job<T>) => Promise<void>;

export class Queue<T> {
  private jobs: Map<string, Job<T>> = new Map();
  private handler?: JobHandler<T>;

  async add(id: string, data: T): Promise<Job<T>> {
    const job = { id, data };
    this.jobs.set(id, job);
    
    if (this.handler) {
      this.handler(job).catch(console.error);
    }
    
    return job;
  }

  async remove(id: string): Promise<void> {
    this.jobs.delete(id);
  }

  process(handler: JobHandler<T>): void {
    this.handler = handler;
  }
}