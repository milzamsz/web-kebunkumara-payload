# UI/UX Audit & Refactor Plan

**Product:** Kebun Kumara Website (Prototype)
**Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript.

## A. Findings & Risks

### 1. Inconsistent Tokens (Colors & Typography)
- **Colors:**
  - **Primary Green:** Multiple variations used inconsistently.
    - `var(--color-primary)` defined as `#4F772D`.
    - Hardcoded `#4F772D` used in `Navbar`, `Footer`, `HomePage`.
    - Hardcoded `#4a6741` (muted green) used in `ProjectsPage` and `BotanicalIndex`.
    - Hardcoded `#344E41`, `#31572C` (dark greens) used in CTA backgrounds.
    - Hardcoded `#2a3c24` used in Footer background.
    - Hardcoded `#90A955` used as accent.
  - **Neutrals:**
    - Backgrounds vary: `#FAFAF8`, `#F3F1E8`, `#fcfbf9`, `#f0efe9`, `bg-stone-100`.
    - Text colors: `text-gray-900`, `text-stone-600`, `text-[#1f2937]`.
- **Typography:**
  - Font families are correctly defined in `globals.css` via Tailwind v4 `@theme` (`sans`, `serif`, `display`).
  - However, usage is mixed. Sometimes `font-serif` is used for headings, sometimes `font-display`.
  - Headings sizes are arbitrary (e.g., `text-5xl md:text-7xl lg:text-8xl`).

### 2. Component Duplication (No "Source of Truth")
- **Buttons:**
  - No `<Button />` component exists.
  - Buttons are implemented as `<Link>` or `<button>` with long, repetitive class strings.
  - Styles vary:
    - Rounded full vs rounded-lg.
    - Hover effects vary (scale, translate, color change).
    - Shadow styles vary.
- **Inputs:**
  - Hardcoded in `Footer.tsx` and likely `ContactPage`.
  - Focus states are inconsistent (some use ring, some use outline).
- **Cards:**
  - "Service Cards" in Home vs "Project Cards" in Projects vs "Plant Cards" in Botanical Index all share similar structures but have divergent implementations.

### 3. Icons
- **Implementation:**
  - Mostly inline SVGs (verbose, hard to maintain).
  - Some Google Material Symbols (via font/ligature) in `ProjectsPage`.
  - Emojis used in `fallback-data.ts`.
- **Risk:** Inconsistent visual weight and style (filled vs outlined, different stroke widths).

### 4. Code Quality & Maintenance
- **Inline Styles:** Heavy use of arbitrary Tailwind values (e.g., `bg-[#4F772D]`) instead of theme tokens.
- **Globals.css:** Contains a mix of CSS variables and custom utility classes (`.text-primary`) that overlap with Tailwind utilities.

## B. Recommended Execution Order

1.  **Batch 1: Foundation (Design Tokens)**
    - Consolidate color palette into `globals.css` (Tailwind v4 theme).
    - Define semantic color names (e.g., `--primary`, `--primary-foreground`, `--muted`, `--accent`).
    - Standardize radius and shadow tokens.
    - Create a central icon strategy (recommend: `lucide-react` for consistency).

2.  **Batch 2: Core Components**
    - Create `src/components/ui/button.tsx`.
    - Create `src/components/ui/input.tsx`.
    - Create `src/components/ui/card.tsx`.
    - Create `src/components/ui/badge.tsx`.
    - Refactor `Navbar` and `Footer` to use these tokens and components.

3.  **Batch 3: Page Normalization**
    - Refactor `HomePage` (High traffic).
    - Refactor `ProjectsPage` & `BotanicalIndex`.
    - Refactor `ContactPage`.

## C. Worst Offending Pages
1.  `src/app/page.tsx` (Home): Massive file, lots of hardcoded values and inline SVGs.
2.  `src/app/projects/page.tsx`: Uses different green hex codes than Home.
3.  `src/components/layout/Navbar.tsx`: Hardcoded colors, logic mixed with UI.

---

**Next Step:** Define the "Single Standard" (Design System).
