import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/shared/classes/pagination-query';

export class QueryStoreDto extends PaginationQueryDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  name?: string;
}
