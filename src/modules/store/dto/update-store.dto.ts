import { PartialType, PickType } from '@nestjs/swagger';
import { CreateStoreDto } from './create-store.dto';

export class UpdateStoreDto extends PartialType(
  PickType(CreateStoreDto, ['name']),
) {}
