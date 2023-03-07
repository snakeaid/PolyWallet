import type { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';

import type { RedisModuleAsyncOptions, RedisModuleOptions } from './redis.types';

import { RedisBaseModule } from './redis-base.module';

@Module({})
export class RedisModule {
  public static register(options: RedisModuleOptions): DynamicModule {
    return {
      module: RedisModule,
      imports: [RedisBaseModule.register(options)],
    };
  }

  public static forRootAsync(options: RedisModuleAsyncOptions): DynamicModule {
    return {
      module: RedisModule,
      imports: [RedisBaseModule.forRootAsync(options)],
    };
  }
}
