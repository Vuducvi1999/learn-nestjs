import { IsNumber, IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsNumber()
  @IsOptional()
  page?: number;
}
