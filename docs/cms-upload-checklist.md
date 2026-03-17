# CMS Upload Checklist — Post Vibe Coding

Run this after finishing a frontend vibe coding session.
Admin panel: **http://localhost:3000/admin** (admin@kebunkumara.id / Kebun2025!)

---

## 0. If Schema Was Changed

Only needed if you or AI touched `src/collections/` or `src/globals/`:

```bash
npm run generate:types
npm run generate:importmap
```

---

## 1. Media (Images & Files)

**Collection → Media**

For every new image referenced in the frontend:

- [ ] Upload the image file
- [ ] Copy the resulting URL/ID
- [ ] Use that in the relevant collection entry (coverImage, mainPhoto, etc.)

> Images from Unsplash or Google URLs are fine for dev but should be replaced before production.

---

## 2. Services

**Collection → Services**

Each service card on the frontend needs a corresponding entry. Fields to fill:

| Field | Required | Notes |
|---|---|---|
| `name` | ✅ | Displayed as card title |
| `slug` | ✅ | Must match `fallbackProducts` / `fallbackServices` slugs |
| `serviceCategory` | ✅ | `garden-product` / `educational-program` / `landscaping-consultancy` / `movement` |
| `shortDescription` | ✅ | Used as card description and SEO |
| `coverImage` | optional | Falls back to `/images/generated/` placeholder |
| `_status` | ✅ | Set to **Published** or it won't appear |

Current expected slugs (from fallback data):

**garden-product:** `kompos-kascing`, `pupuk-organik`, `bibit-tanaman`, `media-tanam`
**educational-program:** `urban-farming-workshop`, `school-garden-program`, `corporate-team-building`
**landscaping-consultancy:** check `fallbackServices` in `src/lib/fallback-data.ts`

---

## 3. Blog Posts

**Collection → Posts**

| Field | Required | Notes |
|---|---|---|
| `title` | ✅ | |
| `slug` | ✅ | URL-safe, lowercase, kebab-case |
| `content` | ✅ | Lexical rich text |
| `excerpt` / `shortDescription` | optional | Used on listing page |
| `coverImage` | optional | |
| `categories` | optional | Relate to Categories collection |
| `publishedAt` | auto | Set on publish via hook |
| `_status` | ✅ | **Published** |

---

## 4. Kumara Plant Story

**Collection → Plants**

| Field | Required | Notes |
|---|---|---|
| `name` | ✅ | |
| `slug` | ✅ | |
| `shortDescription` | ✅ | |
| `content` | optional | Lexical rich text |
| `mainPhoto` | optional | |
| `plantCategory` | optional | Relate to Plant Categories |
| `_status` | ✅ | **Published** |

---

## 5. Portfolio

**Collection → Portfolios**

| Field | Required | Notes |
|---|---|---|
| `title` | ✅ | |
| `slug` | ✅ | |
| `category` | ✅ | e.g. `Public Space`, `Educational Farm`, `Community` |
| `coverImage` | optional | Shown as card image |
| `_status` | ✅ | **Published** |

---

## 6. Globals (Site-wide Settings)

Only update these if the frontend uses the value and it changed:

**Global → Site Settings**
- [ ] Site name, tagline
- [ ] Contact info (WhatsApp number, email, address)
- [ ] Social media handles

**Global → Header**
- [ ] Navigation links (if nav structure changed)

**Global → Footer**
- [ ] Footer links, social links

---

## 7. Homepage Content

The homepage (`src/app/(frontend)/page.tsx`) is currently **hardcoded** — no CMS fetch yet.
Skip this section unless you've wired up a Global or Pages collection for it.

When connected, enter via: **Global → Site Settings** or **Collection → Pages (slug: home)**

---

## 8. Final Check

- [ ] Open `http://localhost:3000` — homepage renders
- [ ] Open `/services/garden-product` — product cards appear
- [ ] Open `/blog` — posts appear
- [ ] Open `/kumara-plant-story` — plants appear
- [ ] Check browser console — no CMS fetch errors

---

## Quick Reference — Collection Slugs

| Frontend Route | Collection | Filter |
|---|---|---|
| `/blog` | `posts` | `_status: published` |
| `/blog/[slug]` | `posts` | `slug + published` |
| `/kumara-plant-story` | `plants` | `_status: published` |
| `/kumara-plant-story/[slug]` | `plants` | `slug + published` |
| `/services/garden-product` | `services` | `serviceCategory: garden-product` |
| `/services/educational-program` | `services` | `serviceCategory: educational-program` |
| `/services/landscaping-consultancy` | `services` | `serviceCategory: landscaping-consultancy` |

---

## Vibe Coding Edit History

Track what was changed in each frontend vibe coding session. Add a new entry at the top (newest first).

---

### 2026-03-18 — Hero section consistency pass

**Files edited:**
- `src/app/(frontend)/services/educational-program/page.tsx` — Added full-bleed hero section (55vh, `/images/generated/urban-garden-hero.png`, gradient overlay, centered text); adjusted programs list from `py-24` to `pt-0 pb-24`
- `src/app/(frontend)/services/landscaping-consultancy/page.tsx` — Restyled hero: reduced height from `80vh` to `55vh`, simplified gradient (removed bottom fade-to-bg layer), updated typography to `font-display` matching educational-program pattern, removed extra `<span>` wrapper

**Schema changed:** No

**CMS sync needed:**
- [x] `/images/generated/urban-garden-hero.png` — already present locally ✅
- [x] `/images/projects-hero-garden.png` — already present locally ✅
- [ ] `Portfolios` collection → real `coverImage` + `gallery` images still pending from 2026-03-17 (upload at `/admin/collections/portfolios`)

**CMS synced:** No new CMS entries required — all hero images are local static files

---

### 2026-03-17 — UI redesign pass + TypeScript cleanup

**Files edited:**
- `src/app/(frontend)/about/page.tsx` — Value cards redesigned to full-bleed photo cards (hardcoded `/images/generated/` paths); removed "Apa yang Kami Percaya" heading; removed handshake icon from CTA
- `src/app/(frontend)/contact/page.tsx` — Email hardcoded to `kebunkumara@gmail.com`; hero title changed to "Contact"; removed background SVG pattern + gradient overlay
- `src/app/(frontend)/media/page.tsx` — Article card layout redesigned: left-column photo (from `/images/generated/`), date moved under image, link changed from full-card overlay to inline text
- `src/app/(frontend)/page.tsx` — Image border-radius changed to `rounded-[5px]`; removed decorative corner border
- `src/app/(frontend)/why-garden/page.tsx` — `WhyGardenSection` now uses `variant="vertical"`
- `src/app/(frontend)/blog/[slug]/page.tsx` — TypeScript: replaced `any` with proper type narrowing in `lexicalToBlocks`, author name, and image URL
- `src/app/(frontend)/blog/page.tsx` — TypeScript: proper type narrowing for category name and image URL
- `src/app/(frontend)/kumara-plant-story/KumaraPlantStoryClient.tsx` — Removed subtitle paragraph showing plant count
- `src/app/(frontend)/kumara-plant-story/[slug]/page.tsx` — TypeScript: proper type narrowing for gallery, plantType, mainPhoto
- `src/app/(frontend)/kumara-plant-story/page.tsx` — TypeScript: proper type narrowing for plantType and mainPhoto
- `src/app/(frontend)/services/educational-program/page.tsx` — Layout: full-bleed images (no rounded corners), image height `h-[720px]`, content column padding adjusted
- `src/app/(frontend)/services/educational-program/[slug]/page.tsx` — Added explicit `Program` type; TypeScript image URL fix
- `src/app/(frontend)/services/garden-product/page.tsx` — TypeScript: `"url" in img` check
- `src/app/(frontend)/services/garden-product/[slug]/page.tsx` — TypeScript: `"url" in img` check
- `src/app/(frontend)/services/landscaping-consultancy/[slug]/page.tsx` — **Full redesign**: replaced hero + technical specs + asymmetric gallery with a horizontal scroll image slider (5 images, arrow nav, thumbnail strip); TypeScript type narrowing for gallery and hero image
- `src/app/(frontend)/services/landscaping-consultancy/page.tsx` — TypeScript: `"url" in img` check
- `src/components/sections/WhyGardenSection.tsx` — Added `variant="vertical"` support
- `src/components/sections/WhyGardenStoriesSection.tsx` — Component updates
- `src/components/ui/ProgramImageSlider.tsx` — Component updates
- `src/components/layout/Navbar.tsx` — Component updates
- `src/components/GardenSlider.tsx` — Removed 5 unused lines

**Schema changed:** No — no collections/globals modified, no `generate:types` needed

**CMS sync needed:**
- [ ] `SiteSettings` global has **no email field** — email is hardcoded in `contact/page.tsx`. To CMS-drive it: add `email` field to `src/globals/SiteSettings.ts` + run `generate:types` + update contact page fetch. (optional)
- [ ] `Portfolios` collection → upload real `coverImage` + `gallery` images for all 7 entries (currently all `null`). Do manually at `/admin/collections/portfolios`
- [x] `/images/generated/` placeholder images — all 6 present locally ✅

**CMS synced:** Partial — images confirmed, portfolio photos still need upload

---

### 2026-03-16 — Initial frontend pass

**Files edited:**
- `src/app/(frontend)/blog/[slug]/page.tsx` — blog detail page
- `src/app/(frontend)/blog/page.tsx` — blog listing page
- `src/app/(frontend)/kumara-plant-story/[slug]/page.tsx` — plant detail page
- `src/app/(frontend)/kumara-plant-story/page.tsx` — plant listing page
- `src/app/(frontend)/page.tsx` — homepage
- `src/app/(frontend)/services/educational-program/[slug]/page.tsx`
- `src/app/(frontend)/services/educational-program/page.tsx`
- `src/app/(frontend)/services/garden-product/[slug]/page.tsx`
- `src/app/(frontend)/services/garden-product/page.tsx`
- `src/app/(frontend)/services/landscaping-consultancy/[slug]/page.tsx`
- `src/app/(frontend)/services/landscaping-consultancy/page.tsx`
- `src/components/GardenSlider.tsx`
- `src/app/(payload)/layout.tsx`
- `scripts/preload-env.cjs`

**CMS synced:** No — pending manual upload
**Schema changed:** No

