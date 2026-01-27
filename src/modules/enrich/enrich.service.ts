import { Injectable } from '@nestjs/common';
import { LocationEnricher } from './location-enricher';
import { RawEvent } from '../ingest/types/raw-event';
import { EnrichedNewsCandidate } from './types/enriched-news-candidate';

@Injectable()
export class EnrichService {
  constructor(private readonly locationEnricher: LocationEnricher) {}

  async enrich(rawEvents: RawEvent[]): Promise<EnrichedNewsCandidate[]> {
    const enriched: EnrichedNewsCandidate[] = [];

    for (const event of rawEvents) {
      const location = await this.locationEnricher.enrich(event.title);

      enriched.push({
        ...event,
        location: location?.location,
        country: location?.country,
        region: location?.region,
        locationConfidence: location?.confidence,
        importance: location?.importance,
      });
    }

    return enriched;
  }
}
