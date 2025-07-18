import { Injectable } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { QueryOwnerItemDto } from './dto/query-owner-item.dto';
import { Model, RootFilterQuery } from 'mongoose';
import { Item } from 'src/schemas/item.schema';
import { paginationExecute } from 'src/shared/helpers/pagination-execute';
import { InjectModel } from '@nestjs/mongoose';
import { Store } from 'src/schemas/store.schema';
import { QueryOwnerStoreDto } from './dto/query-owner-store.dto';

@Injectable()
export class OwnerService {
  constructor(
    @InjectModel(Item.name)
    private itemModel: Model<Item>,
    @InjectModel(Store.name)
    private storeModel: Model<Store>,
  ) {}

  async getAllItems(
    user: User,
    { name, priceFrom, priceTo, limit, page }: QueryOwnerItemDto,
  ) {
    const queries: RootFilterQuery<Item> = {
      name: { $regex: name, $options: 'i' },
      price: { $gte: priceFrom, $lte: priceTo },
      store: { $in: user.stores },
    };

    return await paginationExecute({
      model: this.itemModel,
      queries,
      limit,
      page,
    });
  }

  async getAllStores(user: User, { name, limit, page }: QueryOwnerStoreDto) {
    const queries: RootFilterQuery<Item> = {
      name: { $regex: name, $options: 'i' },
      stores: { $in: user.stores },
    };

    return await paginationExecute({
      model: this.storeModel,
      queries,
      limit,
      page,
    });
  }
}
