import { Controller, Get, Param, Query } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { QueryBookRangeDto } from './dto/query-book-range.dto';

@Controller('crawler')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Get('/library/100-latest-books')
  public get100LatestBook() {
    return this.crawlerService.get100LatestBooks();
  }

  @Get('/library/books-by-range')
  public getBooksByRange(@Query() { from, to }: QueryBookRangeDto) {
    return this.crawlerService.getBookWithRange({ from, to });
  }

  @Get('/library/book-detail/:id')
  getBookDetail(@Param('id') id: number) {
    return this.crawlerService.getBookDetail(id);
  }
}
