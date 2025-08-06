import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RootFilterQuery, Model } from 'mongoose';
import { QueryItemDto } from './dto/query-item.dto';
import { CaslService } from '../../shared/modules/casl/casl.service';
import { Item } from '../../schemas/item.schema';
import { paginationExecute } from '../../shared/helpers/pagination-execute';
import { UserDocument } from '../../schemas/user.schema';
import { UserAction } from '../../shared/types/user-actions';
import { UpdateItemDto } from './dto/update-item.dto';
import { Store } from '../../schemas/store.schema';

@Injectable()
export class ItemService {
  constructor(
    private caslService: CaslService,
    @InjectModel(Item.name)
    private itemModel: Model<Item>,
    @InjectModel(Store.name)
    private storeModel: Model<Store>,
  ) {}

  async getAll({
    name = '',
    priceFrom,
    priceTo,
    limit,
    page,
    stores,
  }: QueryItemDto) {
    const queries: RootFilterQuery<Item> = {
      name: { $regex: name, $options: 'i' },
      price: { $gte: priceFrom, $lte: priceTo },
      store: { $in: stores },
    };

    return await paginationExecute({
      model: this.itemModel,
      queries,
      limit,
      page,
    });
  }

  async create(user: UserDocument, createItemDto: CreateItemDto) {
    const ability = this.caslService.createForUser(user);
    const currentStore = await this.storeModel.findById(createItemDto.store);
    if (!currentStore) throw new BadRequestException('Store not found');

    const newItem = new this.itemModel(createItemDto);
    currentStore.items.push(newItem._id);

    if (!ability.can(UserAction.create, newItem)) {
      await this.itemModel.findByIdAndDelete(newItem._id.toString());
      throw new BadRequestException(
        'User must be owner of store to create item',
      );
    }
    await Promise.all([newItem.save(), currentStore.save()]);
    return newItem;
  }

  async update(user: UserDocument, id: string, updateItemDto: UpdateItemDto) {
    const ability = this.caslService.createForUser(user);
    const existedItem = await this.itemModel.findById(id);

    if (!existedItem) throw new NotFoundException('Item not found');

    if (ability.can(UserAction.update, existedItem))
      return this.itemModel.findByIdAndUpdate(id, updateItemDto);

    throw new BadRequestException('User must be owner of store to update item');
  }

  async delete(user: UserDocument, id: string) {
    const ability = this.caslService.createForUser(user);
    const existedItem = await this.itemModel.findById(id);

    if (!existedItem) throw new NotFoundException('Item not found');

    if (ability.can(UserAction.delete, existedItem))
      return this.itemModel.findByIdAndDelete(id);

    throw new BadRequestException('User must be owner of store to delete item');
  }
}
