import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Item extends mongoose.Document<mongoose.Types.ObjectId> {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' } })
  store: mongoose.Types.ObjectId;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
