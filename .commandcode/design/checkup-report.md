# Landing Page Checkup — Fakultas Teknik Universitas Hamzanwadi

**Date**: 2026-08-03  
**Target**: `app/(public)/page.tsx` — Home landing page (Hero + QuickNav + 5 preview sections)  
**Register**: Product (public informational website with brand-adjacent hero)

---

## Overall Score: 30 / 60

**Verdict**: Watch — functional but formulaic. Every section uses the same structural template, typography is too small on mobile, and accessibility gaps exist. Fixable with targeted passes.

---

## Heuristic Scores

| # | Heuristic | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Intentionality | 5/10 | Emerald identity is deliberate, but all 6 content sections follow the identical header-left + grid + link-right template. Hero Unsplash image is a generic circuit photo — could belong to any tech company. |
| 2 | Readability | 5/10 | Inter font choice is solid, hero hierarchy is strong. But body text at `text-sm` (14px) and captions at `text-[10px]` on mobile are too small. Hero description at `text-slate-300` on dark emerald gradient may fail WCAG AA contrast. |
| 3 | Usability | 5/10 | Clear CTAs and thorough navigation. But no search bar on the landing page — users must navigate to specific pages. Hero at 75vh pushes all content below the fold on first load. |
| 4 | Responsiveness | 5/10 | Grid breakpoints adapt (`grid-cols-2 md:grid-cols-4`), hamburger menu exists. But raw `<img>` tags cause layout shift, no `safe-area-inset-*` handling, no container queries. |
| 5 | Speed | 5/10 | Missing Next.js `Image` component on all preview images — raw `<img>` with no width/height. Hero uses external Unsplash URL causing CLS. Framer Motion `whileInView` on 7 separate sections may cause jank on low-end mobile. |
| 6 | Accessibility | 5/10 | Shadcn focus rings are present, mobile menu has `aria-label`. But no `prefers-reduced-motion` handling, hero background image has no text alternative, `text-[10px]` labels fail minimum readable size, and emerald-only color reliance may fail red-green colorblind users. |

---

## Cognitive Load / Risk

**Level**: Moderate — the page works but every section competes for attention with the same visual weight.

| Signal | Finding |
|--------|---------|
| PASS | Emerald identity is consistent and institutional |
| PASS | QuickNav provides fast section access |
| PASS | Section "Lihat Selengkapnya" links are discoverable |
| WATCH | 6 sections use identical header-left + card-grid + link-right pattern — visual fatigue |
| WATCH | Hero 75vh pushes usable content below fold |
| WATCH | No image optimization (raw `<img>`, no lazy loading, no width/height) |
| WATCH | Body text too small for mobile reading comfort |
| WATCH | Section background alternation (white/slate-50) is purely decorative |
| FAIL | No `prefers-reduced-motion` — Framer Motion runs uncapped |
| FAIL | Hero background image has no accessible text alternative |
| FAIL | Labels at `text-[10px]` and `text-[11px]` are below minimum readable size |

---

## Next Modes

`/design typeset` — Fix font sizing, contrast, and mobile readability  
`/design responsive` — Add safe areas, image optimization, iOS input fixes  
`/design interaction` — Add reduced-motion support, focus refinements  
`/design relayout` — Break the template repetition, give sections distinct character  
`/design deslop` — Replace generic hero image with faculty-specific proof

---

## What's Working

**Consistent visual language** — Emerald anchors the identity from header through CTAs to footer accents. The palette doesn't drift.

**Clear navigation architecture** — The mega dropdown groups related pages, the QuickNav gives one-tap access to all sections, and the header scroll state is well-executed.

**Section discoverability** — Every preview section has a "Lihat Selengkapnya" link that leads to the full page. Users can orient quickly.

---

## Priority Issues

### P0 — No reduced-motion support

All 7 Framer Motion animations (`HeroSection`, `QuickNavPanel`, `BlueprintPreview`, `DosenHighlight`, `EventPreview`, `NewsPreview`, `FaqPreview`) ignore `prefers-reduced-motion`. Users with vestibular disorders get forced motion with no opt-out.

**Fix**: Add `useReducedMotion()` hook from Framer Motion, wrap all `initial`/`whileInView` animations with a check. Alternatively, use CSS `@media (prefers-reduced-motion: reduce)` to disable transitions globally.

### P0 — Text too small for mobile readability

`text-[10px]` (DosenHighlight expertise labels, BlueprintPreview category badges), `text-[11px]` (DosenHighlight position text), and `text-xs` (12px) in several places. Minimum readable size for body text is 16px on mobile.

**Fix**: Raise minimum text to `text-sm` (14px) for captions, `text-base` (16px) for body on mobile viewports. Use `text-xs` only for truly auxiliary labels.

### P1 — Generic hero background image

The hero uses `https://images.unsplash.com/photo-1451187580459-43490279c0fa` — a generic circuit/tech abstract that says nothing about Fakultas Teknik Universitas Hamzanwadi. It could be any tech company's landing page.

**Fix**: Replace with a faculty-specific image — campus photo, engineering lab, student activity, or a geometric pattern using the faculty emblem. If no photo is available, a geometric emerald pattern referencing the FT logo would be more authored than a stock Unsplash photo.

### P1 — Identical section templates

All 5 preview sections (Blueprint, Dosen, Event, News, FAQ) use: section wrapper → `flex justify-between` header → grid of cards → "see all" link. After the third section, the rhythm becomes mechanical.

**Fix**: Vary section layouts. Give Dosen a horizontal scroll or carousel. Make News a 2+1 asymmetric layout (featured + list). Give FAQ an accordion pattern instead of stacked cards. Let Blueprint keep the card grid since facility cards are genuinely card-shaped.

### P2 — No image optimization

All `<img>` tags use raw HTML without `width`/`height`, `loading="lazy"`, or Next.js `Image`. This causes Cumulative Layout Shift (CLS) and unnecessary bandwidth on mobile.

**Fix**: Replace all `<img>` with Next.js `Image` component, add `sizes` attribute for responsive sources, and use `loading="lazy"` for below-fold images.

### P2 — Hero at 75vh pushes content below fold

The hero uses `min-h-[75vh]` which on a 667px iPhone SE means ~500px of hero before any content is visible. Information-seeking visitors (prospective students, parents) must scroll past a large decorative block to reach useful content.

**Fix**: Reduce to `min-h-[60vh]` or `min-h-[50vh]` on mobile. Use the Cliffhanger Principle — leave 40-60px of the QuickNav section visible at the bottom of the hero to signal scrollability.

---

*Generated with CommandCode — 2026-08-03*
