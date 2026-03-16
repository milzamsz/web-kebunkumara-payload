---
title: Queries — Kebun Kumara
description: Local API query patterns used in this project
tags: [payload, queries, local-api]
---

# Queries

## Common Query Patterns

### Published Content (standard)
```ts
await payload.find({
  collection: 'posts',
  where: { _status: { equals: 'published' } },
  sort: '-publishedAt',
  depth: 1,
  limit: 50,
})
```

### Filter by Category (services)
```ts
await payload.find({
  collection: 'services',
  where: {
    serviceCategory: { equals: 'educational-program' },
    _status: { equals: 'published' },
  },
  sort: 'displayOrder',
  depth: 1,
  limit: 50,
})
```

### Find by Slug
```ts
const result = await payload.find({
  collection: 'portfolios',
  where: {
    slug: { equals: slug },
    _status: { equals: 'published' },
  },
  depth: 1,
  limit: 1,
})
const doc = result.docs[0] ?? null
```

### Fetch All Slugs (for generateStaticParams)
```ts
const result = await payload.find({
  collection: 'plants',
  where: { _status: { equals: 'published' } },
  depth: 0,       // No population needed — just slugs
  limit: 100,
})
const slugs = result.docs.map((doc) => doc.slug ?? String(doc.id))
```

### Fetch Global
```ts
const header = await payload.findGlobal({ slug: 'header', depth: 1 })
const footer = await payload.findGlobal({ slug: 'footer', depth: 1 })
const settings = await payload.findGlobal({ slug: 'site-settings', depth: 1 })
```

### Parallel Fetches
```ts
const [postsResult, categoriesResult] = await Promise.all([
  payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    depth: 1,
    limit: 50,
  }),
  payload.find({ collection: 'categories', limit: 50 }),
])
```

## Query Operators

```ts
{ field: { equals: 'value' } }
{ field: { not_equals: 'draft' } }
{ field: { contains: 'keyword' } }
{ field: { in: ['a', 'b', 'c'] } }
{ field: { exists: true } }
{ field: { greater_than: 100 } }
{ field: { less_than_equal: 65 } }
```

## AND / OR

```ts
where: {
  or: [
    { serviceCategory: { equals: 'educational-program' } },
    { serviceCategory: { equals: 'movement' } },
  ],
}

where: {
  and: [
    { _status: { equals: 'published' } },
    { 'author.role': { equals: 'editor' } },
  ],
}
```

## Depth Guide

| `depth` | Effect |
|---|---|
| `0` | Returns IDs for all relations |
| `1` | Populates direct relations (coverImage, categories, etc.) |
| `2` | Populates relations of relations |

Use `depth: 1` for most frontend fetches. Use `depth: 0` when only fetching slugs/IDs.

## Performance Tips

- Set `limit` explicitly — default may be 10
- Use `depth: 0` when you only need slugs or IDs
- Use `select` to restrict returned fields for large collections
- For counts only: `await payload.count({ collection: 'posts', where: {...} })`
