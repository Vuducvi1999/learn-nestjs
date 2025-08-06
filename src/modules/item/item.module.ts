import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { CaslModule } from '../../shared/modules/casl/casl.module';
import { CaslService } from '../../shared/modules/casl/casl.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from 'src/schemas/item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Item.name,
        schema: ItemSchema,
      },
    ]),
    CaslModule,
  ],
  controllers: [ItemController],
  providers: [ItemService, CaslService],
  exports: [ItemService],
})
export class ItemModule {}
