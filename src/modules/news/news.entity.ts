import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column()
  source: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  imageUrl?: string;

  /**
   * Geographic location of the news event
   * Stored as PostGIS POINT (lon, lat)
   */
  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  location?: {
    type: 'Point';
    coordinates: [number, number];
  };

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  region?: string;

  @Column({ nullable: true })
  category?: string;

  /**
   * Importance score (0.0 – 1.0)
   */
  @Column({ type: 'float', default: 0 })
  importance: number;

  /**
   * Sentiment score (-1.0 – 1.0)
   */
  @Column({ type: 'float', nullable: true })
  sentiment?: number;

  @Index()
  @Column({ type: 'timestamptz', name: 'published_at' })
  publishedAt: Date;

  @Column({ type: 'timestamptz', name: 'created_at', default: () => 'NOW()' })
  createdAt: Date;
}
