import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RootFilterQuery, Model } from 'mongoose';
import { QueryItemDto } from './dto/query-item.dto';
import { CaslService } from '../../shared/modules/casl/casl.service';
import { Item } from '../../schemas/item.schema';
import { paginationExecute } from '../../shared/helpers/pagination-execute';
import { UserDocument } from '../../schemas/user.schema';
import { UserAction } from '../../shared/types/user-actions';

@Injectable()
export class ItemService {
  constructor(
    private caslService: CaslService,
    @InjectModel(Item.name)
    private itemModel: Model<Item>,
  ) {}

  async getAll({
    name,
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
    const newItem = new this.itemModel(createItemDto);

    if (ability.can(UserAction.create, newItem)) return await newItem.save();
    throw new UnauthorizedException('User must be owner of store');
  }
}
