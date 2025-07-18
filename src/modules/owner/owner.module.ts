import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from 'src/schemas/item.schema';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { Store, StoreSchema } from 'src/schemas/store.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Item.name,
        schema: ItemSchema,
      },
      {
        name: Store.name,
        schema: StoreSchema,
      },
    ]),
  ],
  providers: [OwnerService],
  controllers: [OwnerController],
})
export class OwnerModule {}
