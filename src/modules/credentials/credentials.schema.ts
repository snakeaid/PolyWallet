import { Schema } from 'dynamoose';

export const CredentialsSchema = new Schema({
  username: {
    type: String,
    hashKey: true,
  },
  integrationName: {
    type: String,
    rangeKey: true,
  },
  credentials: String,
});
