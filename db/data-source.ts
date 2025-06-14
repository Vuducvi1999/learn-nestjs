import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from 'src/database/database.service';
import { DataSource } from 'typeorm';

void ConfigModule.forRoot();

export default new DataSource({
  ...DatabaseService.getConnectionOptions(),
  migrations: ['./dist/db/migrations/*.js'],
  entities: ['./dist/entities/*.entity.js'],
});
