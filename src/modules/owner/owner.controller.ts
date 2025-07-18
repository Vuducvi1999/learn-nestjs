import { Controller, Get, Query } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user';
import { UserDocument } from 'src/schemas/user.schema';
import { QueryOwnerItemDto } from './dto/query-owner-item.dto';
import { OwnerService } from './owner.service';
import { QueryStoreDto } from '../store/dto/query-store-dto';

@Controller()
export class OwnerController {
  constructor(private ownerService: OwnerService) {}

  @Get('owners/items')
  getAllItems(
    @CurrentUser() user: UserDocument,
    @Query() queryItemDto: QueryOwnerItemDto,
  ) {
    return this.ownerService.getAllItems(user, queryItemDto);
  }

  @Get('owners/stores')
  getAllStore(
    @CurrentUser() user: UserDocument,
    @Query() queryStoreDto: QueryStoreDto,
  ) {
    return this.ownerService.getAllStores(user, queryStoreDto);
  }
}
