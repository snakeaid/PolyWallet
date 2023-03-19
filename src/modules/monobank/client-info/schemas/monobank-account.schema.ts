import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class MonobankAccount {
  @Prop()
  public id: string;

  @Prop()
  public sendId: string;

  @Prop()
  public balance: string;

  @Prop()
  public creditLimit: string;

  @Prop()
  public type: string;

  @Prop()
  public currencyCode: string;

  @Prop()
  public cashbackType: string;

  @Prop({ type: [String] })
  public maskedPan: string[];

  @Prop()
  public iban: string;
}

export const MonobankAccountSchema = SchemaFactory.createForClass(MonobankAccount);
