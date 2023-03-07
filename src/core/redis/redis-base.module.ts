import type { DynamicModule, OnModuleDestroy } from '@nestjs/common';
import { ConsoleLogger, Global, Inject, Module } from '@nestjs/common';

import type { RedisClient } from './client-strategies';
import { createAsyncClientOptions, createClient, createClientOptions } from './client-strategies';
import type { RedisModuleAsyncOptions, RedisModuleOptions } from './redis.types';

import { RedisService } from './redis.service';
import { REDIS_MODULE_OPTIONS } from './redis.constants';

@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisBaseModule implements OnModuleDestroy {
  private logger = new ConsoleLogger();

  public constructor(
    @Inject(REDIS_MODULE_OPTIONS)
    private readonly options: RedisModuleOptions,
  ) {
    this.logger.setContext(this.constructor.name);
  }

  public static register(options: RedisModuleOptions): DynamicModule {
    return {
      module: RedisBaseModule,
      providers: [createClient(), createClientOptions(options)],
      exports: [RedisService],
    };
  }

  public static forRootAsync(options: RedisModuleAsyncOptions): DynamicModule {
    return {
      module: RedisBaseModule,
      imports: options.imports,
      providers: [createClient(), createAsyncClientOptions(options)],
      exports: [RedisService],
    };
  }

  public static closeConnection({ client }: RedisClient): () => void {
    return (): void => {
      if (client) {
        client.disconnect();
      }
    };
  }

  public onModuleDestroy(): void {
    this.logger.log('Closing connection to Redis');
  }
}
