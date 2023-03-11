import { Module } from '@nestjs/common';
import { CredentialsService } from '../credentials/credentials.service';
import { CredentialsModule } from '../credentials/credentials.module';

@Module({
  imports: [CredentialsModule],
  providers: [CredentialsService],
  exports: [CredentialsService],
})
export class MonobankModule {}
