import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthModule } from './modules/health/health.module';
import { NewsModule } from './modules/news/news.module';
import { IngestModule } from './modules/ingest/ingest.module';
import { EnrichModule } from './modules/enrich/enrich.module';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { PipelineModule } from './modules/pipeline/pipeline.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DATABASE_HOST'),
        port: Number(config.get('DATABASE_PORT')),
        username: config.get('DATABASE_USER'),
        password: config.get('DATABASE_PASSWORD'),
        database: config.get('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    HttpModule,
    HealthModule,
    NewsModule,
    IngestModule,
    EnrichModule,
    PipelineModule,
    JobsModule,
  ],
})
export class AppModule {}
