import { Injectable } from '@nestjs/common';
import axios from 'axios';
import type { GdeltApiResponse, GdeltArticle } from './gdelt.types';

@Injectable()
export class GdeltService {
  private readonly baseUrl = 'https://api.gdeltproject.org/api/v2/doc/doc';

  async fetchLatest(): Promise<GdeltArticle[]> {
    const url =
      `${this.baseUrl}` +
      `?query=sourcelang:eng` +
      `&mode=ArtList` +
      `&format=json` +
      `&maxrecords=50` +
      `&timespan=1day`;

    console.log(url);

    const { data } = await axios.get<GdeltApiResponse>(url);
    console.log(data);
    return data.articles;
  }
}
