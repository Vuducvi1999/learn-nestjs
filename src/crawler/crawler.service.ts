import { Injectable } from '@nestjs/common';
import { LibraryBookCrawlerService } from '../library-book-crawler/library-book-crawler.service';

@Injectable()
export class CrawlerService {
  constructor(
    private readonly libraryBookCrawlerService: LibraryBookCrawlerService,
  ) {}

  get100LatestBooks() {
    return this.libraryBookCrawlerService.get100LatestBooks();
  }

  getBookWithRange({ from, to }: { from: number; to: number }) {
    return this.libraryBookCrawlerService.getBookWithRange({ from, to });
  }
}
