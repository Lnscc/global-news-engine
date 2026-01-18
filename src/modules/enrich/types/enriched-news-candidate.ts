export interface EnrichedNewsCandidate {
  source: string;
  sourceId: string;
  title: string;
  description?: string;
  url: string;
  publishedAt: Date;

  location?: {
    type: 'Point';
    coordinates: [number, number];
  };
  country?: string;
  region?: string;
  locationConfidence?: number;
}
