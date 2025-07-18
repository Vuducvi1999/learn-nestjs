import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UserDocument } from 'src/schemas/user.schema';
import { UserAction } from 'src/shared/types/user-actions';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from 'src/schemas/item.schema';
import { RootFilterQuery, Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { QueryItemDto } from './dto/query-item.dto';
import { paginationExecute } from 'src/shared/helpers/pagination-execute';
import { CaslService } from '../../shared/modules/casl/casl.service';

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
    const newItem = plainToInstance(Item, createItemDto);

    if (ability.can(UserAction.create, newItem))
      return await this.itemModel.create(newItem);
    throw new UnauthorizedException('User must be owner of store');
  }
}
