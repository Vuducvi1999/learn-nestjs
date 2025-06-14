import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from 'src/database/database.service';
import { DataSource } from 'typeorm';

void ConfigModule.forRoot();
console.log(DatabaseService.getConnectionOptions());

export default new DataSource({
  ...DatabaseService.getConnectionOptions(),
});
