import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from './item.service';
import { getModelToken } from '@nestjs/mongoose';
import { Item } from '../../schemas/item.schema';
import { CaslService } from '../../shared/modules/casl/casl.service';
import { paginationResult } from '../../shared/helpers/pagination-result';
import { paginationExecute } from '../../shared/helpers/pagination-execute';
import { mockUserDocument } from '../../../test/data/mock-user';
import { faker } from '@faker-js/faker/locale/vi';
import { UnauthorizedException } from '@nestjs/common';
import { mockItemDocument } from '../../../test/data/mock-item';

jest.mock('../../shared/helpers/pagination-execute');
const mockItemModel = jest.fn();
const mockCaslService = {
  createForUser: jest.fn(),
};
const sampleUserDocument = mockUserDocument();
const sampleItemDocument = mockItemDocument();

describe('ItemService', () => {
  let service: ItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemService,
        { provide: getModelToken(Item.name), useValue: mockItemModel },
        { provide: CaslService, useValue: mockCaslService },
      ],
    }).compile();

    service = module.get<ItemService>(ItemService);
  });

  describe('[getAll]', () => {
    it('should return pagination result', async () => {
      const limit = 10;
      const page = 1;
      const result: ReturnType<typeof paginationResult> = {
        currentPage: page,
        data: [],
        limit,
        nextPage: null,
        total: 10,
      };

      (paginationExecute as jest.Mock).mockResolvedValue(result);
      await expect(service.getAll({ limit, page })).resolves.toEqual(result);
    });
  });

  describe('[create]', () => {
    it('should throw UnauthorizedException if user is not owner', async () => {
      mockCaslService.createForUser.mockReturnValue({
        can: jest.fn().mockImplementation(() => false),
      });

      await expect(
        service.create(sampleUserDocument, {
          name: sampleItemDocument.name,
          price: sampleItemDocument.price,
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should create new item if user is owner', async () => {
      mockCaslService.createForUser.mockReturnValue({
        can: jest.fn().mockImplementation(() => true),
      });
      sampleItemDocument.save = jest.fn().mockResolvedValue(sampleItemDocument);
      mockItemModel.mockImplementation(() => sampleItemDocument);

      await expect(
        service.create(sampleUserDocument, {
          name: sampleItemDocument.name,
          price: sampleItemDocument.price,
        }),
      ).resolves.toEqual(sampleItemDocument);
    });
  });
});
