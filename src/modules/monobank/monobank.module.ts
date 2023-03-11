import { Module } from '@nestjs/common';
import { CredentialsService } from '../credentials/credentials.service';

@Module({
  imports: [],
  providers: [CredentialsService],
  exports: [CredentialsService],
})
export class MonobankModule {}
