import { registerAs } from '@nestjs/config';
import { DynamooseModuleOptions } from 'nestjs-dynamoose';

export default registerAs('dynamo', (): DynamooseModuleOptions => {
  return {
    aws: {
      region: 'us-east-1',
    },
  };
});
