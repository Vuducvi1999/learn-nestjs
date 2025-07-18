import { RootFilterQuery } from 'mongoose';
import * as mongoose from 'mongoose';
import { paginationResult } from './pagination-result';

type Document<T> = mongoose.HydratedDocument<T>;
type PaginationExecuteInput<T> = {
  model: mongoose.Model<T>;
  queries: RootFilterQuery<T>;
  limit?: number;
  page?: number;
};

export const paginationExecute = async <T>({
  model,
  queries,
  limit = 10,
  page = 0,
}: PaginationExecuteInput<T>) => {
  const [total, data] = await Promise.all([
    model.countDocuments(queries),
    model
      .find(queries)
      .limit(limit)
      .skip(limit * page)
      .exec(),
  ]);

  return paginationResult<Document<T>>({
    currentPage: page,
    data,
    limit,
    total,
  });
};
