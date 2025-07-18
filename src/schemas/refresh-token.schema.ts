import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class ValidRefreshToken {
  @Prop({ required: true, index: true })
  token: string;
}

export type ValidRefreshTokenDocument =
  mongoose.HydratedDocument<ValidRefreshToken>;
export const ValidRefreshTokenSchema =
  SchemaFactory.createForClass(ValidRefreshToken);
