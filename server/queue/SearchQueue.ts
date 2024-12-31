import { EventEmitter } from 'events';

interface QueueItem {
  id: string;
  username: string;
  socketId: string;
  timestamp: number;
}

export class SearchQueue extends EventEmitter {
  private queue: QueueItem[] = [];
  private processing: Set<string> = new Set();
  private readonly maxConcurrent: number = 3;

  enqueue(socketId: string, username: string): number {
    const id = `${socketId}-${Date.now()}`;
    const item: QueueItem = {
      id,
      username,
      socketId,
      timestamp: Date.now()
    };
    
    this.queue.push(item);
    this.processQueue();
    
    return this.getPosition(socketId);
  }

  dequeue(socketId: string): void {
    this.queue = this.queue.filter(item => item.socketId !== socketId);
    this.processing.delete(socketId);
    this.processQueue();
  }

  getPosition(socketId: string): number {
    return this.queue.findIndex(item => item.socketId === socketId) + 1;
  }

  private processQueue(): void {
    while (this.processing.size < this.maxConcurrent && this.queue.length > 0) {
      const item = this.queue.shift();
      if (!item) break;
      
      this.processing.add(item.socketId);
      this.emit('process', item);
      
      // Update queue positions for remaining items
      this.queue.forEach((queuedItem, index) => {
        this.emit('position', {
          socketId: queuedItem.socketId,
          position: index + 1
        });
      });
    }
  }

  isProcessing(socketId: string): boolean {
    return this.processing.has(socketId);
  }

  completeProcessing(socketId: string): void {
    this.processing.delete(socketId);
    this.processQueue();
  }
}