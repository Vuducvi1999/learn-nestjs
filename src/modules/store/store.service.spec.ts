import { Test, TestingModule } from '@nestjs/testing';
import { StoreService } from './store.service';
import { getModelToken } from '@nestjs/mongoose';
import { Store } from '../../schemas/store.schema';
import { CaslService } from '../../shared/modules/casl/casl.service';
import { mockUserDocument } from '../../../test/data/mock-user';
import { faker } from '@faker-js/faker/locale/vi';
import { UnauthorizedException } from '@nestjs/common';
import { mockStoreDocument } from '../../../test/data/mock-store';
import { paginationExecute } from '../../shared/helpers/pagination-execute';
import { paginationResult } from '../../shared/helpers/pagination-result';

jest.mock('../../shared/helpers/pagination-execute');
const sampleUserDocument = mockUserDocument();
const sampleStoreDocument = mockStoreDocument();
const mockStoreModel = jest.fn().mockReturnValue({
  findById: jest.fn(),
});
const mockCaslService = {
  createForUser: jest.fn(),
};

describe('StoreService', () => {
  let service: StoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoreService,
        {
          provide: getModelToken(Store.name),
          useValue: mockStoreModel,
        },
        { provide: CaslService, useValue: mockCaslService },
      ],
    }).compile();

    service = module.get<StoreService>(StoreService);
  });

  describe('[create]', () => {
    it('should throw UnauthorizedException if user dont have create new store permission', async () => {
      jest.spyOn(mockCaslService, 'createForUser').mockReturnValue({
        can: jest.fn().mockReturnValue(false),
      });

      await expect(
        service.create(sampleUserDocument, {
          name: faker.person.fullName(),
          owner: faker.database.mongodbObjectId(),
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should create new store if user have permission create store', async () => {
      jest.spyOn(mockCaslService, 'createForUser').mockReturnValue({
        can: jest.fn().mockReturnValue(true),
      });
      jest
        .spyOn(sampleStoreDocument, 'save')
        .mockImplementation(async () => sampleStoreDocument);
      mockStoreModel.mockImplementation(() => {
        return sampleStoreDocument;
      });

      await expect(
        service.create(sampleUserDocument, {
          name: faker.person.fullName(),
          owner: faker.database.mongodbObjectId(),
        }),
      ).resolves.toEqual(sampleStoreDocument);
    });
  });

  describe('[findAll]', () => {
    it('should return pagination format', async () => {
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
      await expect(service.findAll({ name: '', limit, page })).resolves.toEqual(
        result,
      );
    });
  });

  describe('[findOne]', () => {
    it('should return exist store', async () => {
      (mockStoreModel as any).findById = jest
        .fn()
        .mockResolvedValue(sampleStoreDocument);

      await expect(
        service.findOne(sampleStoreDocument._id.toString()),
      ).resolves.toEqual(sampleStoreDocument);
    });
  });

  describe('[update]', () => {
    it('should return updated store', async () => {
      (mockStoreModel as any).findByIdAndUpdate = jest
        .fn()
        .mockResolvedValue(sampleStoreDocument);

      await expect(
        service.update(sampleStoreDocument._id.toString(), {
          name: faker.commerce.productName(),
        }),
      ).resolves.toEqual(sampleStoreDocument);
    });
  });

  describe('[remove]', () => {
    it('should return deleted store', async () => {
      (mockStoreModel as any).findByIdAndDelete = jest
        .fn()
        .mockResolvedValue(sampleStoreDocument);

      await expect(
        service.remove(sampleStoreDocument._id.toString()),
      ).resolves.not.toThrow();
    });
  });
});
