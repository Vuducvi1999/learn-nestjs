import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

void ConfigModule.forRoot();
const configService = new ConfigService();

console.log(configService.get('DB_HOST'));

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/src/migrations/*.js'],
});
