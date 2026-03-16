---
title: Access Control — Kebun Kumara
description: Access control patterns and available functions for this project
tags: [payload, access-control, security]
---

# Access Control

## Available Access Functions

All access functions are in `src/access/`. Always import and reuse — never inline.

```ts
import { anyone } from '../access/anyone'
// → () => true — public access

import { authenticated } from '../access/authenticated'
// → ({ req }) => !!req.user — requires login

import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
// → Authenticated users see all; public sees only published docs

import { isAdminOrEditor } from '../access/isAdminOrEditor'
// → ({ req }) => ['admin', 'editor'].includes(req.user?.role)
```

## Standard Content Collection Access

Use this pattern for all public content (posts, plants, services, portfolios):

```ts
access: {
  create: authenticated,
  read: authenticatedOrPublished,
  update: authenticated,
  delete: authenticated,
  readVersions: authenticated,
},
```

## Write-Only Public Collection (ContactSubmissions)

```ts
access: {
  create: anyone,        // Public submits contact forms
  read: authenticated,   // Only admin reads submissions
  update: authenticated,
  delete: authenticated,
},
```

## Public Read-Only (Categories, PlantCategories)

```ts
access: {
  create: authenticated,
  read: anyone,
  update: authenticated,
  delete: authenticated,
},
```

## Critical: Local API Access Control

**The Local API bypasses access control by default.** This is intentional for server-side operations, but when acting on behalf of a user, you MUST pass `overrideAccess: false`.

```ts
// ✅ CORRECT: Respects user permissions
const posts = await payload.find({
  collection: 'posts',
  user: req.user,
  overrideAccess: false,
})

// ❌ WRONG: User is passed but access control is silently bypassed
const posts = await payload.find({
  collection: 'posts',
  user: req.user,
  // overrideAccess defaults to true — user sees everything!
})

// ✅ OK: Intentional admin operation (no user context)
const allPosts = await payload.find({
  collection: 'posts',
  // No user, overrideAccess: true is fine here
})
```

## When to use `overrideAccess: false`

- API routes handling user requests (`/api/custom-endpoint`)
- Server Actions performing user-initiated operations
- Any operation where the result depends on who is asking

## Field-Level Access

Field access **only returns boolean** — no query constraints allowed at field level.

```ts
{
  name: 'internalNotes',
  type: 'textarea',
  access: {
    read: isAdminOrEditor,  // ✅ Boolean return
    update: isAdminOrEditor,
  },
}
```

## Globals Access

```ts
access: {
  read: anyone,          // Header/Footer are always public
  update: authenticated,
},
```
