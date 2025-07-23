import { Module } from '@nestjs/common';
import { LibraryBookCrawlerService } from './library-book-crawler.service';

@Module({
  providers: [LibraryBookCrawlerService],
  exports: [LibraryBookCrawlerService],
})
export class LibraryBookCrawlerModule {}
