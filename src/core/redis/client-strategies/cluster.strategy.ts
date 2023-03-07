import type { Cluster as ClusterType, RedisOptions } from 'ioredis';
import { Cluster } from 'ioredis';

import type { RedisAuthOptions, TlsType } from '../redis.types';
import { redisConsole } from '../utils';

export async function getClusterClient(
  nodes: RedisOptions[],
  { tls, auth }: { tls: TlsType; auth: RedisAuthOptions },
): Promise<ClusterType> {
  const { username, password } = auth;

  redisConsole('Cluster Mode');

  return new Cluster(nodes, {
    redisOptions: {
      tls,
      password,
      username,
    },
  });
}
