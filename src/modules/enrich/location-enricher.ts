import { Injectable } from '@nestjs/common';
import { GptLocationExtractor } from './gpt/location-extractor';
import { NominatimService } from './geocoding/nominatim.service';
import { LocationEnrichment } from './types/location-enrichment';

@Injectable()
export class LocationEnricher {
  constructor(
    private readonly extractor: GptLocationExtractor,
    private readonly nominatim: NominatimService,
  ) {}

  async enrich(
    title: string,
    description?: string,
  ): Promise<LocationEnrichment | null> {
    const text = [title, description].filter(Boolean).join('\n');

    const locations = await this.extractor.extract(text);
    if (!locations || locations.length === 0) return null;

    const candidate = locations.sort((a, b) => b.confidence - a.confidence)[0];

    if (candidate.confidence < 0.8) return null;

    const query = candidate.country
      ? `${candidate.name}, ${candidate.country}`
      : candidate.name;

    const geo = await this.nominatim.searchAddress(query);
    if (!geo) return null;

    return {
      confidence: candidate.confidence,
      location: {
        type: 'Point',
        coordinates: [parseFloat(geo.lon), parseFloat(geo.lat)],
      },
      country: candidate.country ?? undefined,
      region: candidate.name,
    };
  }
}
