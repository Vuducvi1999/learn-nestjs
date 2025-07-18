import { Controller, Post } from '@nestjs/common';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(
    private itemService: ItemService
  ){}

  @Post('items')
  

}
