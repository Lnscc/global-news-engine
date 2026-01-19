import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PipelineService } from 'src/modules/pipeline/pipeline.service';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(private readonly pipelineService: PipelineService) {
    this.ingestJob();
  }

  @Cron('0 * * * *')
  async ingestJob(): Promise<void> {
    this.logger.log('Cron job triggered: ingest pipeline');
    await this.pipelineService.run();
  }
}
