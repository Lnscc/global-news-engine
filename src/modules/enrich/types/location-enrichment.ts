export interface LocationEnrichment {
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  country?: string;
  region?: string;
  confidence: number;
}
