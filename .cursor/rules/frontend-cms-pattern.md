---
title: Frontend CMS Integration Pattern — Kebun Kumara
description: The fallback-first pattern used for all frontend pages that fetch from Payload CMS
tags: [frontend, nextjs, cms, pattern, kebunkumara]
---

# Frontend CMS Integration Pattern

This project uses a **fallback-first** pattern for all public-facing pages. Every page:

1. Starts with static fallback data from `src/lib/fallback-data.ts`
2. Attempts to fetch from Payload CMS at runtime (not build time)
3. Replaces fallback data with CMS data if available
4. Catches errors gracefully and serves the fallback

## Why the Build-Time Guard?

Next.js runs server components during `next build` to generate static HTML. At that point, the database is not available. Without the guard, the build fails with a DB connection error.

```ts
const phase = process.env.NEXT_PHASE;
if (phase !== "phase-production-build") {
  // Safe to query DB here
}
```

## Full Page Template

```tsx
import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { fallbackMyData } from "@/lib/fallback-data";

export const metadata: Metadata = {
  title: "Page Title — Kebun Kumara",
  description: "Page description.",
  openGraph: {
    title: "Page Title — Kebun Kumara",
    description: "Page description.",
    url: "https://kebunkumara.id/my-page",
    siteName: "Kebun Kumara",
    type: "website",
    locale: "id_ID",
  },
};

type MyItem = (typeof fallbackMyData)[number];

export default async function MyPage() {
  let items: MyItem[] = fallbackMyData;

  const phase = process.env.NEXT_PHASE;
  if (phase !== "phase-production-build") {
    try {
      const payload = await getPayload({ config });
      const result = await payload.find({
        collection: "my-collection",
        where: { _status: { equals: "published" } },
        sort: "-publishedAt",
        depth: 1,
        limit: 50,
      });
      if (result.docs.length > 0) {
        items = result.docs.map((doc) => {
          const img = doc.coverImage;
          return {
            slug: doc.slug ?? String(doc.id),
            title: doc.name,
            image:
              typeof img === "object" && img !== null
                ? (img as any).url ?? null
                : null,
          };
        });
      }
    } catch (err) {
      console.error("[MyPage] Failed to fetch from CMS:", err);
    }
  }

  return <main>...</main>;
}
```

## Dynamic Route Template (`[slug]/page.tsx`)

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import { fallbackItems } from "@/lib/fallback-data";

async function resolveItem(slug: string) {
  const fallback = fallbackItems.find((i) => i.slug === slug) ?? null;
  const phase = process.env.NEXT_PHASE;
  if (phase !== "phase-production-build") {
    try {
      const payload = await getPayload({ config });
      const result = await payload.find({
        collection: "my-collection",
        where: { slug: { equals: slug }, _status: { equals: "published" } },
        depth: 1,
        limit: 1,
      });
      if (result.docs.length > 0) {
        const doc = result.docs[0];
        const img = doc.coverImage;
        return {
          ...(fallback ?? {}),
          title: doc.name,
          image: typeof img === "object" && img !== null ? (img as any).url ?? null : null,
        };
      }
    } catch (err) {
      console.error("[MyPage/Slug] Failed to fetch from CMS:", err);
    }
  }
  return fallback;
}

async function resolveAllSlugs(): Promise<string[]> {
  const phase = process.env.NEXT_PHASE;
  if (phase !== "phase-production-build") {
    try {
      const payload = await getPayload({ config });
      const result = await payload.find({
        collection: "my-collection",
        where: { _status: { equals: "published" } },
        depth: 0,
        limit: 100,
      });
      if (result.docs.length > 0) {
        return result.docs.map((doc) => doc.slug ?? String(doc.id));
      }
    } catch (err) {
      console.error("[MyPage/AllSlugs] Failed to fetch from CMS:", err);
    }
  }
  return fallbackItems.map((i) => i.slug);
}

// ⚠️ params is a Promise in Next.js 16 — always await it
export async function generateStaticParams() {
  const slugs = await resolveAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await resolveItem(slug);
  return {
    title: item ? `${item.title} — Kebun Kumara` : "Not Found",
  };
}

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await resolveItem(slug);
  if (!item) return notFound();

  return <main>...</main>;
}
```

## Image Field Pattern

Upload fields are relations — at `depth: 1` they return a populated object, at `depth: 0` they return a string ID.

```ts
// Always guard the upload field:
const img = doc.coverImage
const imageUrl =
  typeof img === "object" && img !== null
    ? (img as any).url ?? null
    : null
```

## Globals Pattern (used in layout.tsx)

```tsx
import { getPayload } from "payload";
import config from "@payload-config";

let header = null, footer = null, siteSettings = null;
const phase = process.env.NEXT_PHASE;
if (phase !== "phase-production-build") {
  try {
    const payload = await getPayload({ config });
    [header, footer, siteSettings] = await Promise.all([
      payload.findGlobal({ slug: "header", depth: 1 }),
      payload.findGlobal({ slug: "footer", depth: 1 }),
      payload.findGlobal({ slug: "site-settings", depth: 1 }),
    ]);
  } catch (err) {
    console.error("[Layout] Failed to fetch CMS globals:", err);
  }
}
```

## Collection → Frontend Field Mapping

| Collection | Key CMS Fields | Frontend Usage |
|---|---|---|
| `posts` | `title`, `slug`, `content` (Lexical), `categories`, `coverImage` | Blog listing + detail |
| `plants` | `commonName`, `scientificName`, `slug`, `mainPhoto`, `careGuide`, `plantType` | Plant story grid + modal |
| `services` | `name`, `slug`, `serviceCategory`, `shortDescription`, `coverImage` | Service listing cards |
| `portfolios` | `projectName`, `slug`, `location`, `yearCompleted`, `coverImage`, `gallery` | Project grid + detail |
