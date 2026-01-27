import OpenAI from 'openai';
import { LOCATION_EXTRACTION_PROMPT } from './prompts';

export interface ExtractedLocation {
  name: string;
  country: string | null;
  confidence: number;
}

export type ImportanceLabel =
  | 'very_low'
  | 'low'
  | 'medium'
  | 'high'
  | 'very_high';

export interface ExtractedImportance {
  score: number;
  label: ImportanceLabel;
}

export interface ExtractionResult {
  locations: ExtractedLocation[];
  importance: ExtractedImportance | null;
}

export class GptExtractor {
  private client: OpenAI;
  private model: string;

  constructor(apiKey: string, model: string) {
    this.client = new OpenAI({ apiKey });
    this.model = model;
  }

  async extract(text: string): Promise<ExtractionResult> {
    const prompt = LOCATION_EXTRACTION_PROMPT.replace('{{TEXT}}', text);

    const response = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0,
    });

    const raw = response.choices[0].message.content;

    if (!raw) {
      return {
        locations: [],
        importance: null,
      };
    }

    try {
      const parsed = JSON.parse(raw) as Partial<ExtractionResult>;

      return {
        locations: parsed.locations ?? [],
        importance: parsed.importance ?? null,
      };
    } catch {
      return {
        locations: [],
        importance: null,
      };
    }
  }
}
