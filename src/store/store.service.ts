import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Store, StoreDocument } from 'src/schemas/store.schema';
import { FilterQuery, Model } from 'mongoose';
import { QueryStoreDto } from './dto/query-store-dto';
import { paginationResult } from 'src/shared/helpers/pagination-result';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name)
    private storeModel: Model<Store>,
  ) {}

  // check currentUser for owner
  async create(createStoreDto: CreateStoreDto) {
    return await this.storeModel.create({
      ...createStoreDto,
    });
  }

  async findAll({ name, limit = 10, page = 0 }: QueryStoreDto) {
    const queries: FilterQuery<StoreDocument> = {
      name: {
        $regex: new RegExp(name, 'i'),
      },
    };

    const [total, data] = await Promise.all([
      this.storeModel.countDocuments(queries),
      this.storeModel
        .find(queries)
        .limit(limit)
        .skip(limit * page)
        .exec(),
    ]);

    return paginationResult<StoreDocument>({
      currentPage: page,
      data,
      limit,
      total,
    });
  }

  async findOne(id: number) {
    return await this.storeModel.findById(id);
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    return await this.storeModel.findByIdAndUpdate(id, updateStoreDto);
  }

  async remove(id: number) {
    return await this.storeModel.findByIdAndDelete(id);
  }
}
