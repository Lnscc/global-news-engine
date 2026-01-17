import { Controller, Post } from '@nestjs/common';
import { PipelineService } from './pipeline.service';

@Controller('pipeline')
export class PipelineController {
  constructor(private readonly pipeline: PipelineService) {}

  @Post('ingest')
  ingest() {
    return this.pipeline.ingestJob();
  }

  @Post('enrich')
  enrich() {
    return this.pipeline.enrichmentJob();
  }
}
