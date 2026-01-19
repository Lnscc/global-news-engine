import { Controller, Get, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsMapDto } from './dto/news-map.dto';
import { NewsEntity } from './news.entity';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async getForMap(
    @Query('bbox') bbox: string,
    @Query('zoom') zoom?: string,
    @Query('limit') limit?: string,
    @Query('category') category?: string,
  ): Promise<NewsMapDto[]> {
    if (!bbox) {
      throw new Error('bbox query parameter is required');
    }

    const [west, south, east, north] = bbox.split(',').map(Number);

    const news = await this.newsService.findForMap({
      west,
      south,
      east,
      north,
      zoom: zoom ? Number(zoom) : undefined,
      limit: limit ? Number(limit) : undefined,
      category,
    });

    return news.map((item) => ({
      id: item.id,
      title: item.title,
      importance: item.importance,
      category: item.category,
      coordinates: item.location ? item.location.coordinates : undefined,
    }));
  }

  @Get('all')
  async getAll(
    @Query('limit') limit?: string,
    @Query('category') category?: string,
  ): Promise<NewsMapDto[]> {
    const news = await this.newsService.findAll({
      limit: limit ? Number(limit) : undefined,
      category,
      withLocation: true,
    });

    return news.map(this.toDto);
  }

  private toDto = (item: NewsEntity): NewsMapDto => {
    return {
      id: item.id,
      title: item.title,
      importance: item.importance,
      category: item.category,
      coordinates: item.location?.coordinates,
      location:
        item.region && item.country && item.region !== item.country
          ? item.region + ', ' + item.country
          : item.region === item.country
            ? item.country
            : undefined,
    };
  };
}
