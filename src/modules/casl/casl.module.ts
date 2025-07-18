import { Module } from '@nestjs/common';
import { CaslAbilityService } from './casl-ability.service';

@Module({
  providers: [CaslAbilityService],
  exports: [CaslAbilityService],
})
export class CaslModule {}
