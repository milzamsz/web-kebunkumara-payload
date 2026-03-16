# Implementation Plan — KebunKumara Payload CMS v3

## Goal

Integrate Payload CMS v3 into the existing Next.js 16 frontend at `c:\Projects\Personal\kebunkumara\web-kebunkumara-payload`. After this, the admin panel will be at `/admin` and the frontend will gradually fetch data from Payload instead of hardcoded/static data.

> [!IMPORTANT]
> This plan covers the **CMS backend setup** (Phase 1–4). Frontend migration to consume CMS data (Phase 5) is listed but will be a separate follow-up task after verifying the CMS is working.

---

## Phase 1: Project Setup & Dependencies

### [MODIFY] [package.json](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/package.json)

Install Payload CMS v3 and required dependencies:
- `payload` — core CMS
- `@payloadcms/next` — Next.js integration
- `@payloadcms/db-postgres` — PostgreSQL adapter (uses **Drizzle ORM** internally)
- `@payloadcms/richtext-lexical` — Lexical rich text editor
- `@payloadcms/plugin-seo` — SEO plugin
- `@payloadcms/plugin-nested-docs` — nested categories
- `@payloadcms/plugin-search` — search plugin
- `@payloadcms/plugin-redirects` — redirects plugin
- `@payloadcms/live-preview-react` — live preview
- `@payloadcms/ui` — admin UI
- `sharp` — image processing
- `graphql` — GraphQL support
- `cross-env` — cross-platform env vars
- `dotenv` — load .env files

---

### [NEW] [.env](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/.env)

Environment variables:
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/kebunkumara
PAYLOAD_SECRET=kebunkumara-dev-secret-change-in-production
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

---

### [MODIFY] [next.config.ts](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/next.config.ts)

Wrap existing config with `withPayload()` from `@payloadcms/next/withPayload`.

---

### [MODIFY] [tsconfig.json](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/tsconfig.json)

Ensure `compilerOptions.jsx` is set correctly for Payload compatibility, and that paths include Payload's generated types.

---

### [NEW] [src/payload.config.ts](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/src/payload.config.ts)

Main Payload configuration file:
- Database adapter: `@payloadcms/db-postgres` (Drizzle ORM under the hood)
- Editor: Lexical with default features
- Collections: all 11 collections
- Globals: Header, Footer, SiteSettings
- Plugins: SEO, Search, Nested Docs, Redirects
- Admin user collection: `users`
- LivePreview: configured for mobile/tablet/desktop breakpoints
- Sharp: for image processing
- TypeScript output: `payload-types.ts`

---

### [NEW] [src/app/(payload)/admin/\[\[...segments\]\]/page.tsx](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/src/app/(payload)/admin/%5B%5B...segments%5D%5D/page.tsx)

Admin catch-all route — re-exports from `@payloadcms/next/views`.

### [NEW] [src/app/(payload)/admin/\[\[...segments\]\]/not-found.tsx](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/src/app/(payload)/admin/%5B%5B...segments%5D%5D/not-found.tsx)

Admin 404 page.

### [NEW] [src/app/(payload)/layout.tsx](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/src/app/(payload)/layout.tsx)

Layout for the admin panel route group — imports Payload's admin styles.

### [NEW] [src/app/(payload)/api/\[...slug\]/route.ts](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/src/app/(payload)/api/%5B...slug%5D/route.ts)

REST API catch-all route handler.

### [NEW] [src/app/(payload)/custom.scss](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/src/app/(payload)/custom.scss)

Custom admin styles (can be empty initially).

---

## Phase 2: Collection Schemas

### [NEW] [src/collections/Users.ts](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/src/collections/Users.ts)

Auth-enabled collection with fields: Email, Full Name, Role (admin/editor), Profile Picture.

### [NEW] [src/collections/Pages.ts](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/src/collections/Pages.ts)

Page builder collection with hero group, layout blocks, SEO tab, drafts.

### [NEW] [src/collections/Posts.ts](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/src/collections/Posts.ts)

Blog posts with Lexical editor, categories, authors, featured image, excerpt, SEO tab.

### [NEW] [src/collections/Categories.ts](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/src/collections/Categories.ts)

Taxonomy for blog posts with nested docs support.

### [NEW] [src/collections/Plants.ts](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/src/collections/Plants.ts)

Plant profiles with care guide group, gallery, ecological role, designer's note, SEO tab.

### [NEW] [src/collections/PlantCategories.ts](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/src/collections/PlantCategories.ts)

Plant type taxonomy (Ornamental, Shade-loving, Edible, etc.).

### [NEW] [src/collections/Services.ts](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/src/collections/Services.ts)

Service pages with page builder, service type dropdown, SEO tab.

### [NEW] [src/collections/Media.ts](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/src/collections/Media.ts)

Upload collection with alt text, caption, credit. Pre-configured image sizes: thumbnail, card, hero, og.

### [NEW] [src/collections/Portfolios.ts](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/src/collections/Portfolios.ts)

Portfolio/project showcase with gallery, client name, location, year.

### [NEW] [src/collections/ContactSubmissions.ts](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/src/collections/ContactSubmissions.ts)

Contact form storage. Admin view-only with status tracking (New/Read/Replied).

---

## Phase 3: Globals & Blocks

### [NEW] [src/globals/Header.ts](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/src/globals/Header.ts)

Navigation config: logo, nav links (with dropdowns), CTA button.

### [NEW] [src/globals/Footer.ts](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/src/globals/Footer.ts)

Footer config: logo, tagline, columns with links, social media, newsletter toggle, copyright.

### [NEW] [src/globals/SiteSettings.ts](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/src/globals/SiteSettings.ts)

Site-wide settings: site name, description, WhatsApp number, maps URL, analytics ID, social links.

### Layout Builder Blocks (all new files under `src/blocks/`)

- [NEW] `src/blocks/HeroBanner.ts` — full-width hero with image/video, CTA
- [NEW] `src/blocks/Content.ts` — rich text with column layout options
- [NEW] `src/blocks/MediaBlock.ts` — image/video embed
- [NEW] `src/blocks/CallToAction.ts` — CTA banner
- [NEW] `src/blocks/Gallery.ts` — image carousel/grid
- [NEW] `src/blocks/ServiceCards.ts` — service card grid
- [NEW] `src/blocks/Testimonials.ts` — testimonial slider
- [NEW] `src/blocks/MapBlock.ts` — Google Maps embed
- [NEW] `src/blocks/Stats.ts` — key numbers/metrics
- [NEW] `src/blocks/FAQ.ts` — accordion FAQ

---

## Phase 4: Access Control & Hooks

### [NEW] [src/access/authenticated.ts](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/src/access/authenticated.ts)

Returns `true` if the user is logged in.

### [NEW] [src/access/authenticatedOrPublished.ts](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/src/access/authenticatedOrPublished.ts)

Returns `true` if logged in, or if the document is published (`_status === 'published'`).

### [NEW] [src/access/anyone.ts](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/src/access/anyone.ts)

Always returns `true` (public read access).

### [NEW] [src/access/isAdminOrEditor.ts](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/src/access/isAdminOrEditor.ts)

Role-based access for admin vs editor permissions.

### [NEW] [src/hooks/populatePublishedAt.ts](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/src/hooks/populatePublishedAt.ts)

Auto-populate `publishedAt` when document status changes to published.

### [NEW] [src/fields/defaultLexical.ts](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/src/fields/defaultLexical.ts)

Default Lexical editor config with headings, horizontal rule, inline toolbar, fixed toolbar.

### [NEW] [src/plugins/index.ts](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/src/plugins/index.ts)

Central plugin registration: SEO, Search, Nested Docs, Redirects.

### [NEW] [src/utilities/getURL.ts](file:///c:/Projects/Personal/kebunkumara/web-kebunkumara-payload/src/utilities/getURL.ts)

Helper to get the server-side URL (`NEXT_PUBLIC_SERVER_URL` or fallback to `localhost:3000`).

---

## Phase 5: Frontend Integration (Follow-up)

> This phase will be tackled separately once Phase 1–4 are verified working.

- Wrap existing pages in a `(frontend)` route group
- Create data-fetching utilities using Payload Local API
- Migrate Navbar/Footer to consume Header/Footer globals
- Migrate each page to fetch from CMS collections

---

## Verification Plan

### Automated: Dev Server Startup
```
cd c:\Projects\Personal\kebunkumara\web-kebunkumara-payload
npm run dev
```
- **Expected:** Server starts at `http://localhost:3000` without errors
- **Expected:** Admin panel loads at `http://localhost:3000/admin`
- **Expected:** Database tables are auto-created on first run

### Manual: Admin Panel Testing
1. Open `http://localhost:3000/admin` in browser
2. Create the first admin user (email + password)
3. Verify all 11 collections appear in the admin sidebar
4. Verify all 3 globals (Header, Footer, Site Settings) appear
5. Create a test blog post with rich text, image, and category
6. Create a test plant profile with care guide and gallery
7. Verify SEO tab appears on Pages, Posts, Plants, Services, Portfolios
8. Verify the existing frontend (`http://localhost:3000`) still renders correctly

> [!NOTE]
> PostgreSQL must be running locally before starting the dev server. Start with Docker:
> ```
> docker run --name kebunkumara-pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=kebunkumara -p 5432:5432 -d postgres:17-alpine
> ```
> Uses `postgres:17-alpine` (lightweight ~80MB). Drizzle ORM (via `@payloadcms/db-postgres`) auto-generates tables from your Payload collection schemas on first run.
