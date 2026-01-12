import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GptLocationExtractor } from './gpt/location-extractor';

@Injectable()
export class EnrichService {
  private extractor: GptLocationExtractor;

  constructor(config: ConfigService) {
    this.extractor = new GptLocationExtractor(
      config.get<string>('OPENAI_API_KEY')!,
      config.get<string>('OPENAI_MODEL') || 'gpt-4o-mini',
    );
  }

  async extractLocations(title: string, description?: string) {
    const text = [title, description].filter(Boolean).join('\n');
    return this.extractor.extract(text);
  }
}
