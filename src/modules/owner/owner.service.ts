import { Injectable } from '@nestjs/common';
import { QueryOwnerItemDto } from './dto/query-owner-item.dto';
import { Model, RootFilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { QueryOwnerStoreDto } from './dto/query-owner-store.dto';
import { Item } from '../../schemas/item.schema';
import { Store } from '../../schemas/store.schema';
import { UserDocument } from '../../schemas/user.schema';
import { paginationExecute } from '../../shared/helpers/pagination-execute';

@Injectable()
export class OwnerService {
  constructor(
    @InjectModel(Item.name)
    private itemModel: Model<Item>,
    @InjectModel(Store.name)
    private storeModel: Model<Store>,
  ) {}

  async getAllItems(
    user: UserDocument,
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

  async getAllStores(
    user: UserDocument,
    { name, limit, page }: QueryOwnerStoreDto,
  ) {
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
