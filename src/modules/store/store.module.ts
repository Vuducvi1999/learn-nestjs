import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, StoreSchema } from 'src/schemas/store.schema';
import { CaslModule } from 'src/shared/modules/casl/casl.module';
import { CaslService } from 'src/shared/modules/casl/casl.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Store.name,
        schema: StoreSchema,
      },
    ]),
    CaslModule,
  ],
  controllers: [StoreController],
  providers: [StoreService, CaslService],
})
export class StoreModule {}
