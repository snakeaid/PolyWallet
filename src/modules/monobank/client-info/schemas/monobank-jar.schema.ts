import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MonobankJar extends Document {
  @Prop()
  public id: string;

  @Prop()
  public sendId: string;

  @Prop()
  public title: string;

  @Prop()
  public description: string;

  @Prop()
  public currencyCode: string;

  @Prop()
  public balance: string;

  @Prop()
  public goal: string;
}

export const MonobankJarSchema = SchemaFactory.createForClass(MonobankJar);
