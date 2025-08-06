import { Types } from 'mongoose';

export type JwtPayload = {
  name: string;
  _id: Types.ObjectId;
};
