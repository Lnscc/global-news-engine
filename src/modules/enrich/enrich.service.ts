import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GptLocationExtractor } from './gpt/location-extractor';
import { NominatimService } from './geocoding/nominatim.service';
import { NewsEntity } from '../news/news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class EnrichService {
  private extractor: GptLocationExtractor;

  constructor(
    config: ConfigService,
    @InjectRepository(NewsEntity)
    private readonly newsRepo: Repository<NewsEntity>,
    private readonly nominatim: NominatimService,
  ) {
    this.extractor = new GptLocationExtractor(
      config.get<string>('OPENAI_API_KEY')!,
      config.get<string>('OPENAI_MODEL') || 'gpt-4o-mini',
    );
  }

  async extractLocations(title: string, description?: string) {
    const text = [title, description].filter(Boolean).join('\n');
    return await this.extractor.extract(text);
  }

  async enrichNewsLocation(news: NewsEntity): Promise<boolean> {
    console.log(`Enriching location for news item ${news.id}...`);
    if (news.location) {
      return false;
    }

    console.log(news.title, news.description);
    const locations = await this.extractLocations(news.title, news.description);
    console.log(locations);

    if (locations.length === 0) {
      return false;
    }

    const candidate = locations.sort((a, b) => b.confidence - a.confidence)[0];

    if (candidate.confidence < 0.8) {
      return false;
    }

    const query = candidate.country
      ? `${candidate.name}, ${candidate.country}`
      : candidate.name;

    const geo = await this.nominatim.searchAddress(query);
    console.log(geo);

    if (!geo) {
      return false;
    }

    news.location = {
      type: 'Point',
      coordinates: [parseFloat(geo.lon), parseFloat(geo.lat)],
    };

    news.country = candidate.country ?? undefined;
    news.region = candidate.name;

    await this.newsRepo.save(news);

    return true;
  }

  async enrichUnlocatedNews(limit = 10) {
    console.log(`Enriching up to ${limit} unlocated news items...`);
    const items = await this.newsRepo.find({
      where: { location: IsNull() },
      take: limit,
    });

    for (const news of items) {
      try {
        await this.enrichNewsLocation(news);
      } catch {
        continue;
      }
    }
  }
}
