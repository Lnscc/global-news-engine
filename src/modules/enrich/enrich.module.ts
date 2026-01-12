import { Module } from '@nestjs/common';
import { EnrichService } from './enrich.service';
import { EnrichController } from './enrich.controller';

@Module({
  providers: [EnrichService],
  exports: [EnrichService],
  controllers: [EnrichController],
})
export class EnrichModule {}
