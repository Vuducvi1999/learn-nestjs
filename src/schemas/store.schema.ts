import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';
import { Item } from './item.schema';

@Schema()
export class Store {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }] })
  items: Item[];
}

export type StoreDocument = mongoose.HydratedDocument<Store>;
export const StoreSchema = SchemaFactory.createForClass(Store);
