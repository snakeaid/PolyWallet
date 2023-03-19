import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { MonobankAccount, MonobankAccountSchema } from './monobank-account.schema';
import { MonobankJar, MonobankJarSchema } from './monobank-jar.schema';

export type MonobankClientInfoDocument = HydratedDocument<MonobankClientInfo>;

@Schema()
export class MonobankClientInfo extends Document {
  @Prop({ unique: true })
  public username: string;

  @Prop()
  public clientId: string;

  @Prop()
  public name: string;

  @Prop()
  public webHookUrl: string;

  @Prop()
  public permissions: string;

  @Prop({ type: [MonobankAccountSchema] })
  public accounts: MonobankAccount[];

  @Prop({ type: [MonobankJarSchema] })
  public jars: MonobankJar[];
}

export const MonobankClientInfoSchema = SchemaFactory.createForClass(MonobankClientInfo);
