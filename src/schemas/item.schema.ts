import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Store } from './store.schema';

@Schema()
export class Item {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Store' })
  store: Store;
}

export type ItemDocument = mongoose.HydratedDocument<Item>;
export const ItemSchema = SchemaFactory.createForClass(Item);
