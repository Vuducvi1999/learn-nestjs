import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Item {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Store' })
  store: mongoose.Types.ObjectId;

  constructor(partial: Partial<Item>) {
    Object.assign(this, partial);
  }
}

export type ItemDocument = mongoose.HydratedDocument<Item>;
export const ItemSchema = SchemaFactory.createForClass(Item);
