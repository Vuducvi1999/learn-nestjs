import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Store } from './store.schema';
import { Exclude } from 'class-transformer';

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Exclude()
  @Prop({ required: true })
  hashedPassword: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Store' }] })
  stores: Store[];
}

export type UserDocument = mongoose.HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
