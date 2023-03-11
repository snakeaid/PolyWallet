import { IntegrationsEnum } from '../../shared/enums/integrations.enum';

export interface CredentialsKey {
  username: string;
  integrationName: IntegrationsEnum;
}

export interface Credentials extends CredentialsKey {
  credentials: string;
}
