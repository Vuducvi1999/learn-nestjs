import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/shared/classes/pagination-query';
import { IsArrayValidObjectId } from 'src/shared/validations/is-array-valid-object-id.validation';

export class QueryOwnerItemDto extends PaginationQueryDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  name?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, required: false })
  priceFrom?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, required: false })
  priceTo?: number;

  @IsArrayValidObjectId()
  @IsOptional()
  @ApiProperty({ type: [String], required: false })
  stores?: string[];
}
