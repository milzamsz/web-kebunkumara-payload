# Kebun Kumara — AI Agent Development Rules

## Project Overview

**Kebun Kumara** is an urban farming and regenerative landscaping company based in Indonesia. This repository is a Next.js 16 (App Router) + Payload CMS 3 website.

- **Frontend**: `src/app/(frontend)/` — public-facing Next.js pages
- **Admin**: `src/app/(payload)/` — Payload CMS admin panel
- **CMS Config**: `src/payload.config.ts`
- **Collections**: `src/collections/`
- **Globals**: `src/globals/`
- **Blocks**: `src/blocks/`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.0-canary (App Router, Turbopack) |
| CMS | Payload CMS 3.79.0 |
| Database | PostgreSQL (via `@payloadcms/db-postgres` + Drizzle) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4 |
| React | React 19 |
| Runtime | Node.js 25 |

---

## Collections & Globals Reference

### Collections
| Slug | Purpose |
|---|---|
| `users` | Admin/editor accounts — authentication collection |
| `media` | Uploaded images and files (Sharp processing) |
| `pages` | Generic CMS pages with block-based layout |
| `posts` | Blog articles with Lexical rich text |
| `categories` | Blog post categories |
| `plants` | Kumara Plant Story encyclopedia entries |
| `plant-categories` | Plant taxonomy (Edible, Ornamental, Shade-loving) |
| `services` | Service offerings (educational-program, landscaping-consultancy, garden-product, movement) |
| `portfolios` | Landscaping project portfolio entries |
| `contact-submissions` | Contact form submissions (write-only for public) |

### Globals
| Slug | Purpose |
|---|---|
| `header` | Navigation links, logo |
| `footer` | Footer links, social media |
| `site-settings` | SEO defaults, social handles, contact info |

### Blocks (used in Pages and Services `layout` field)
`HeroBanner`, `Content`, `MediaBlock`, `CallToAction`, `Gallery`, `Testimonials`, `Stats`, `FAQ`, `ServiceCards`, `MapBlock`

---

## Core Development Rules

### 1. TypeScript-First
- Always use generated types from `src/payload-types.ts`
- Run `npm run generate:types` after any schema change
- Never use `any` unless casting CMS `upload` relations (use `(img as any).url`)

### 2. Security — Critical
- **NEVER** call Local API without `overrideAccess: false` when acting on behalf of a user
- Access control functions live in `src/access/` — reuse them, never inline
- `ContactSubmissions` is create-only for public; reads require authentication

### 3. Frontend CMS Fetch Pattern
Every page that reads from CMS **must** use the build-time guard:

```ts
const phase = process.env.NEXT_PHASE;
if (phase !== "phase-production-build") {
  try {
    const payload = await getPayload({ config });
    // ... fetch
  } catch (err) {
    console.error("[PageName] Failed to fetch from CMS:", err);
  }
}
```

- Always fall back to `fallbackData` from `src/lib/fallback-data.ts`
- Pages must render correctly even when DB is unavailable

### 4. Access Control — Use Existing Functions
```ts
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { isAdminOrEditor } from '../access/isAdminOrEditor'
```

### 5. Rich Text
- Use `defaultLexical` from `src/fields/defaultLexical.ts` for all `richText` fields
- When rendering Lexical content on the frontend, traverse `content.root.children` — see existing converters in blog/plant pages

### 6. Versioning & Drafts
- All content collections use `drafts: { autosave: { interval: 100 } }`
- Filter published content with `where: { _status: { equals: "published" } }`
- `populatePublishedAt` hook (`src/hooks/populatePublishedAt.ts`) sets `publishedAt` on publish

### 7. Media Uploads
- All `upload` fields relate to the `media` collection
- `coverImage` / `mainPhoto` are optional (not required) to allow seeding without binary uploads
- After CMS fetch, always check: `typeof img === "object" && img !== null ? (img as any).url ?? null : null`

### 8. Transaction Safety in Hooks
Always pass `req` to nested operations inside hooks:
```ts
// ✅ CORRECT
await payload.update({ collection: 'posts', id, data, req })

// ❌ WRONG — breaks transaction atomicity
await payload.update({ collection: 'posts', id, data })
```

---

## File Conventions

### Collections
```ts
// src/collections/MyCollection.ts
import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { populatePublishedAt } from '../hooks/populatePublishedAt'

export const MyCollection: CollectionConfig = {
  slug: 'my-collection',
  versions: { drafts: { autosave: { interval: 100 } }, maxPerDoc: 50 },
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
    readVersions: authenticated,
  },
  fields: [/* ... */],
}
```

### Frontend Server Pages
```tsx
// src/app/(frontend)/my-page/page.tsx
import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { fallbackData } from "@/lib/fallback-data";

export const metadata: Metadata = { title: "Page — Kebun Kumara", ... };

export default async function MyPage() {
  let data = fallbackData;
  const phase = process.env.NEXT_PHASE;
  if (phase !== "phase-production-build") {
    try {
      const payload = await getPayload({ config });
      const result = await payload.find({
        collection: "my-collection",
        where: { _status: { equals: "published" } },
        depth: 1,
        limit: 50,
      });
      if (result.docs.length > 0) data = result.docs.map(mapFn);
    } catch (err) {
      console.error("[MyPage] Failed to fetch from CMS:", err);
    }
  }
  return <main>...</main>;
}
```

---

## Seed & Local Dev

```bash
# Start PostgreSQL (Docker)
docker start kebun-postgres   # or docker run ... (see README)

# Run dev server
npm run dev

# Seed database
npm run seed

# Admin panel
open http://localhost:3000/admin
# Login: admin@kebunkumara.id / Kebun2025!
```

After schema changes:
```bash
npm run generate:types       # Regenerate payload-types.ts
npm run generate:importmap   # Regenerate admin import map
```

---

## Vibe Coding Workflow — Frontend + CMS Sync

**Default mode: Frontend-first, CMS manually.**
AI only touches CMS files when the user explicitly says so (e.g. "also update the collection" or "sync CMS too").

### Frontend-only session (default)
- Edit UI, layout, styling, and component logic freely
- Use `fallbackData` from `src/lib/fallback-data.ts` as the data source during vibe coding
- Do **not** touch `src/collections/`, `src/globals/`, or `src/payload-types.ts` unless asked

### When the user says "sync CMS" or "update collection":
1. Add/update fields in the relevant collection or global
2. Run `npm run generate:types`
3. Update `src/lib/fallback-data.ts` to match

### Manual upload checklist (user runs independently):
- Schema changed → `npm run generate:types` + `npm run generate:importmap`
- New media → upload in Payload admin → `Media` collection
- New content → enter in Payload admin → relevant collection
- Check at `http://localhost:3000`

> Full checklist + field reference + logs: `docs/cms-upload-checklist.md`
>
> **After each vibe coding session**, add an entry to **Vibe Coding Edit History** in that file listing which files were changed and whether CMS was synced.

---

## Common Gotchas

1. **`NEXT_PHASE` guard** — without it, Payload tries to connect to DB during `next build`, causing build failures
2. **Upload relations** — always check `typeof img === "object"` before accessing `.url`; the field returns an ID string when `depth: 0`
3. **`overrideAccess`** — Local API defaults to `overrideAccess: true`; pass `overrideAccess: false` when acting as a user
4. **Hook loops** — use context flags to prevent `afterChange` hooks from triggering themselves recursively
5. **`params` is a Promise** in Next.js 16 App Router — always `await params` before destructuring
6. **`bodyProps`** — Payload's `RootLayout` accepts `bodyProps={{ suppressHydrationWarning: true }}` for browser extension interference

---

## Supplementary Rule Docs

Codex uses this `AGENTS.md` as the primary project rule file. When working in the areas below, also consult the matching reference in `.cursor/rules/`:

- `payload-overview.md` — project structure, collections, globals, scripts
- `frontend-cms-pattern.md` — fallback-first CMS fetch pattern for frontend pages
- `collections.md` — collection config conventions and draft/access patterns
- `access-control.md` — access helpers and row-level access patterns
- `hooks.md` — hook conventions, recursion guards, nested operations with `req`
- `queries.md` — Local API query patterns and relation/query examples
- `nextjs-patterns.md` — Next.js 16 App Router conventions specific to this repo
- `security-critical.mdc` — always-apply security constraints

These files are supplementary references, not replacements for the rules in this `AGENTS.md`.

---

## Resources

- Payload Docs: https://payloadcms.com/docs
- Payload LLM Context: https://payloadcms.com/llms-full.txt
- Next.js App Router: https://nextjs.org/docs/app
- Project Admin: http://localhost:3000/admin
