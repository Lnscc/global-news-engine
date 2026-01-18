import { Injectable, Logger } from '@nestjs/common';
import { IngestService } from '../ingest/ingest.service';
import { EnrichService } from '../enrich/enrich.service';
import { NewsService } from '../news/news.service';

@Injectable()
export class PipelineService {
  private readonly logger = new Logger(PipelineService.name);

  constructor(
    private readonly ingestService: IngestService,
    private readonly enrichService: EnrichService,
    private readonly newsService: NewsService,
  ) {}

  async run(): Promise<void> {
    this.logger.log('Pipeline started');

    const rawEvents = await this.ingestService.fetch();
    this.logger.log(`Fetched ${rawEvents.length} raw events`);

    const enriched = await this.enrichService.enrich(rawEvents);
    this.logger.log(`Enriched ${enriched.length} events`);

    const saved = await this.newsService.createFromEnriched(enriched);
    this.logger.log(`Persisted ${saved.length} news items`);

    this.logger.log('Pipeline finished');
  }
}
