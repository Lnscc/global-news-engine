import { Module } from '@nestjs/common';
import { PipelineService } from './pipeline.service';
import { IngestModule } from '../ingest/ingest.module';
import { EnrichModule } from '../enrich/enrich.module';
import { NewsModule } from '../news/news.module';

@Module({
  imports: [IngestModule, EnrichModule, NewsModule],
  providers: [PipelineService],
  exports: [PipelineService],
})
export class PipelineModule {}
