import { registerAs } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export default registerAs('mongo', (): MongooseModuleOptions => {
  return {
    uri: process.env.MONGO_CONNECTION_STRING,
  };
});
