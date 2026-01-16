import { Module } from '@nestjs/common';
import { EnrichService } from './enrich.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEntity } from '../news/news.entity';
import { NominatimService } from './geocoding/nominatim.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity]), HttpModule],
  providers: [EnrichService, NominatimService],
  exports: [EnrichService],
})
export class EnrichModule {}
