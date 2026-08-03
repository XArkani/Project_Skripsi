# Design Constitution — Fakultas Teknik Universitas Hamzanwadi

## Register

**Product** — public informational website + single-admin CMS dashboard. The public side leans brand-adjacent (hero, expressive sections), but the core job is instrument: visitors navigate structured faculty information. The admin side is pure product: data tables, forms, CRUD. Default to product rules; brand permission only on the public landing hero and expressive section headers.

## Users & Context

- **Primary**: Prospective students, current students, parents, academic partners — visiting on desktop and mobile, often in short scanning sessions
- **Secondary**: Faculty staff and the single admin user — operating the CMS dashboard daily
- **Context**: Indonesian higher education. Bahasa Indonesia UI. Users expect clarity, trust, and institutional credibility. No dark patterns, no startup-hype language.

## Product Purpose

Official website for Fakultas Teknik Universitas Hamzanwadi. Provides public information across 9 pages (Home, Blueprint, Dosen, UKM, Event, Berita, Struktur Organisasi, FAQ, Hubungi Kami) and a full admin CMS for one administrator to manage all content entities.

## Composition Lanes

**Public side dominant patterns**: Learn → Decide → Explore

- **Learn** (Home, Blueprint, Dosen, UKM, Struktur): Article flow, progressive sections, readable measure. Information hierarchy: hook → bridge → detail.
- **Explore** (Event, Berita, FAQ): Search, filters, scannable lists, reversible discovery. Cards are legitimate here — content is discrete and scannable.
- **Decide** (Hubungi Kami): Focused pitch, one dominant action (contact), proof of accessibility.

**Admin side dominant patterns**: Operate → Configure

- **Operate**: Data tables, side panels, inspectors, command bars
- **Configure**: Grouped settings, forms with previews, clear commit areas

## Voice

Institutional but warm. Bahasa Indonesia formal but not stiff. Confident without boasting. The visual voice should say: *serius, terpercaya, modern*. Think "established public institution" not "Silicon Valley startup."

Concrete physical words: **solid, grounded, professional, welcoming, credible**.

## Anti-References

- **No startup-landing-page energy**: No centered hero with a gradient orb and a single CTA. No "Revolutionizing education" language. No generic tech blue-purple-cyan gradients.
- **No terminal-mono developer-tool aesthetic**: Not a dev tool, not a portfolio. No dark-mode-as-default. No code-block styling on public pages.
- **No SaaS cream-and-purple template**: Not a SaaS product. No pricing tables, no feature-comparison grids, no "Start free trial" CTAs.
- **No health/edu white-and-teal stereotype**: The emerald is correct for an Indonesian faculty (green = institutional), but avoid the sterile white-box clinical look.
- **No card-inside-card nesting**: Cards are for genuinely discrete, self-contained content units. One card wrapping another is always wrong — flatten with type and dividers instead.
- **No AI slop patterns**: No centered hero with pill badges reading "✨ Powered by AI." No overly generic landing copy. No Inter as the default reflex — it's chosen deliberately here for the faculty context.

## Design Principles

1. **Clarity over decoration** — Visitors scan for specific information. Every visual element must earn its space.
2. **Grounded warmth** — Emerald anchors the identity; slate neutrals keep it serious. Warmth comes from generous whitespace, not playful color.
3. **Information first** — Type hierarchy, readability, and scannable structure are the primary design tools. Decoration supports, never competes.
4. **Consistency breeds trust** — Shared header/footer, predictable navigation, familiar shadcn/ui patterns on admin. No surprise layouts per page.
5. **Mobile is primary** — Indonesian users are mobile-first. Desktop is the enhanced view, not the default.

## Accessibility

- Minimum WCAG AA contrast across all text
- Focus rings visible and consistent (shadcn/ui defaults)
- Touch targets ≥ 44×44px on mobile
- `prefers-reduced-motion` respected (Framer Motion `useReducedMotion`)
- Bahasa Indonesia labels on all interactive elements

## Visual Foundation

### Color

**Commitment level**: Statement — emerald owns the identity, but the surface stays restrained.

- **Brand hue**: Emerald (`oklch(0.5 0.15 145)` range — emerald-600/700)
- **Neutral**: Slate, warm-tinted toward emerald (not pure gray)
- **Surface**: `bg-slate-50` for public pages (near-white with warmth), `bg-white` for cards, `bg-slate-900` for footer
- **Accent**: Emerald-400 for highlights, emerald-500/600 for CTAs
- **State colors**: Emerald (success/info), Red (destructive), Amber (warning — if needed)
- **No dark mode** on public pages. Admin dashboard supports system dark mode via shadcn.

### Typography

- **Font**: Inter (primary sans via `--font-sans`), Geist (fallback), Geist Mono (monospace)
- **Scale**: Typography scale defined via Tailwind utility classes. Headings use `font-extrabold tracking-tight` for hero, `font-bold` for section headers, `font-semibold` for card titles.
- **Measure**: Public content sections capped at `max-w-7xl` (80rem) with readable paragraph measure within cards.
- **Hierarchy**: Large hero (4xl–6xl), section titles (xl–2xl bold), body (base/sm), captions (xs).

### Radius

`--radius: 0.625rem` (10px) — moderate rounding via shadcn/ui tokens. Header logo uses `rounded-xl`. Cards use `rounded-2xl` on QuickNav, `rounded-lg` on buttons. Consistent moderate rounding — nothing too sharp, nothing pill-shaped unless deliberate.

### Motion

- Framer Motion for section entrances (fade + y-offset on scroll into view)
- Scale hover effects on links and buttons (`hover:scale-105`, `hover:scale-[1.02]`)
- Header scroll transition (transparent → white/backdrop-blur)
- Stagger is used minimally — sections animate as blocks, not individual elements
- No gratuitous bounce/spring — entrances are `duration: 0.6–0.7s`

### Icons

Lucide React. Consistent 4×4 (w-4 h-4) in nav, 8×8 in feature grids, 3.5×3.5 in footer contact.

## Component Rules

- **shadcn/ui base** — Button, Card, Dialog, Input, Select, Badge, Skeleton, Separator, etc. Use shadcn patterns; don't reinvent primitives.
- **Header**: Fixed, transparent→white on scroll, mega dropdown for "Informasi" section, mobile hamburger with full menu
- **Footer**: Dark (slate-900), 3-column grid (brand, links, contact), social + copyright bar
- **Buttons**: Use `Button` component from shadcn/ui. Custom inline styles only where shadcn variants don't cover (e.g., hero CTAs with emerald-500 bg).
- **Cards**: Use shadcn Card component for content cards. Custom card styling for specialty blocks like QuickNavPanel.
- **Empty states**: `EmptyState` shared component exists — use it for "no data" conditions.
- **Admin**: `CrudManager`, `DataTable`, `FormModal` patterns. Sidebar navigation from shadcn sidebar component.

## Current File Map

| Layer | Path | Notes |
|-------|------|-------|
| Color tokens | `app/globals.css` | shadcn CSS variables + custom emerald/slate tokens |
| Layout | `app/layout.tsx` | Root HTML, Inter font, metadata |
| Public shell | `app/(public)/layout.tsx` | Header + Footer + bg-slate-50 |
| Shared UI | `components/ui/` | 15 shadcn primitives |
| Shared components | `components/shared/` | Header, Footer, Breadcrumbs, EmptyState, Toast, PageHeader, ImagePlaceholder, MapWithFallback |
| Sections | `components/sections/` | Hero, QuickNav, Blueprint, Dosen, Event, News, FAQ |
| Admin | `components/admin/` | CRUD manager components |
| Upload | `components/upload/` | UploadThing file/image components |
