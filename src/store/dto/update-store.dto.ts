import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateStoreDto } from './create-store.dto';

export class UpdateStoreDto extends PartialType(
  PickType(CreateStoreDto, ['name']),
) {}
