import type { SearchResult } from '../../src/types';

interface CachedResult {
  results: SearchResult[];
  timestamp: number;
}

export class ResultCache {
  private cache: Map<string, CachedResult> = new Map();
  private readonly TTL = 10 * 60 * 1000; // 10 minutes in milliseconds

  set(username: string, results: SearchResult[]): void {
    const normalizedUsername = username.toLowerCase();
    this.cache.set(normalizedUsername, {
      results,
      timestamp: Date.now()
    });
  }

  get(username: string): SearchResult[] | null {
    const normalizedUsername = username.toLowerCase();
    const cached = this.cache.get(normalizedUsername);
    
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > this.TTL) {
      this.cache.delete(normalizedUsername);
      return null;
    }
    
    return cached.results;
  }

  cleanup(): void {
    const now = Date.now();
    for (const [username, cached] of this.cache.entries()) {
      if (now - cached.timestamp > this.TTL) {
        this.cache.delete(username);
      }
    }
  }
}