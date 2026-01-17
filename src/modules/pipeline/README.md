# Pipeline Module

Coordinates background jobs for ingestion and enrichment.

## Jobs

- Ingest Job: fetches new articles from external sources
- Enrichment Job: assigns geographic locations to news items

## Design Principles

- Idempotent jobs
- Safe to rerun
- Failures are isolated per job
