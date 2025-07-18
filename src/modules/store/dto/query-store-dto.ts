import { IsNumber, IsString } from 'class-validator';

export class QueryStoreDto {
  @IsString()
  name: string;

  @IsNumber()
  limit: number;

  @IsNumber()
  page: number;
}
