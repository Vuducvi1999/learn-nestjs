import { Module } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { CrawlerController } from './crawler.controller';
import { LibraryBookCrawlerService } from '../library-book-crawler/library-book-crawler.service';
import { LibraryBookCrawlerModule } from '../library-book-crawler/library-book-crawler.module';

@Module({
  imports: [LibraryBookCrawlerModule],
  controllers: [CrawlerController],
  providers: [CrawlerService, LibraryBookCrawlerService],
})
export class CrawlerModule {}
