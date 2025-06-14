import { Injectable } from '@nestjs/common';
import { DataSourceOptions } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor() {}

  getConnectionOptions(): DataSourceOptions {
    return {
      type: 'postgres',
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || 5432),
    };
  }
}
