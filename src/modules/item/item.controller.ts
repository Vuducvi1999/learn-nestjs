import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { CurrentUser } from 'src/common/decorators/current-user';
import { User } from 'src/schemas/user.schema';
import { QueryItemDto } from './dto/query-item.dto';
import { Public } from 'src/common/decorators/public-api';

@Controller('items')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Public()
  @Get()
  getAll(@Query() queryItemDto: QueryItemDto) {
    return this.itemService.getAll(queryItemDto);
  }

  @Post()
  create(@CurrentUser() user: User, @Body() createItemDto: CreateItemDto) {
    return this.itemService.create(user, createItemDto);
  }

  @Patch()
  update(@CurrentUser() user: User, @Body() createItemDto: CreateItemDto) {
    return this.itemService.create(user, createItemDto);
  }

  @Delete()
  delete(@CurrentUser() user: User, @Body() createItemDto: CreateItemDto) {
    return this.itemService.create(user, createItemDto);
  }
}
