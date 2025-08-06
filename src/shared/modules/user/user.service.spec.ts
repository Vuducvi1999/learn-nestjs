import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from '../../schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { mockUserDocument } from '../../../test/data/mock-user';
import { hash } from 'bcrypt';

jest.mock('bcrypt');
const sampleUserDocument = mockUserDocument();
const mockUserModel = {
  findById: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('[findById]', () => {
    it('should return user', async () => {
      jest
        .spyOn(mockUserModel, 'findById')
        .mockResolvedValue(sampleUserDocument);

      await expect(
        service.findById(sampleUserDocument._id.toString()),
      ).resolves.toEqual(sampleUserDocument);
    });
  });

  describe('[findOne]', () => {
    it('should return user', async () => {
      jest
        .spyOn(mockUserModel, 'findOne')
        .mockResolvedValue(sampleUserDocument);

      await expect(
        service.findOne({ email: sampleUserDocument.email }),
      ).resolves.toEqual(sampleUserDocument);
    });
  });

  describe('[create]', () => {
    it('should return new user', async () => {
      (hash as jest.Mock).mockResolvedValue(sampleUserDocument.hashedPassword);
      jest.spyOn(mockUserModel, 'create').mockResolvedValue(sampleUserDocument);

      await expect(
        service.create({
          email: sampleUserDocument.email,
          name: sampleUserDocument.name,
          password: 'password',
        }),
      ).resolves.toEqual(sampleUserDocument);
    });
  });
});
