import { registerAs } from '@nestjs/config';
import { GqlModuleOptions } from '@nestjs/graphql';

export default registerAs('graphql', (): GqlModuleOptions => {
  return {
    autoSchemaFile: true,
  };
});
