import { Injectable } from '@nestjs/common';
import { LibraryBookCrawlerService } from '../library-book-crawler/library-book-crawler.service';

@Injectable()
export class CrawlerService {
  constructor(
    private readonly libraryBookCrawlerService: LibraryBookCrawlerService,
  ) {}

  async get100LatestBooks() {
    return this.libraryBookCrawlerService.get100LatestBooks();
  }

  async getBookWithRange({ from, to }: { from: number; to: number }) {
    return this.libraryBookCrawlerService.getBookWithRange({ from, to });
  }

  async getBookDetail(id: number) {
    return this.libraryBookCrawlerService.getBookDetail(id);
  }
}
