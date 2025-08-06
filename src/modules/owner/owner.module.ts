import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from 'src/schemas/item.schema';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { Store, StoreSchema } from 'src/schemas/store.schema';
import { UserModule } from '../../shared/modules/user/user.module';
import { UserService } from '../../shared/modules/user/user.service';

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
    UserModule,
  ],
  providers: [OwnerService, UserService],
  controllers: [OwnerController],
})
export class OwnerModule {}
