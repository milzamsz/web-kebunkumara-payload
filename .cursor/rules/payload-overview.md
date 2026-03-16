---
title: Payload CMS Overview — Kebun Kumara
description: Core principles and quick reference for this project's Payload CMS setup
tags: [payload, overview, kebunkumara]
---

# Payload CMS — Project Overview

## Stack

- **Payload**: 3.79.0 with PostgreSQL adapter (Drizzle ORM)
- **Next.js**: 16.2.0-canary (App Router, Turbopack)
- **Editor**: `lexicalEditor()` — use `defaultLexical` preset from `src/fields/defaultLexical.ts`
- **Types**: Generated at `src/payload-types.ts` — run `npm run generate:types` after schema changes

## Getting Payload Instance

```ts
// In any server component or API route
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })
```

## Project Structure

```
src/
├── app/
│   ├── (frontend)/          # Public-facing Next.js pages
│   └── (payload)/           # Payload admin panel
├── collections/             # All collection configs
├── globals/                 # Header, Footer, SiteSettings
├── blocks/                  # Reusable layout blocks
├── access/                  # Shared access control functions
├── hooks/                   # Shared lifecycle hooks
├── fields/                  # Shared field configs (defaultLexical)
├── lib/
│   └── fallback-data.ts     # Static fallbacks for all frontend pages
├── seed.ts                  # Database seed script
└── payload.config.ts        # Root Payload configuration
```

## Collections Quick Reference

| Slug | Key Fields | Access |
|---|---|---|
| `users` | email, role | authenticated |
| `media` | filename, url, alt | anyone read, authenticated write |
| `pages` | title, slug, layout (blocks) | authenticatedOrPublished |
| `posts` | title, slug, content (Lexical), categories | authenticatedOrPublished |
| `categories` | name, slug | anyone read |
| `plants` | commonName, scientificName, slug, mainPhoto, careGuide | authenticatedOrPublished |
| `plant-categories` | name, slug | anyone read |
| `services` | name, slug, serviceCategory, shortDescription, coverImage, layout | authenticatedOrPublished |
| `portfolios` | projectName, slug, location, yearCompleted, coverImage, gallery | authenticatedOrPublished |
| `contact-submissions` | name, email, message | anyone create, authenticated read |

## Globals Quick Reference

| Slug | Purpose |
|---|---|
| `header` | Logo, navigation links |
| `footer` | Footer links, social media handles |
| `site-settings` | Site name, SEO defaults, contact info, social links |

## Key Scripts

```bash
npm run dev              # Start dev server (Turbopack)
npm run seed             # Seed database with initial content
npm run generate:types   # Regenerate payload-types.ts
npm run generate:importmap  # Regenerate admin import map
```

## Resources

- Docs: https://payloadcms.com/docs
- LLM Context: https://payloadcms.com/llms-full.txt
- GitHub: https://github.com/payloadcms/payload
