import { faker } from '@faker-js/faker/locale/vi';
import mongoose, { Schema } from 'mongoose';
import { User, UserDocument, UserSchema } from '../../src/schemas/user.schema';

const defaultUser: User = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  hashedPassword: faker.string.uuid(),
  stores: faker.helpers
    .uniqueArray(
      () => faker.database.mongodbObjectId(),
      faker.number.int({ min: 0, max: 10 }),
    )
    .map((t) => new mongoose.Types.ObjectId(t)),
};

export const mockUser = (options: Partial<User> = defaultUser) => {
  return options as User;
};

export const mockUserDocument = (options: Partial<User> = defaultUser) => {
  const UserModel = mongoose.model<UserDocument>(
    'User',
    new Schema(UserSchema.toJSONSchema()),
  );

  return new UserModel(options);
};
