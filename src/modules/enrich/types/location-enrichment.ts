import { ExtractedImportance } from '../gpt/location-extractor';

export interface LocationEnrichment {
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  country?: string;
  region?: string;
  confidence: number;
  importance?: ExtractedImportance;
}
