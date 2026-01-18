import { Controller } from '@nestjs/common';
import { EnrichService } from './enrich.service';

@Controller('enrich')
export class EnrichController {
  constructor(private readonly enrich: EnrichService) {}
}
