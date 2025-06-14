import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from 'src/database/database.service';
import { DataSource } from 'typeorm';

void ConfigModule.forRoot();
const databaseService = new DatabaseService();

export default new DataSource({
  ...databaseService.getConnectionOptions(),
  migrations: ['./dist/db/migrations/*.js'],
  entities: ['./dist/entities/*.entity.js'],
});
