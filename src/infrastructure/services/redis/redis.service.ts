import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;

  async onModuleInit() {
    this.client = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
    this.client.on('error', (err) => console.error('Redis Client Error', err));
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.disconnect();
  }

  async incrementEmailCount(email: string): Promise<number> {
    const key = `email:${email}:count`;
    const count = await this.client.incr(key);

    if (count === 1) {
      await this.client.expire(key, 60 * 60);
    }

    return count;
  }
}
