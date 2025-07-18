import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Store extends mongoose.Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } })
  owner: mongoose.Types.ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }] })
  items: mongoose.Types.ObjectId[];
}

export const StoreSchema = SchemaFactory.createForClass(Store);
