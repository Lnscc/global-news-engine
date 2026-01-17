import { Module } from '@nestjs/common';
import { PipelineService } from './pipeline.service';
import { IngestModule } from '../ingest/ingest.module';
import { EnrichModule } from '../enrich/enrich.module';

@Module({
  imports: [IngestModule, EnrichModule],
  providers: [PipelineService],
})
export class PipelineModule {}
