---
title: Hooks — Kebun Kumara
description: Lifecycle hook patterns and conventions for this project
tags: [payload, hooks, lifecycle]
---

# Hooks

## Existing Hooks

### `populatePublishedAt` (`src/hooks/populatePublishedAt.ts`)

Used in every content collection. Sets `publishedAt` when status changes to `published`.

```ts
import { populatePublishedAt } from '../hooks/populatePublishedAt'

fields: [
  {
    name: 'publishedAt',
    type: 'date',
    hooks: { beforeChange: [populatePublishedAt] },
  },
]
```

## Transaction Safety

**Always pass `req`** to nested operations inside hooks to maintain PostgreSQL transaction atomicity.

```ts
// ✅ CORRECT — same transaction
hooks: {
  afterChange: [
    async ({ doc, req }) => {
      await req.payload.update({
        collection: 'related-collection',
        id: doc.relatedId,
        data: { updatedAt: new Date() },
        req, // ← critical
      })
    },
  ],
},

// ❌ WRONG — separate transaction, breaks atomicity
async ({ doc, req }) => {
  await req.payload.update({
    collection: 'related-collection',
    id: doc.relatedId,
    data: { updatedAt: new Date() },
    // No req — runs in a different transaction!
  })
}
```

## Preventing Hook Loops

If a hook triggers an update that would fire the same hook again, use a context flag:

```ts
hooks: {
  afterChange: [
    async ({ doc, req, context }) => {
      if (context.skipRelatedUpdate) return  // ← stop recursion

      await req.payload.update({
        collection: 'posts',
        id: doc.id,
        data: { relatedField: 'value' },
        req,
        context: { skipRelatedUpdate: true },  // ← set flag
      })
    },
  ],
},
```

## Next.js Cache Revalidation

Revalidate Next.js cache when CMS content is published:

```ts
import { revalidatePath } from 'next/cache'

hooks: {
  afterChange: [
    async ({ doc, previousDoc }) => {
      // Revalidate when status changes to published
      if (doc._status === 'published' && previousDoc._status !== 'published') {
        revalidatePath('/blog')
        revalidatePath(`/blog/${doc.slug}`)
      }
    },
  ],
},
```

## Hook Execution Order

| Stage | When | Use For |
|---|---|---|
| `beforeValidate` | Before validation | Format/normalize data |
| `beforeChange` | After validation, before save | Business logic, set computed fields |
| `afterChange` | After save | Side effects, cache invalidation, notifications |
| `afterRead` | After DB read | Computed/virtual fields |
| `beforeDelete` | Before deletion | Cascade cleanup, guard checks |
