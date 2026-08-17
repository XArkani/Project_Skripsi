---
target: /blueprint page total redesign
total_score: 22
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 4
timestamp: 2026-08-17T13-46-12Z
slug: app-public-blueprint-page-tsx
---
# Critique & Audit — /blueprint (Blueprint & Sarana Prasarana)

## Design Health Score (Nielsen, 0-4)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Counts, summary, clear/reset good |
| 2 | Match System / Real World | 2 | "Blueprint" jargon; copy says future while data is existing buildings |
| 3 | User Control and Freedom | 2 | Reset exists; no URL state, no detail exit |
| 4 | Consistency and Standards | 2 | Emerald language consistent; numbering/alternation churns on filter |
| 5 | Error Prevention | 2 | Good empty state; search+filter dead-ends on 3 items |
| 6 | Recognition Rather Than Recall | 3 | Chips visible; must recall category meaning |
| 7 | Flexibility and Efficiency | 2 | Two overlapping finders (search + filter) for 3 rows |
| 8 | Aesthetic and Minimalist Design | 1 | Toolbar has ~6 competing elements for 3 items |
| 9 | Error Recovery | 3 | EmptyState + Reset Filter genuinely good |
| 10 | Help and Documentation | 2 | Placeholder hint only; rows not clickable |
| **Total** | | **22/40** | **Acceptable (low end)** |

## Audit Health Score (0-4 per dimension)

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 1 | slate-400 label 2.6:1, no aria-pressed, no aria-label on search, motion ignores reduced-motion |
| 2 | Performance | 2 | No real images render; per-row x/y transforms; caching good |
| 3 | Theming | 2 | Palette consistent but raw utilities bypass tokens; .dark dead on public pages |
| 4 | Responsive | 2 | Grid collapse OK; touch targets, 16:9 blocks, hidden-scrollbar chips weak |
| 5 | Implementation Integrity | 1 | bp.image never rendered; filter markup duplicated with a11y drift vs DosenGrid |
| **Total** | | **8/20** | **Poor** |

## Design Specificity Verdict
Category-interchangeable "alternating hero rows" SaaS template. Nothing signals physical campus infrastructure — the visual weight is a gray placeholder because real photos are never rendered.

## Priority Issues

- **[P0] Real facility images never rendered** — BlueprintList.tsx:172 hardcodes ImagePlaceholder; bp.image (with real unsplash URLs in DB) is never consumed. Gray "broken image" blocks everywhere.
- **[P0] No detail surface** — rows are inert motion.divs; long `details` text trapped in one scroll; no click, no modal, no route.
- **[P1] Mobile motion scroll sickness** — per-row x:±40/y:60 slide ignores prefers-reduced-motion; triggering mid-scroll.
- **[P1] Toolbar over-engineered + unstable numbering** — search+filter+counts+summary for 3 items; 01/02/03 and alternation re-derive from filtered index so identity jumps.
- **[P1] ARIA gaps** — chips no aria-pressed, search input placeholder-as-label, result summary not aria-live.
- **[P2] Touch targets <44px** — clear button ~24px, chips ~30px, carousel dots 10px.
- **[P2] Duplicated search/filter UI vs DosenGrid with a11y drift** — should be one shared component.

## Persona Red Flags
- Alex: no URL param to share filtered view; numbering breaks under filter.
- Jordan: "Blueprint" jargon + future-vs-existing copy; first cards look broken (placeholders).
- Casey: horizontal+vertical slide mid-scroll; 16:9 blocks push text below fold; tiny tap targets.
- Sam: no aria-pressed, no search label, motion ignores reduced-motion, breadcrumbs lack aria-current.

## Minor Observations
- Pluralization dead-code (`fasilitas` ? `fasilitas` identical).
- Page header container has empty right side; border-b dead whitespace.
- BlueprintPreview homepage repeats the same placeholder bug.
- CarouselDots inactive dot ≈1.4:1 contrast.
