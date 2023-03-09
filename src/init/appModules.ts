import { WinstonModule } from 'nest-winston';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { EnvVariablesValidationSchema } from '../config/env.validation';
import configs from '../config/main';
import { TypeOrmModule } from '@nestjs/typeorm';

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
];
