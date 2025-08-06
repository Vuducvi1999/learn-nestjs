import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class ValidRefreshToken {
  @Prop({ required: true, index: true })
  token: string;

  constructor(partial: Partial<ValidRefreshToken>) {
    Object.assign(this, partial);
  }
}

export type ValidRefreshTokenDocument =
  mongoose.HydratedDocument<ValidRefreshToken>;
export const ValidRefreshTokenSchema =
  SchemaFactory.createForClass(ValidRefreshToken);
