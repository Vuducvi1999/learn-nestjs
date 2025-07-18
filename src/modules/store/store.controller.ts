import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { QueryStoreDto } from './dto/query-store-dto';
import { IsObjectIdPipe } from '@nestjs/mongoose';
import { CurrentUser } from 'src/common/decorators/current-user';
import { UserDocument } from 'src/schemas/user.schema';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  create(
    @CurrentUser() user: UserDocument,
    @Body() createStoreDto: CreateStoreDto,
  ) {
    return this.storeService.create(user, createStoreDto);
  }

  @Get()
  findAll(@Query() query: QueryStoreDto) {
    return this.storeService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', IsObjectIdPipe) id: string) {
    return this.storeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', IsObjectIdPipe) id: string,
    @Body() updateStoreDto: UpdateStoreDto,
  ) {
    return this.storeService.update(id, updateStoreDto);
  }

  @Delete(':id')
  remove(@Param('id', IsObjectIdPipe) id: string) {
    return this.storeService.remove(id);
  }
}
