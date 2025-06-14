import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('dbConfig', () => ({
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
}));
