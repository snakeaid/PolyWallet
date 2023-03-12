import { WinstonModule } from 'nest-winston';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { EnvVariablesValidationSchema } from '../config/env.validation';
import configs from '../config/main';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamooseModule } from 'nestjs-dynamoose';
import { MongooseModule } from '@nestjs/mongoose';

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
  DynamooseModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      ...configService.get('dynamo'),
    }),
  }),
  MongooseModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      ...configService.get('mongo'),
    }),
  }),
];
