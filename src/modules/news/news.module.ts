import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEntity } from './news.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity])],
})
export class NewsModule {}
