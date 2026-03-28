# CMS Upload Checklist - Post Vibe Coding

Run this after finishing a frontend vibe coding session.
Admin panel: **http://localhost:3000/admin** (`admin@kebunkumara.id` / `Kebun2025!`)

---

## 0. If Schema Was Changed

Only needed if you or AI touched `src/collections/` or `src/globals/`:

```bash
npm run generate:types
npm run generate:importmap
```

If you added SQL-backed fields and `db.push` is disabled, update the local database schema before opening the changed admin views.

---

## 1. Media (Images & Files)

**Collection -> Media**

For every new image referenced in the frontend:

- [ ] Upload the image file
- [ ] Copy the resulting URL or relation ID
- [ ] Use that media entry in the relevant collection or global

Images from Unsplash or other external URLs are fine for dev, but should be replaced before production.

---

## 2. Services

**Collection -> Services**

Each service card on the frontend needs a corresponding entry.

| Field | Required | Notes |
|---|---|---|
| `name` | yes | Displayed as the card title |
| `slug` | yes | Must match the frontend route slug |
| `serviceCategory` | yes | `educational-program`, `landscaping-consultancy`, `garden-product`, or `movement` |
| `shortDescription` | yes | Used on listing pages |
| `coverImage` | optional | Falls back to local/static imagery if missing |
| `displayOrder` | optional | Controls sorting on listing pages |
| `_status` | yes | Must be `published` to appear |

Current synced slugs:

- `garden-product`: `kandang-kumaruyuk`, `organic-seedlings`, `planting-media`
- `educational-program`: `public-workshops`, `company-programs`, `nature-playschool`, `school-programs`, `holiday-program`
- `movement`: `kompos-kolektif`, `urban-farming-workshop`

---

## 3. Blog Posts

**Collection -> Posts**

| Field | Required | Notes |
|---|---|---|
| `title` | yes | |
| `slug` | yes | URL-safe, lowercase, kebab-case |
| `content` | yes | Lexical rich text |
| `excerpt` | optional | Used on the listing page |
| `featuredImage` | optional | |
| `categories` | optional | Relate to Categories |
| `publishedAt` | auto | Set on publish via hook |
| `_status` | yes | Must be `published` |

---

## 4. Kumara Plant Story

**Collection -> Plants**

| Field | Required | Notes |
|---|---|---|
| `commonName` | yes | Displayed as the plant title |
| `scientificName` | yes | |
| `slug` | yes | |
| `mainPhoto` | optional | Frontend falls back when absent |
| `plantType` | optional | Relate to Plant Categories |
| `careGuide` | optional | Sunlight, watering, soil, temperature, humidity |
| `ecologicalRole` | optional | Lexical rich text |
| `designersNote.quote` | optional | |
| `designersNote.author` | optional | |
| `_status` | yes | Must be `published` |

---

## 5. Portfolio

**Collection -> Portfolios**

| Field | Required | Notes |
|---|---|---|
| `projectName` | yes | |
| `slug` | yes | |
| `location` | optional | |
| `clientName` | optional | |
| `yearCompleted` | optional | |
| `description` | optional | Lexical rich text |
| `coverImage` | optional | Used on cards and detail pages |
| `gallery` | optional | |
| `_status` | yes | Must be `published` |

---

## 6. Globals (Site-wide Settings)

Only update these if the frontend uses the value and it changed:

**Global -> Site Settings**
- [ ] Site name / description
- [ ] WhatsApp number
- [ ] Email
- [ ] Address
- [ ] Google Maps embed URL
- [ ] Social media handles

**Global -> Header**
- [ ] Navigation links
- [ ] CTA button

**Global -> Footer**
- [ ] Footer links
- [ ] Social links
- [ ] Copyright text

---

## 7. Homepage Content

The homepage (`src/app/(frontend)/page.tsx`) now reads from Payload for:

- hero copy via **Collection -> Pages (slug: home)**
- map embed + WhatsApp via **Global -> Site Settings**

Fallbacks still exist in `src/lib/fallback-data.ts`, so the page can render if the DB is unavailable.

---

## 8. Final Check

- [ ] Open `http://localhost:3000`
- [ ] Open `/about`
- [ ] Open `/contact`
- [ ] Open `/why-garden`
- [ ] Open `/media`
- [ ] Open `/services/movement`
- [ ] Open `/services/garden-product`
- [ ] Open `/blog`
- [ ] Open `/kumara-plant-story`
- [ ] Check browser console - no CMS fetch errors

---

## Quick Reference - Collection Slugs

| Frontend Route | Collection | Filter |
|---|---|---|
| `/` | `pages` + `siteSettings` | `slug: home` + global |
| `/about` | `pages` + `siteSettings` | `slug: about` + global |
| `/contact` | `pages` + `siteSettings` | `slug: contact` + global |
| `/why-garden` | `pages` | `slug: why-garden` |
| `/media` | `pages` | `slug: media` |
| `/blog` | `posts` | `_status: published` |
| `/blog/[slug]` | `posts` | `slug + published` |
| `/kumara-plant-story` | `plants` | `_status: published` |
| `/kumara-plant-story/[slug]` | `plants` | `slug + published` |
| `/services/garden-product` | `services` | `serviceCategory: garden-product` |
| `/services/educational-program` | `services` | `serviceCategory: educational-program` |
| `/services/landscaping-consultancy` | `services` | `serviceCategory: landscaping-consultancy` |
| `/services/movement` | `pages` + `services` + `siteSettings` | `slug: movement` + `serviceCategory: movement` + global |

---

## Vibe Coding Edit History

Track what changed in each frontend vibe coding session. Add a new entry at the top.

---

### 2026-03-26 - frontend to payload sync

**Files edited:**
- `package.json` - switched schema and seed scripts to the Node 25-safe `--import tsx` path and added working `generate:types` and `generate:importmap` scripts
- `scripts/generate-payload-artifacts.ts` - added a reusable Payload artifact generator for this repo
- `src/app/(frontend)/page.tsx` - homepage hero and map now read from `pages.home` and `siteSettings`
- `src/app/(frontend)/about/page.tsx` - about hero CTA now reads from `pages.about`; WhatsApp fallback now comes from `siteSettings`
- `src/app/(frontend)/contact/page.tsx` - contact hero, email, address, and socials now read from `pages.contact` and `siteSettings`
- `src/app/(frontend)/media/page.tsx` - media hero copy now reads from `pages.media`
- `src/app/(frontend)/services/movement/page.tsx` - movement hero reads from `pages.movement`; movement cards now read from `services`
- `src/app/(frontend)/why-garden/page.tsx` - hero image now reads from `pages.why-garden`
- `src/app/(frontend)/layout.tsx` - shared frontend fallback global now comes from `fallbackSiteSettings`
- `src/components/layout/Footer.tsx` - footer can now read Facebook from `siteSettings`
- `src/globals/SiteSettings.ts` - added `email`, `address`, and `socialMedia.facebook`
- `src/lib/fallback-data.ts` - added synced page and site-setting fallbacks plus movement slugs
- `src/lib/frontend-cms.ts` - added typed page, site-settings, and service fetch helpers using generated Payload types
- `src/payload-types.ts` - regenerated Payload types
- `src/seed.ts` - seeded new `siteSettings` fields, upserts `home/about/contact/why-garden/media/movement` page docs, and keeps synced pages idempotent

**Schema changed:** Yes

**CMS sync needed:**
- [x] `siteSettings` schema updated locally with `email`, `address`, and `socialMedia.facebook`
- [x] `pages` docs upserted for `home`, `about`, `contact`, `why-garden`, `media`, and `movement`
- [ ] Optional: upload `backgroundImage` assets in Payload for `about`, `why-garden`, and `movement` if you want those heroes controlled from admin instead of static fallbacks

**CMS synced:** Yes - local DB columns added, Payload types and import map regenerated, and seed re-run successfully

---

### 2026-03-27 - admin hydration + server action stabilization

**Files edited:**
- `src/app/(payload)/layout.tsx` - suppress hydration mismatches on Payload's root `style`, `head`, and `body` nodes so extension-injected `<style>` tags do not force admin re-hydration errors
- `src/app/(payload)/serverFunction.ts` - moved the Payload admin server action into a dedicated server-only module to keep the action reference stable across repeated autosaves
- `src/payload.config.ts` - enabled `admin.suppressHydrationWarning` in the supported Payload config surface

**Schema changed:** No

**CMS sync needed:** No

**CMS synced:** No

---

### 2026-03-26 - local admin stability fixes

**Files edited:**
- `scripts/next-runner.mjs` - normalize local `NEXT_PUBLIC_SERVER_URL` to the actual dev port and pin a stable dev server-actions encryption key
- `src/app/(payload)/layout.tsx` - wrap Payload's root layout output so `html`, `head`, and `body` suppress hydration warnings from extension-injected markup

**Schema changed:** No

**CMS sync needed:** No

**CMS synced:** No

---

### 2026-03-19 - DB push fix + spacing + card radius

**Files edited:**
- `src/payload.config.ts` - disabled automatic DB push to avoid failing DROP CONSTRAINT queries in dev
- `src/app/(frontend)/layout.tsx` - CMS globals fetch runs without triggering schema push errors
- `src/app/(frontend)/services/educational-program/page.tsx` - CTA bottom spacing restored (`py-24`)
- `src/app/(frontend)/services/garden-product/page.tsx` - product card border radius set to `rounded-[5px]`

**Schema changed:** No

**CMS sync needed:** No

**CMS synced:** No

---

### 2026-03-18 - hero section consistency pass

**Files edited:**
- `src/app/(frontend)/services/educational-program/page.tsx` - added full-bleed hero section (55vh, `/images/generated/urban-garden-hero.png`, gradient overlay, centered text); adjusted programs list from `py-24` to `pt-0 pb-24`
- `src/app/(frontend)/services/landscaping-consultancy/page.tsx` - restyled hero: reduced height from `80vh` to `55vh`, simplified gradient, updated typography to `font-display`, removed extra `<span>` wrapper

**Schema changed:** No

**CMS sync needed:**
- [x] `/images/generated/urban-garden-hero.png` already present locally
- [x] `/images/projects-hero-garden.png` already present locally
- [ ] `Portfolios` collection still needs real `coverImage` and `gallery` images at `/admin/collections/portfolios`

**CMS synced:** No new CMS entries required - all hero images are local static files

---

### 2026-03-17 - UI redesign pass + TypeScript cleanup

**Files edited:**
- `src/app/(frontend)/about/page.tsx` - value cards redesigned to full-bleed photo cards; removed the extra values heading; removed the handshake icon from CTA
- `src/app/(frontend)/contact/page.tsx` - email hardcoded to `kebunkumara@gmail.com`; hero title changed to `Contact`; removed the background SVG pattern and gradient overlay
- `src/app/(frontend)/media/page.tsx` - article card layout redesigned with a left-column photo and inline portal link
- `src/app/(frontend)/page.tsx` - image border radius changed to `rounded-[5px]`; removed decorative corner border
- `src/app/(frontend)/why-garden/page.tsx` - `WhyGardenSection` now uses `variant="vertical"`
- `src/app/(frontend)/blog/[slug]/page.tsx` - replaced `any` with proper type narrowing in Lexical rendering, author name, and image URL handling
- `src/app/(frontend)/blog/page.tsx` - proper type narrowing for category name and image URL
- `src/app/(frontend)/kumara-plant-story/KumaraPlantStoryClient.tsx` - removed subtitle paragraph showing plant count
- `src/app/(frontend)/kumara-plant-story/[slug]/page.tsx` - proper type narrowing for gallery, plant type, and main photo
- `src/app/(frontend)/kumara-plant-story/page.tsx` - proper type narrowing for plant type and main photo
- `src/app/(frontend)/services/educational-program/page.tsx` - full-bleed images, taller image area, and adjusted content padding
- `src/app/(frontend)/services/educational-program/[slug]/page.tsx` - added explicit `Program` type and image URL fixes
- `src/app/(frontend)/services/garden-product/page.tsx` - `"url" in img` guard
- `src/app/(frontend)/services/garden-product/[slug]/page.tsx` - `"url" in img` guard
- `src/app/(frontend)/services/landscaping-consultancy/[slug]/page.tsx` - full redesign plus gallery and hero image type narrowing
- `src/app/(frontend)/services/landscaping-consultancy/page.tsx` - `"url" in img` guard
- `src/components/sections/WhyGardenSection.tsx` - added `variant="vertical"` support
- `src/components/sections/WhyGardenStoriesSection.tsx` - component updates
- `src/components/ui/ProgramImageSlider.tsx` - component updates
- `src/components/layout/Navbar.tsx` - component updates
- `src/components/GardenSlider.tsx` - removed five unused lines

**Schema changed:** No

**CMS sync needed:**
- [ ] `SiteSettings` had no email field at that point; this was later fixed on 2026-03-26
- [ ] `Portfolios` collection still needs real `coverImage` and `gallery` images for all seeded entries
- [x] `/images/generated/` placeholder images were already present locally

**CMS synced:** Partial - images confirmed, portfolio photos still need upload

---

### 2026-03-16 - initial frontend pass

**Files edited:**
- `src/app/(frontend)/blog/[slug]/page.tsx`
- `src/app/(frontend)/blog/page.tsx`
- `src/app/(frontend)/kumara-plant-story/[slug]/page.tsx`
- `src/app/(frontend)/kumara-plant-story/page.tsx`
- `src/app/(frontend)/page.tsx`
- `src/app/(frontend)/services/educational-program/[slug]/page.tsx`
- `src/app/(frontend)/services/educational-program/page.tsx`
- `src/app/(frontend)/services/garden-product/[slug]/page.tsx`
- `src/app/(frontend)/services/garden-product/page.tsx`
- `src/app/(frontend)/services/landscaping-consultancy/[slug]/page.tsx`
- `src/app/(frontend)/services/landscaping-consultancy/page.tsx`
- `src/components/GardenSlider.tsx`
- `src/app/(payload)/layout.tsx`
- `scripts/preload-env.cjs`

**Schema changed:** No

**CMS synced:** No - pending manual upload
