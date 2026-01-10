import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DateTime } from 'luxon';
import { NewsEntity } from '../news/news.entity';
import { GdeltService } from './sources/gdelt.service';
import { GdeltArticle } from './sources/gdelt.types';

@Injectable()
export class IngestService {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepo: Repository<NewsEntity>,
    private readonly gdeltService: GdeltService,
  ) {}

  async ingestGdelt() {
    const articles: GdeltArticle[] = await this.gdeltService.fetchLatest();

    for (const item of articles) {
      const exists = await this.newsRepo.findOne({
        where: { url: item.url },
      });

      if (exists) continue;

      await this.newsRepo.save({
        title: item.title,
        description: item.seendate,
        source: 'gdelt',
        url: item.url,
        publishedAt: DateTime.fromISO(item.seendate, {
          zone: 'utc',
        }).toJSDate(),
        importance: 0.5,
      });
    }
  }
}
