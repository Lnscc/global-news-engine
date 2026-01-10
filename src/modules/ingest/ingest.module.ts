import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEntity } from '../news/news.entity';
import { IngestService } from './ingest.service';
import { GdeltService } from './sources/gdelt.service';

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity])],
  providers: [IngestService, GdeltService],
})
export class IngestModule {}
