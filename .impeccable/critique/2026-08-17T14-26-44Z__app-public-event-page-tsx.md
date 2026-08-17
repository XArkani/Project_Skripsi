---
target: /event page total redesign + search/filter
total_score: 18
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 4
timestamp: 2026-08-17T14-26-44Z
slug: app-public-event-page-tsx
---
# Critique & Audit — /event (Agenda & Event)

## Design Health Score (Nielsen, 0-4)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | status pill exists; no counts per action, no loading |
| 2 | Match System / Real World | 2 | "Kalender Akademik" ≠ list; CTA "Daftar" on Selesai events |
| 3 | User Control and Freedom | 2 | double escape same destination; no collapse for finished |
| 4 | Consistency and Standards | 2 | status colors diverge list vs detail (detail always emerald) |
| 5 | Error Prevention | 2 | static "H-1" copy + Daftar CTA contradict finished events |
| 6 | Recognition Rather Than Recall | 2 | must recall which group holds which event; meta micro-sized |
| 7 | Flexibility and Efficiency | 1 | no search/filter/sort (requested) |
| 8 | Aesthetic and Minimalist Design | 2 | redundant CTAs; empty-group noise; 10px type |
| 9 | Error Recovery | 2 | good empty/404; no in-listing recovery |
| 10 | Help and Documentation | 1 | no status legend/hint |
| **Total** | | **18/40** | **Poor** |

## Audit Health Score (0-4 per dimension)

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 1 | text-[10px] slate-400 ≈3.4:1; white-on-amber ≈2.2:1; heading skip h1→h3 |
| 2 | Performance | 1.5 | raw <img> (CLS, no lazy); all SSR per group |
| 3 | Theming | 0.5 | statusColors duped 3x; dark mode dead |
| 4 | Responsive | 2 | grids collapse OK; CTA ~37-40px, meta ≤12px |
| 5 | Implementation Integrity | 1.5 | EventPreview hardcodes placeholder; no date sort; dead code branch |
| **Total** | | **6.5/20** | **Poor** |

## Design Specificity Verdict
Category-interchangeable project-board ("status groups"). Dates stored as plain String — cannot sort a calendar. The single most important datum (WHEN) is the smallest, grayest text on the card.

## Priority Issues

- **[P0] Calendar premise abandoned** — no chronological sort (ordered by createdAt); 3 groups of 1 card each; list ends on "Selesai".
- **[P0] Detail CTA/status broken** — detail badge always emerald (ignores status color); "Daftar Sekarang Juga" shown even for finished events; "H-1" static copy.
- **[P1] No search/filter (requested)** — listing is a server component; needs a client island (FaqSearch pattern) that receives events as props.
- **[P1] Micro-type & contrast fail WCAG** — 10px pills/labels, slate-400 meta, white-on-amber badge.
- **[P1] EventPreview hardcodes placeholder** — homepage event posters never shown.
- **[P1] Raw <img> everywhere + date un-sortable** — no next/image/lazy; date/time are String in schema.
- **[P2] Status semantics duplicated 5 ways** — no single source of truth.

## Persona Red Flags
- Alex: dates buried in gray 12px; must scroll 3 groups to find next event.
- Casey: can't find own event without search/filter; free-text status breaks grouping silently.
- Sam: amber/white pill, slate-400 meta, 10px labels fail AA.

## Minor Observations
- Detail page hand-rolls breadcrumbs while shared Breadcrumbs.tsx exists.
- hover:scale-105 on CTA not reduced-motion gated.
- "Kalender Akademik" eyebrow promises a function the page doesn't perform.
- Dead EmptyState branch in detail page.
