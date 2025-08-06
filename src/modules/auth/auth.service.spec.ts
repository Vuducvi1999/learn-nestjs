import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { compare } from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { mockUser, mockUserDocument } from '../../../test/data/mock-user';
import { mockTokenPair } from '../../../test/data/jwt-token';
import { ValidRefreshToken } from '../../schemas/refresh-token.schema';
import { UserService } from '../../shared/modules/user/user.service';

jest.mock('bcrypt');
const sampleUser = { ...mockUser(), password: 'password' };
const sampleUserDocument = mockUserDocument();
const { accessToken, refreshToken } = mockTokenPair();
const mockUserService = {
  findOne: jest.fn(),
  create: jest.fn(),
};
const mockUserModel = {
  findOne: jest.fn(),
  updateOne: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest
              .fn()
              .mockResolvedValueOnce(accessToken)
              .mockResolvedValueOnce(refreshToken),
          },
        },
        {
          provide: getModelToken(ValidRefreshToken.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('[validateUser]', () => {
    jest.spyOn(mockUserService, 'findOne').mockResolvedValue(sampleUser);
    it('should return null if password wrong', async () => {
      (compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.validateUser(sampleUser.email, sampleUser.password),
      ).resolves.toEqual(null);
    });

    it('should return null if password wrong', async () => {
      (compare as jest.Mock).mockResolvedValue(true);

      await expect(
        service.validateUser(sampleUser.email, sampleUser.password),
      ).resolves.toEqual(sampleUser);
    });
  });

  describe('[register]', () => {
    it('should return new user', async () => {
      jest.spyOn(mockUserService, 'create').mockResolvedValue(sampleUser);

      await expect(service.register(sampleUser)).resolves.toEqual(sampleUser);
    });
  });

  describe('[login]', () => {
    it('should throw UnauthorizedException if login fail', async () => {
      jest.spyOn(mockUserService, 'findOne').mockResolvedValue(null);

      await expect(service.login(sampleUser)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should return token pair', async () => {
      jest.spyOn(mockUserService, 'findOne').mockResolvedValue(sampleUser);

      await expect(service.login(sampleUser)).resolves.toEqual({
        accessToken,
        refreshToken,
      });
    });
  });

  describe('[refreshToken]', () => {
    it('should throw UnauthorizedException if requested token not found', async () => {
      jest.spyOn(mockUserModel, 'findOne').mockResolvedValue(null);

      await expect(
        service.refreshToken(sampleUserDocument, ''),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should update and return new token pair', async () => {
      jest
        .spyOn(mockUserModel, 'findOne')
        .mockResolvedValue(sampleUserDocument);
      jest.spyOn(mockUserModel, 'updateOne').mockResolvedValue(true);

      await expect(
        service.refreshToken(sampleUserDocument, ''),
      ).resolves.toEqual({ accessToken, refreshToken });
    });
  });
});
