import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEntity } from './news.entity';
import { EnrichedNewsCandidate } from '../enrich/types/enriched-news-candidate';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly repo: Repository<NewsEntity>,
  ) {}

  async createFromEnriched(
    enriched: EnrichedNewsCandidate[],
  ): Promise<NewsEntity[]> {
    const saved: NewsEntity[] = [];

    for (const item of enriched) {
      const exists = await this.repo.findOne({
        where: { url: item.url },
      });

      if (exists) continue;

      const entity = this.repo.create({
        title: item.title,
        description: item.description,
        source: item.source,
        url: item.url,
        publishedAt: item.publishedAt,
        location: item.location,
        country: item.country,
        region: item.region,
      });

      saved.push(await this.repo.save(entity));
    }

    return saved;
  }

  async findForMap(params: {
    west: number;
    south: number;
    east: number;
    north: number;
    zoom?: number;
    limit?: number;
    category?: string;
  }) {
    const {
      west,
      south,
      east,
      north,
      zoom = 6,
      limit = 100,
      category,
    } = params;

    const qb = this.repo
      .createQueryBuilder('news')
      .where(
        `ST_Within(
          news.location::geometry,
          ST_MakeEnvelope(:west, :south, :east, :north, 4326)
        )`,
        { west, south, east, north },
      )
      .orderBy('news.importance', 'DESC')
      .limit(this.limitByZoom(zoom, limit));

    if (category) {
      qb.andWhere('news.category = :category', { category });
    }

    return qb.getMany();
  }

  private limitByZoom(zoom: number, limit: number) {
    if (zoom <= 2) return Math.min(limit, 20);
    if (zoom <= 4) return Math.min(limit, 50);
    return limit;
  }

  async findAll(params?: {
    limit?: number;
    category?: string;
    withLocation?: boolean;
  }) {
    const { limit = 100, category, withLocation = false } = params ?? {};

    const qb = this.repo
      .createQueryBuilder('news')
      .orderBy('news.publishedAt', 'DESC')
      .limit(limit);

    if (category) {
      qb.andWhere('news.category = :category', { category });
    }

    if (withLocation) {
      qb.andWhere('news.location IS NOT NULL');
    }

    return qb.getMany();
  }
}
