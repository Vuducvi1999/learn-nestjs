import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsValidObjectId } from 'src/shared/validations/is-valid-object-id.validation';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsValidObjectId()
  store: string;
}
