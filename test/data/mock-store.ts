import { faker } from '@faker-js/faker/locale/vi';
import mongoose, { Schema } from 'mongoose';
import {
  Store,
  StoreSchema,
  StoreDocument,
} from '../../src/schemas/store.schema';

const defaultStore: Store = {
  name: faker.commerce.productName(),
  owner: new mongoose.Types.ObjectId(faker.database.mongodbObjectId()),
  items: faker.helpers
    .uniqueArray(
      () => faker.database.mongodbObjectId(),
      faker.number.int({ min: 0, max: 10 }),
    )
    .map((t) => new mongoose.Types.ObjectId(t)),
};

export const mockStore = (options: Partial<Store> = defaultStore) => {
  return options as Store;
};

export const mockStoreDocument = (options: Partial<Store> = defaultStore) => {
  const StoreModel = mongoose.model<StoreDocument>(
    'Store',
    new Schema(StoreSchema.toJSONSchema()),
  );

  return new StoreModel(options);
};
