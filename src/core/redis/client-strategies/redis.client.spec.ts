import { RedisModuleOptions } from '../redis.types';

import { redisClientFactory } from './redis.client';

import * as ClusterStrategy from './cluster.strategy';
import * as StandaloneStrategy from './standalone.strategy';

jest.mock('fs');
jest.mock('./cluster.strategy', () => ({
  getClusterClient(): any {
    return { on: (): any => jest.fn() };
  },
}));
jest.mock('./standalone.strategy', () => ({
  getStandaloneClient(): any {
    return { on: (): any => jest.fn() };
  },
}));

const options: RedisModuleOptions = {
  nodes: '',
  username: '',
  password: '',
  tlsEnabled: true,
  ca: './',
  key: './',
  cert: './',
};

describe('REDIS_CLIENT', () => {
  let spyGetClusterClient: jest.SpyInstance;
  let spyGetStandaloneClient: jest.SpyInstance;

  beforeAll(() => {
    spyGetClusterClient = jest.spyOn(ClusterStrategy, 'getClusterClient');
    spyGetStandaloneClient = jest.spyOn(StandaloneStrategy, 'getStandaloneClient');
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('redisClientFactory', () => {
    it('Standalone', async () => {
      options.nodes = 'localhost:6379';

      await redisClientFactory(options);

      expect(spyGetStandaloneClient).toBeCalled();
    });

    it('Cluster', async () => {
      options.nodes = 'localhost:6379,localhost:6380';

      await redisClientFactory(options);

      expect(spyGetClusterClient).toBeCalled();
    });
  });
});
