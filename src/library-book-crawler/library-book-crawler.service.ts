import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LibraryBookItem } from '../shared/types/book-library-item';
import * as cherrio from 'cheerio';
import {
  bookDetailPrefixUrl,
  bookHomePageUrl,
} from '../shared/constants/library-book';

@Injectable()
export class LibraryBookCrawlerService {
  async get100LatestBooks() {
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
    const imageUrls = await Promise.all(
      pageIds.map(async (i) => {
        return this.bookImageFromDetailPage(i);
      }),
    );
    return imageUrls.flatMap((i) =>
      i && !i.includes('BookCoverDefault') ? [i] : [],
    );
  }

  async getBookDetail(id: number) {
    return this.bookImageFromDetailPage(id);
  }

  private async bookImageFromDetailPage(pageId: number) {
    const detailPageUrl = `${bookDetailPrefixUrl}/${pageId}`;
    try {
      const $ = await cherrio.fromURL(detailPageUrl);
      const selector = '.box-product-detail .image-product img';
      const imageUrl = $(selector).attr('src');
      return imageUrl;
    } catch (error) {
      return undefined;
    }
  }

  private async bookDetailFromHomePage(): Promise<string[]> {
    const homePageUrl = bookHomePageUrl;
    const $ = await cherrio.fromURL(homePageUrl);
    const selector = '.tailieumoi .image-book a';
    return $(selector)
      .map((i, el) => $(el).attr('href'))
      .toArray()
      .map((detail) => `${bookHomePageUrl}${detail}`);
  }

  private getPageIdFromDetailPage(url: string): number {
    const regex = /\/(\d+)$/;
    const match = url.match(regex);

    if (match && match[1]) {
      return parseInt(match[1]);
    }

    throw new InternalServerErrorException();
  }
}
