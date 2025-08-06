import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { CurrentUser } from 'src/common/decorators/current-user';
import { UserDocument } from 'src/schemas/user.schema';
import { QueryItemDto } from './dto/query-item.dto';
import { Public } from 'src/common/decorators/public-api';
import { IsObjectIdPipe } from '@nestjs/mongoose';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('items')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Public()
  @Get()
  getAll(@Query() queryItemDto: QueryItemDto) {
    return this.itemService.getAll(queryItemDto);
  }

  @Post()
  @ApiBearerAuth()
  create(
    @CurrentUser() user: UserDocument,
    @Body() createItemDto: CreateItemDto,
  ) {
    return this.itemService.create(user, createItemDto);
  }

  @Patch('/:id')
  @ApiBearerAuth()
  update(
    @CurrentUser() user: UserDocument,
    @Param('id', IsObjectIdPipe) id: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return this.itemService.update(user, id, updateItemDto);
  }

  @Delete('/:id')
  @ApiBearerAuth()
  delete(
    @CurrentUser() user: UserDocument,
    @Param('id', IsObjectIdPipe) id: string,
  ) {
    return this.itemService.delete(user, id);
  }
}
