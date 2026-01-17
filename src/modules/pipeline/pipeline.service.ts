import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IngestService } from '../ingest/ingest.service';
import { EnrichService } from '../enrich/enrich.service';

@Injectable()
export class PipelineService {
  private readonly logger = new Logger(PipelineService.name);

  constructor(
    private readonly ingest: IngestService,
    private readonly enrich: EnrichService,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async ingestJob() {
    this.logger.log('Starting ingest job');

    try {
      await this.ingest.ingestGdelt();
    } catch (err) {
      this.logger.error('Ingest job failed', err);
    }
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async enrichmentJob() {
    this.logger.log('Starting enrichment job');

    try {
      await this.enrich.enrichUnlocatedNews(10);
    } catch (err) {
      this.logger.error('Enrichment job failed', err);
    }
  }
}
