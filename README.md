# 🌍 Global News Engine

Open-source backend for aggregating, enriching and serving geo-located global news.

## Features
- Multi-source news ingestion (APIs, RSS, scraping)
- NLP-based location extraction
- PostGIS-powered geo queries
- Map-optimized API endpoints

## Tech Stack
- NestJS + TypeScript
- PostgreSQL + PostGIS
- OpenStreetMap Nominatim

## Local Development
```bash
docker compose up -d
npm install
npm run start:dev
