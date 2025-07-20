import { faker } from '@faker-js/faker/locale/vi';
import mongoose, { Schema } from 'mongoose';
import { Item, ItemDocument, ItemSchema } from '../../src/schemas/item.schema';

const defaultItem: Item = {
  name: faker.commerce.productName(),
  description: faker.word.words(10),
  price: faker.number.int({ min: 1_000, max: 100_000_000 }),
  store: new mongoose.Types.ObjectId(faker.database.mongodbObjectId()),
};

export const mockItem = (options: Partial<Item> = defaultItem) => {
  return options as Item;
};

export const mockItemDocument = (options: Partial<Item> = defaultItem) => {
  const ItemModel = mongoose.model<ItemDocument>(
    'Item',
    new Schema(ItemSchema.toJSONSchema()),
  );

  return new ItemModel(options);
};
