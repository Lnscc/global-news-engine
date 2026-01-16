import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export interface NominatimSearchResult {
  place_id: number;
  licence: string;
  osm_type: 'node' | 'way' | 'relation';
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: {
    hamlet?: string;
    village?: string;
    town?: string;
    city?: string;
    county?: string;
    state?: string;
    country?: string;
    country_code?: string;
    'ISO3166-2-lvl4'?: string;
  };
  boundingbox: [string, string, string, string];
}

@Injectable()
export class NominatimService {
  constructor(private readonly http: HttpService) {}

  async searchAddress(query: string): Promise<NominatimSearchResult> {
    const url = 'https://nominatim.openstreetmap.org/search';

    const response = await firstValueFrom(
      this.http.get(url, {
        params: {
          q: query,
          format: 'json',
          addressdetails: 1,
          limit: 1,
        },
        headers: {
          'User-Agent': 'global-news-engine/1.0',
        },
      }),
    );

    return (response.data as NominatimSearchResult[])[0];
  }
}
