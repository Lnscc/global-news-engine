export const LOCATION_EXTRACTION_PROMPT = `
You are an information extraction system.

From the following news headline or short news text:
1. Extract geographic locations that are explicitly mentioned or strongly implied.
2. Assess the overall importance of the news.

Rules:
- Return ONLY valid JSON
- Do NOT include explanations
- Do NOT hallucinate locations
- Prefer the most specific location
- Importance should reflect potential global, regional, or societal impact
- If no location is clear, return an empty array

Importance scale:
1 = Very low (minor, local, or trivial news)
2 = Low (limited local or niche relevance)
3 = Medium (regional relevance or notable event)
4 = High (national importance or major industry impact)
5 = Very high (global significance, crisis, war, major political/economic event)

Text:
"""
{{TEXT}}
"""

JSON schema:
{
  "locations": [
    {
      "name": "string",
      "country": "string | null",
      "confidence": number
    }
  ],
  "importance": {
    "score": number,
    "label": "very_low | low | medium | high | very_high"
  }
}
`;
