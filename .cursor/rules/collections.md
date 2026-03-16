---
title: Collections — Kebun Kumara
description: Collection configuration patterns and conventions for this project
tags: [payload, collections, schema]
---

# Collections

## Standard Collection Template

All collections in this project follow this pattern:

```ts
import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { populatePublishedAt } from '../hooks/populatePublishedAt'

export const MyCollection: CollectionConfig = {
  slug: 'my-collection',
  labels: { singular: 'Item', plural: 'Items' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedAt'],
  },
  versions: {
    drafts: { autosave: { interval: 100 } },
    maxPerDoc: 50,
  },
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
    readVersions: authenticated,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'publishedAt',
      type: 'date',
      hooks: { beforeChange: [populatePublishedAt] },
    },
  ],
}
```

## serviceCategory Values

The `services` collection uses a `select` field with these exact values:
```ts
options: [
  { label: 'Educational Program', value: 'educational-program' },
  { label: 'Landscaping Consultancy', value: 'landscaping-consultancy' },
  { label: 'Garden Product', value: 'garden-product' },
  { label: 'Movement', value: 'movement' },
]
```

Always filter with: `where: { serviceCategory: { equals: 'educational-program' } }`

## Media Uploads

Upload fields are **not required** — images can be added via admin panel after seeding:

```ts
{
  name: 'coverImage',
  type: 'upload',
  relationTo: 'media',
  // No required: true — allows seed without binary uploads
}
```

When reading upload fields, always handle both populated object and raw ID:
```ts
const img = doc.coverImage
const url = typeof img === 'object' && img !== null ? (img as any).url ?? null : null
```

## Lexical Rich Text

Always use the shared `defaultLexical` editor:
```ts
import { defaultLexical } from '../fields/defaultLexical'

{
  name: 'content',
  type: 'richText',
  editor: defaultLexical,
}
```

## Blocks Layout Field

Used in `pages` and `services` collections. Available blocks:
```ts
import { HeroBanner } from '../blocks/HeroBanner'
import { Content } from '../blocks/Content'
import { MediaBlock } from '../blocks/MediaBlock'
import { CallToAction } from '../blocks/CallToAction'
import { Gallery } from '../blocks/Gallery'
import { Testimonials } from '../blocks/Testimonials'
import { Stats } from '../blocks/Stats'
import { FAQ } from '../blocks/FAQ'
import { ServiceCards } from '../blocks/ServiceCards'
import { MapBlock } from '../blocks/MapBlock'

{
  name: 'layout',
  type: 'blocks',
  blocks: [HeroBanner, Content, MediaBlock, CallToAction, Gallery, Testimonials, Stats, FAQ],
}
```

## Published-Only Queries

Always filter for published status in frontend queries:
```ts
await payload.find({
  collection: 'posts',
  where: { _status: { equals: 'published' } },
  sort: '-publishedAt',
  depth: 1,
  limit: 50,
})
```

## ContactSubmissions (Write-Only Public)

This collection is write-only for public users — access is restricted:
```ts
access: {
  create: anyone,      // Public can submit
  read: authenticated, // Only admin can read submissions
  update: authenticated,
  delete: authenticated,
}
```
