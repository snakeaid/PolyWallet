import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Field, Int, ObjectType } from '@nestjs/graphql';

export type MoneyOperationDocument = HydratedDocument<MoneyOperation>;

@ObjectType()
@Schema()
export class MoneyOperation {
  @Field()
  @Prop()
  public username: string;

  @Field((type) => Int)
  @Prop()
  public timestamp: number;

  @Field()
  @Prop()
  public description: string;

  @Field((type) => Int)
  @Prop()
  public amount: number;

  @Field()
  @Prop()
  public currency: string;

  @Field()
  @Prop()
  public category: string;

  @Field()
  @Prop()
  public source: string;
}

export const MoneyOperationSchema = SchemaFactory.createForClass(MoneyOperation);
