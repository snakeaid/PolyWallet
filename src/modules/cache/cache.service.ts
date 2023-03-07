import { Cluster, Redis } from 'ioredis';
import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '../../core/redis';

type Ok = 'OK';

@Injectable()
export class CacheService {
  private readonly redisClient: Redis | Cluster;

  public constructor(@Inject(RedisService) redisService: RedisService) {
    this.redisClient = redisService.getClient();
  }

  public async get<T>(key: string): Promise<T | string> {
    const result = await this.redisClient.get(key);
    try {
      return JSON.parse(result);
    } catch {
      return result;
    }
  }

  public async set(key: string, value: any, ttlMs?: number): Promise<Ok | null> {
    if (!ttlMs) {
      return this.redisClient.set(key, JSON.stringify(value));
    } else {
      return this.redisClient.set(key, JSON.stringify(value), 'PX', ttlMs);
    }
  }

  public async delete(key: string): Promise<number> {
    return this.redisClient.del(key);
  }

  public async flush(): Promise<Ok> {
    return this.redisClient.flushdb();
  }
}
