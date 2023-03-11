import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { CredentialsSchema } from './credentials.schema';
import { CredentialsService } from './credentials.service';

@Module({
  imports: [
    DynamooseModule.forFeature([
      { name: process.env.DYNAMO_TABLE_NAME, schema: CredentialsSchema },
    ]),
  ],
  providers: [CredentialsService],
  exports: [CredentialsService],
})
export class CredentialsModule {}
