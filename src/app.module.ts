import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrawlerModule } from './crawler/crawler.module';
import { LibraryBookCrawlerModule } from './library-book-crawler/library-book-crawler.module';

@Module({
  imports: [CrawlerModule, LibraryBookCrawlerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
