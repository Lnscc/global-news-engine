import { Controller, Get, Query } from '@nestjs/common';
import { EnrichService } from './enrich.service';

@Controller('enrichment')
export class EnrichController {
  constructor(private readonly enrich: EnrichService) {}

  @Get('locations')
  async extract(@Query('text') text: string) {
    return this.enrich.extractLocations(text);
  }
}
