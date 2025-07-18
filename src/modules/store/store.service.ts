import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Store } from 'src/schemas/store.schema';
import { Model, RootFilterQuery } from 'mongoose';
import { QueryStoreDto } from './dto/query-store-dto';
import { paginationExecute } from 'src/shared/helpers/pagination-execute';
import { User } from 'src/schemas/user.schema';
import { CaslService } from 'src/shared/modules/casl/casl.service';
import { UserAction } from 'src/shared/types/user-actions';
import { plainToClass } from 'class-transformer';

@Injectable()
export class StoreService {
  constructor(
    private caslService: CaslService,
    @InjectModel(Store.name)
    private storeModel: Model<Store>,
  ) {}

  async create(user: User, createStoreDto: CreateStoreDto) {
    const ability = this.caslService.createForUser(user);
    const newStore = plainToClass(Store, createStoreDto);
    if (ability.can(UserAction.create, newStore))
      return await this.storeModel.create({
        ...createStoreDto,
      });

    throw new UnauthorizedException();
  }

  async findAll({ name, limit, page }: QueryStoreDto) {
    const queries: RootFilterQuery<Store> = {
      name: new RegExp(name, 'i'),
    };

    return await paginationExecute({
      model: this.storeModel,
      queries,
      limit,
      page,
    });
  }

  async findOne(id: string) {
    return await this.storeModel.findById(id);
  }

  async update(id: string, updateStoreDto: UpdateStoreDto) {
    return await this.storeModel.findByIdAndUpdate(id, updateStoreDto);
  }

  async remove(id: string) {
    return await this.storeModel.findByIdAndDelete(id);
  }
}
