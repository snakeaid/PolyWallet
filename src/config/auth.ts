import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  issuer: process.env.AUTH0_ISSUER_URL,
  audience: process.env.AUTH0_AUDIENCE,
}));
