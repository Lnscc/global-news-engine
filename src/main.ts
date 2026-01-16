import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IngestService } from './modules/ingest/ingest.service';
import { EnrichService } from './modules/enrich/enrich.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
  const enrichment = app.get(EnrichService);
  await enrichment.enrichUnlocatedNews(15);
  const ingestService = app.get(IngestService);
  await ingestService.ingestGdelt();
}
bootstrap();
