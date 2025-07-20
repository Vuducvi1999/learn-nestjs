import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/shared/classes/pagination-query';
import { IsArrayValidObjectId } from 'src/shared/validations/is-array-valid-object-id.validation';

export class QueryItemDto extends PaginationQueryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  priceFrom?: number;

  @IsNumber()
  @IsOptional()
  priceTo?: number;

  @IsArrayValidObjectId()
  @IsOptional()
  stores?: string[];
}
