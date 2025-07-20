import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsValidObjectId } from 'src/shared/validations/is-valid-object-id.validation';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsValidObjectId()
  @IsOptional()
  store?: string;
}
