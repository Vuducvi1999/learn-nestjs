import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsValidObjectId } from 'src/shared/validations/is-valid-object-id.validation';

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: string;

  @IsValidObjectId()
  @ApiProperty({ type: String })
  owner: string;
}
