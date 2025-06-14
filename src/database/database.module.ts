import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from 'src/configs/db.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forFeature(dbConfig),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(dbConfig)],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          ...configService.get<Record<string, any>>('db'),
          entities: ['./entities/*.entity.ts'],
          synchronize: false,
        };
      },
    }),
  ],
  providers: [DatabaseService],
})
export class DatabaseModule {}
