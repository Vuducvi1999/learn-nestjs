import { faker } from '@faker-js/faker/locale/vi';

export const mockTokenPair = () => {
  return {
    accessToken: faker.internet.jwt(),
    refreshToken: faker.internet.jwt(),
  };
};
