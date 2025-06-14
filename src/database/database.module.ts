import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from 'src/configs/db.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forFeature(dbConfig),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          ...DatabaseService.getConnectionOptions(),
          entities: ['./entities/*.entity.ts'],
          synchronize: false,
        };
      },
    }),
  ],
  providers: [DatabaseService],
})
export class DatabaseModule {}
