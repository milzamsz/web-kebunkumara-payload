# Design System Standards

## 1. Design Tokens

### Colors
We will use CSS variables mapped to Tailwind v4 theme.

| Token Name | Value | Usage |
| :--- | :--- | :--- |
| `--primary` | `#4F772D` | Main brand action, primary buttons, active states |
| `--primary-foreground` | `#FFFFFF` | Text on primary backgrounds |
| `--secondary` | `#90A955` | Accents, secondary highlights |
| `--secondary-foreground` | `#1A1C18` | Text on secondary backgrounds |
| `--muted` | `#F3F1E8` | Backgrounds for sections, cards |
| `--muted-foreground` | `#4a6741` | Subtitles, less important text |
| `--accent` | `#d4a373` | Earthy accents, borders, decorative elements |
| `--background` | `#FAFAF8` | Page background (Warm White) |
| `--foreground` | `#1A1C18` | Body text (Soft Black) |
| `--card` | `#FFFFFF` | Card background |
| `--card-foreground` | `#1A1C18` | Card text |
| `--border` | `#e5e7eb` | Default borders |
| `--ring` | `#4F772D` | Focus rings |

### Typography
| Token | Font Family | Usage |
| :--- | :--- | :--- |
| `font-sans` | `Inter` | Body text, UI elements, buttons |
| `font-serif` | `Playfair Display` | Headings, pull quotes |

### Radius
| Token | Value | Usage |
| :--- | :--- | :--- |
| `rounded-sm` | `0.25rem` (4px) | Badges, small elements |
| `rounded-md` | `0.5rem` (8px) | Inputs, Cards, inner containers |
| `rounded-lg` | `1rem` (16px) | Large Cards, Modals |
| `rounded-full` | `9999px` | Buttons, Avatars, Pills |

### Shadows
| Token | Usage |
| :--- | :--- |
| `shadow-sm` | Cards, subtle elevation |
| `shadow-md` | Hover states, dropdowns |
| `shadow-lg` | Modals, floating actions |

## 2. Rules (Do's & Don'ts)

- **DO** use `bg-[var(--primary)]` or configured Tailwind classes.
- **DON'T** use arbitrary hex values like `bg-[#4F772D]` in components.
- **DO** use the `Button` component for all actions.
- **DON'T** use `div` with `onClick` unless absolutely necessary (accessibility).
- **DO** use `lucide-react` for icons.
- **DON'T** use inline SVGs for standard UI icons.
