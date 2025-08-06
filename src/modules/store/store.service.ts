import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, RootFilterQuery } from 'mongoose';
import { QueryStoreDto } from './dto/query-store-dto';
import { CaslService } from '../../shared/modules/casl/casl.service';
import { Store } from '../../schemas/store.schema';
import { UserDocument } from '../../schemas/user.schema';
import { UserAction } from '../../shared/types/user-actions';
import { paginationExecute } from '../../shared/helpers/pagination-execute';

@Injectable()
export class StoreService {
  constructor(
    private caslService: CaslService,
    @InjectModel(Store.name)
    private storeModel: Model<Store>,
  ) {}

  async create(user: UserDocument, createStoreDto: CreateStoreDto) {
    const ability = this.caslService.createForUser(user);
    const newStore = new this.storeModel(createStoreDto);
    if (ability.can(UserAction.create, newStore)) return newStore.save();

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

  async update(user: UserDocument, id: string, updateStoreDto: UpdateStoreDto) {
    const ability = this.caslService.createForUser(user);
    const existedStore = await this.storeModel.findById(id);

    if (!existedStore) throw new NotFoundException('Store not found');

    if (ability.can(UserAction.update, existedStore))
      return await this.storeModel.findByIdAndUpdate(id, updateStoreDto);

    throw new UnauthorizedException('User must be owner of store');
  }

  async remove(user: UserDocument, id: string) {
    const ability = this.caslService.createForUser(user);
    const existedStore = await this.storeModel.findById(id);

    if (!existedStore) throw new NotFoundException('Store not found');

    if (ability.can(UserAction.update, existedStore))
      return await this.storeModel.findByIdAndDelete(id);

    throw new UnauthorizedException('User must be owner of store');
  }
}
