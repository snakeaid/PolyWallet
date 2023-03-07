import { registerAs } from '@nestjs/config';

export const REDIS_KEY = 'redis';

export default registerAs(REDIS_KEY, () => ({
  nodes: process.env.REDIS_0_HOST + ':' + process.env.REDIS_0_PORT,
  auth: {
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_0_PASSWORD,
  },
  tls: {
    tlsEnabled: Boolean(process.env.REDIS_TLS_ENABLED === 'true'),
    ca: process.env.REDIS_TLS_CA,
    key: process.env.REDIS_TLS_KEY,
    cert: process.env.REDIS_TLS_CERT,
  },
}));
