---
title: Next.js Patterns — Kebun Kumara
description: Next.js 16 App Router patterns specific to this project
tags: [nextjs, app-router, typescript, patterns]
---

# Next.js App Router Patterns

## Route Groups

```
src/app/
├── (frontend)/      # All public pages — uses frontend layout
│   ├── layout.tsx   # Navbar + Footer, fetches Header/Footer globals
│   ├── page.tsx     # Home page
│   ├── about/
│   ├── blog/
│   │   ├── page.tsx           # Blog listing
│   │   └── [slug]/page.tsx    # Blog post detail
│   ├── services/
│   │   ├── educational-program/
│   │   ├── landscaping-consultancy/
│   │   └── garden-product/
│   └── kumara-plant-story/
└── (payload)/       # Payload admin panel — DO NOT modify unless adding custom components
    └── layout.tsx
```

## `params` is a Promise in Next.js 16

Always `await params` before destructuring:

```tsx
// ✅ CORRECT
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
}

// ❌ WRONG — params is not synchronous in Next.js 16
export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params  // type error + runtime error
}
```

## Metadata Export

Every page must export `metadata` or `generateMetadata`:

```tsx
// Static metadata
export const metadata: Metadata = {
  title: "Page Title — Kebun Kumara",
  description: "Description.",
  openGraph: {
    title: "Page Title — Kebun Kumara",
    description: "Description.",
    url: "https://kebunkumara.id/page-path",
    siteName: "Kebun Kumara",
    type: "website",
    locale: "id_ID",
  },
}

// Dynamic metadata (slug pages)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const doc = await resolveDoc(slug)
  return {
    title: doc ? `${doc.title} — Kebun Kumara` : "Not Found",
    description: doc?.description,
  }
}
```

## Client Components

Use `"use client"` only when you need:
- `useState` / `useEffect` / `useReducer`
- Event handlers (`onClick`, `onChange`)
- Browser APIs (`localStorage`, `window`)
- Third-party hooks

```tsx
"use client"
import { useState } from "react"

export default function FilteredList({ items }: { items: Item[] }) {
  const [filter, setFilter] = useState("All")
  // ...
}
```

Server components pass data to client components as props:
```tsx
// page.tsx (server)
const items = await fetchItems()  // DB call in server component
return <FilteredList items={items} />  // Pass to client component
```

## Error Boundaries

- `src/app/(frontend)/error.tsx` — catches frontend errors (has `"use client"`)
- `src/app/(frontend)/not-found.tsx` — renders 404
- `src/app/(frontend)/loading.tsx` — renders loading spinner

## Image Component

All images use `next/image` with `fill` for responsive containers:

```tsx
<div className="relative h-64 overflow-hidden rounded-2xl">
  <Image
    src={imageUrl}
    alt={alt}
    fill
    className="object-cover"
    priority  // Only on above-the-fold hero images
  />
</div>
```

For fixed-size images use `width` + `height` instead of `fill`.

## Styling Conventions

- Tailwind CSS 4 — use utility classes
- Brand green: `#4a6741` (primary), `#364d2e` (hover)
- Brand warm: `#d4a373` (accent/gold)
- Background: `#f0efe9` (off-white)
- Font serif: `font-serif` (headings)
- Font display: `font-display` (product/card titles)
- Material Symbols icons: `<span className="material-symbols-outlined">icon_name</span>`
