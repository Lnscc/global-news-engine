import OpenAI from 'openai';
import { LOCATION_EXTRACTION_PROMPT } from './prompts';

export interface ExtractedLocation {
  name: string;
  country: string | null;
  confidence: number;
}

export class GptLocationExtractor {
  private client: OpenAI;
  private model: string;

  constructor(apiKey: string, model: string) {
    this.client = new OpenAI({ apiKey });
    this.model = model;
  }

  async extract(text: string): Promise<ExtractedLocation[]> {
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

    if (!raw) return [];

    try {
      const parsed = JSON.parse(raw);
      return parsed.locations ?? [];
    } catch {
      return [];
    }
  }
}
