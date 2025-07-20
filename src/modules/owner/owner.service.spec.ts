import { Test, TestingModule } from '@nestjs/testing';
import { OwnerService } from './owner.service';
import { getModelToken } from '@nestjs/mongoose';
import { Item } from '../../schemas/item.schema';
import { Store } from '../../schemas/store.schema';
import { paginationResult } from '../../shared/helpers/pagination-result';
import { mockUserDocument } from '../../../test/data/mock-user';
import { paginationExecute } from '../../shared/helpers/pagination-execute';

jest.mock('../../shared/helpers/pagination-execute');
const mockItemModel = {};
const mockStoreModel = {};
const sampleUserDocument = mockUserDocument();

describe('OwnerService', () => {
  let service: OwnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OwnerService,
        {
          provide: getModelToken(Item.name),
          useValue: mockItemModel,
        },
        {
          provide: getModelToken(Store.name),
          useValue: mockStoreModel,
        },
      ],
    }).compile();

    service = module.get<OwnerService>(OwnerService);
  });

  describe('[getAllItems]', () => {
    it('should return pagination value', async () => {
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
      await expect(
        service.getAllItems(sampleUserDocument, { limit, page }),
      ).resolves.toEqual(result);
    });
  });

  describe('[getAllStores]', () => {
    it('should return pagination value', async () => {
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
      await expect(
        service.getAllStores(sampleUserDocument, { limit, page }),
      ).resolves.toEqual(result);
    });
  });
});
