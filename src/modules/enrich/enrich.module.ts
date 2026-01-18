import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnrichService } from './enrich.service';
import { LocationEnricher } from './location-enricher';
import { GptLocationExtractor } from './gpt/location-extractor';
import { NominatimService } from './geocoding/nominatim.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: GptLocationExtractor,
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        new GptLocationExtractor(
          config.get<string>('OPENAI_API_KEY')!,
          config.get<string>('OPENAI_MODEL') || 'gpt-4o-mini',
        ),
    },

    NominatimService,
    LocationEnricher,
    EnrichService,
  ],
  exports: [EnrichService],
})
export class EnrichModule {}
