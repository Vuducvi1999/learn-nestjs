import { IsNotEmpty, IsString } from 'class-validator';
import { IsValidObjectId } from 'src/shared/validations/is-valid-object-id.validation';

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsValidObjectId()
  owner: string;
}
