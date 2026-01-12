export const LOCATION_EXTRACTION_PROMPT = `
You are an information extraction system.

Extract geographic locations that are explicitly mentioned or strongly implied
in the following news text.

Rules:
- Return ONLY valid JSON
- Do NOT include explanations
- Do NOT hallucinate locations
- Prefer the most specific location
- If no location is clear, return an empty array

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
  ]
}
`;
