export interface CredentialsKey {
  username: string;
  integrationName: string;
}

export interface Credentials extends CredentialsKey {
  credentials: string;
}
