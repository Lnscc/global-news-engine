import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { IngestModule } from '../modules/ingest/ingest.module';
import { EnrichModule } from '../modules/enrich/enrich.module';
import { PipelineModule } from 'src/modules/pipeline/pipeline.module';

@Module({
  imports: [IngestModule, EnrichModule, PipelineModule],
  providers: [JobsService],
})
export class JobsModule {}
