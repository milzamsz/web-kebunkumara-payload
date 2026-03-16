# Component Contracts

## 1. Button
**Purpose:** Trigger actions or navigation.

- **Variants:**
  - `default`: Primary green background, white text.
  - `secondary`: Muted green/beige background, dark text.
  - `outline`: Transparent background, border primary, primary text.
  - `ghost`: Transparent background, hover effect only.
  - `link`: Underlined text, no background.
- **Sizes:**
  - `sm`: Text-xs, px-3 py-1.5
  - `md`: Text-sm, px-4 py-2 (Default)
  - `lg`: Text-base, px-6 py-3
- **Props:**
  - `asChild`: For Next.js `<Link>` integration (Slot pattern).
  - `loading`: Boolean, shows spinner.
  - `icon`: ReactNode (Left/Right).

## 2. Input
**Purpose:** User text entry.

- **States:**
  - `default`: Border gray-200.
  - `focus`: Ring primary, border primary.
  - `error`: Border red-500, error text below.
  - `disabled`: Opacity 50, not allowed.

## 3. Card
**Purpose:** Container for grouped content.

- **Variants:**
  - `basic`: White bg, shadow-sm, rounded-md.
  - `interactive`: Basic + hover:shadow-md, hover:-translate-y-1.
  - `image`: Full image background with overlay text.

## 4. Badge
**Purpose:** Status or category indicator.

- **Variants:**
  - `default`: Primary bg, white text.
  - `outline`: Border only.
  - `secondary`: Muted bg, dark text.
