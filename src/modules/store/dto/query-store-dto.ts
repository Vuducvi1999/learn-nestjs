import { IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/shared/classes/pagination-query';

export class QueryStoreDto extends PaginationQueryDto {
  @IsString()
  name: string;
}
