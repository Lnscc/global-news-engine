# Enrichment Module

This module enriches news items with additional semantic information.

## Phase 4.1 – Location Extraction

- Uses GPT to extract geographic locations from news text
- Returns structured JSON only
- No geocoding is performed at this stage
- Designed for offline batch processing

## Design Principles

- Deterministic output
- Confidence-based filtering
- No side effects (no DB writes)
