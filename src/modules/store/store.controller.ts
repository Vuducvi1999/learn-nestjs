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
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('stores')
@ApiBearerAuth()
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
    @CurrentUser() user: UserDocument,
    @Param('id', IsObjectIdPipe) id: string,
    @Body() updateStoreDto: UpdateStoreDto,
  ) {
    return this.storeService.update(user, id, updateStoreDto);
  }

  @Delete(':id')
  remove(
    @CurrentUser() user: UserDocument,
    @Param('id', IsObjectIdPipe) id: string,
  ) {
    return this.storeService.remove(user, id);
  }
}
