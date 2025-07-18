import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';
import { Item } from './item.schema';

@Schema()
export class Store extends mongoose.Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } })
  owner: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }] })
  items: Item[];
}

export const StoreSchema = SchemaFactory.createForClass(Store);
