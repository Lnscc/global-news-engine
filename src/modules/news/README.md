# News Module

Core data model for global news items.

## Responsibilities

- Define the News entity
- Provide geo-enabled persistence using PostGIS
- Act as foundation for ingestion and read APIs

## Notes

- Geographic coordinates are stored as PostGIS `POINT (lon, lat)`
- Importance is a normalized value between 0.0 and 1.0
- This module intentionally exposes no controllers
