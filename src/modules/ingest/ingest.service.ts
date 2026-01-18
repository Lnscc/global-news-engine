import { Injectable, Logger } from '@nestjs/common';
import { DateTime } from 'luxon';
import { GdeltService } from './sources/gdelt.service';
import { RawEvent } from './types/raw-event';

@Injectable()
export class IngestService {
  private readonly logger = new Logger(IngestService.name);

  constructor(private readonly gdeltService: GdeltService) {}

  async fetch(): Promise<RawEvent[]> {
    this.logger.log('Fetching GDELT articles');

    const articles = await this.gdeltService.fetchLatest();

    return articles.map((article) => ({
      source: 'gdelt',
      sourceId: article.url,
      title: article.title,
      url: article.url,
      publishedAt: DateTime.fromISO(article.seendate, {
        zone: 'utc',
      }).toJSDate(),
      rawPayload: article,
    }));
  }
}
