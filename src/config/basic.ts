import { registerAs } from '@nestjs/config';

export default registerAs('basic', () => ({
  key: 'value',
  port: process.env.APP_PORT,
  env: process.env.NODE_ENV,
}));
