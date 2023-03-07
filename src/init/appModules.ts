import { WinstonModule } from 'nest-winston';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { EnvVariablesValidationSchema } from '../config/env.validation';
import configs from '../config/main';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule, RedisModuleOptions } from 'src/core/redis';

type ConfigServiceGet = {
  nodes: string;
  auth: {
    username: string;
    password: string;
  };
  tls: {
    tlsEnabled: boolean;
    ca: string;
    key: string;
    cert: string;
  };
};

export const initAppModules = [
  ConfigModule.forRoot({
    isGlobal: true,
    load: configs,
    envFilePath: `./env/.env.development`,
    validationSchema: EnvVariablesValidationSchema,
    validationOptions: {
      abortEarly: false,
    },
  }),
  WinstonModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      ...configService.get('winston'),
    }),
  }),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      ...configService.get('database'),
      autoLoadEntities: false,
    }),
  }),
  RedisModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const {
        nodes,
        auth: { username, password },
        tls: { tlsEnabled, ca, key, cert },
      }: ConfigServiceGet = configService.get('redis');

      return {
        nodes,
        username,
        password,
        tlsEnabled,
        ca,
        key,
        cert,
      } as unknown as RedisModuleOptions;
    },
  }),
];
