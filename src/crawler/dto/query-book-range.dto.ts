import { IsNotEmpty, IsNumber } from 'class-validator';

export class QueryBookRangeDto {
  @IsNumber()
  @IsNotEmpty()
  from: number;

  @IsNumber()
  @IsNotEmpty()
  to: number;
}
