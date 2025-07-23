import { Injectable } from '@nestjs/common';
import { LibraryBookItem } from '../shared/types/book-library-item';
import * as cherrio from 'cheerio';
import {
  bookDetailPrefixUrl,
  bookHomePageUrl,
} from '../shared/constants/library-book';

@Injectable()
export class LibraryBookCrawlerService {
  async get100LatestBooks(): Promise<LibraryBookItem[]> {
    const latestBooks = await this.bookDetailFromHomePage();
    const latestPageIds = latestBooks.map(this.getPageIdFromDetailPage);
    const latestPageId = latestPageIds.at(0)!;
    const numbersFrom0To99: number[] = Array.from({ length: 100 }, (_, i) => i);
    return Promise.all(
      numbersFrom0To99.map(async (i) => {
        return this.bookImageFromDetailPage(latestPageId - i);
      }),
    );
  }

  async getBookWithRange({ from, to }: { from: number; to: number }) {
    const pageIds = Array.from(
      { length: to - from + 1 },
      (_, index) => from + index,
    );
    return Promise.all(
      pageIds.map(async (i) => {
        return this.bookImageFromDetailPage(i);
      }),
    );
  }

  private async bookImageFromDetailPage(
    pageId: number,
  ): Promise<LibraryBookItem> {
    const detailPageUrl = `${bookDetailPrefixUrl}/${pageId}`;
    const $ = await cherrio.fromURL(detailPageUrl);
    const selector = '.box-product-detail .image-product img';
    const imageUrl = $(selector).attr('src');
    return {
      imageUrl: imageUrl || '',
      pageUrl: detailPageUrl,
    };
  }

  private async bookDetailFromHomePage(): Promise<string[]> {
    const homePageUrl = bookHomePageUrl;
    const $ = await cherrio.fromURL(homePageUrl);
    const selector = '.tailieumoi .image-book img';
    return $(selector)
      .map((i, el) => $(el).attr('src'))
      .toArray();
  }

  private getPageIdFromDetailPage(url: string): number {
    const stringPageId = url.replace(bookDetailPrefixUrl, '');
    return parseInt(stringPageId);
  }
}
