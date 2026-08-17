---
target: /dosen page total redesign + search/prodi filter
total_score: 15
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 6
timestamp: 2026-08-17T13-27-55Z
slug: app-public-dosen-page-tsx
---
# Critique & Audit — /dosen (Direktori Dosen)

## Design Health Score (Nielsen, 0-4)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | No result counts, no loading state, dead email chip |
| 2 | Match System / Real World | 2 | title vs position redundant/unlabeled; eyebrow reads marketing |
| 3 | User Control and Freedom | 1 | No search, no filter, no exit/clear for anything |
| 4 | Consistency and Standards | 2 | Alignment switches per breakpoint; duplicated motion variants |
| 5 | Error Prevention | 2 | No constraints; micro-labels hard to read |
| 6 | Recognition Rather Than Recall | 1 | Finding a dosen = serial memory scan |
| 7 | Flexibility and Efficiency | 1 | No search, sort, or index |
| 8 | Aesthetic and Minimalist Design | 1 | 9px labels + two labeled blocks + divider + chip per card |
| 9 | Error Recovery | 2 | EmptyState good, but nothing else |
| 10 | Help and Documentation | 1 | No help, no guidance on field meaning |
| **Total** | | **15/40** | **Poor** |

## Audit Health Score (0-4 per dimension)

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 1 | slate-400 ≈3.1:1 at 9-11px text; keyboard-inaccessible nav |
| 2 | Performance | 1 | raw <img>, animated blur, whole list staggered at once |
| 3 | Theming | 1 | hard-coded slate/emerald; .dark tokens unused on public pages |
| 4 | Responsive | 2 | 1-col collapse OK; email badge overflow + ~30px touch targets |
| 5 | Implementation Integrity | 2 | false affordances, DosenHighlight shows "Foto" placeholder always |
| **Total** | | **7/20** | **Poor** |

## Design Specificity Verdict
Category-interchangeable "our team" template. No prodi grouping, no research indexing, no action a prospective student would take. The one product-specific signal (prodi) doesn't exist in the data model.

## Priority Issues (combined)

- **[P0] No search or prodi filter, and data can't support one** — dosen model/type/seed lack `prodi`. Requested feature is impossible without schema change.
- **[P0] Email chip is dead UI** — `<span>` styled as badge (DosenGrid.tsx:71-74), not a mailto link; the only contact affordance does nothing.
- **[P1] Micro-typography + contrast** — text-[9px]/[11px], slate-400 on white ≈3.1:1 (WCAG 1.4.3 fail). Primary mobile pain.
- **[P1] Mixed alignment** — centered name/photo, left-aligned data blocks; header center-on-mobile vs left-on-desktop.
- **[P1] Keyboard/a11y gaps in nav** — desktop dropdown opens on mouseenter only; mobile menu no focus trap/scroll lock.
- **[P1] Raw <img> + DosenHighlight placeholder** — no next/image/lazy; homepage shows "Foto" placeholder even when real image exists.
- **[P2] Reduced-motion ignored in grid** — blur() filters animated per card; expensive on low-end Android.
- **[P2] Dark mode broken on public pages** — layout hard-codes bg-slate-50.
- **[P2] PageTransition re-mounts whole subtree per route** (App Router anti-pattern).

## Persona Red Flags
- Alex: no search/sort; email chip (destination) inert.
- Jordan: eyebrow "Kekuatan Pengajaran" mismatches directory H1; no counts/grouping.
- Casey: 9px text; only action at bottom of ~500px card; identical dense cards = lost place mid-scroll.
- Sam: 9px text, reduced-motion ignored, fake button semantics on email chip.

## Minor Observations
- gap-8 between stacked mobile cards wastes space.
- w-28 h-28 photo crowds text on mobile; smaller avatar + name beside cuts height ~40%.
- Card hover effects imply interactivity that doesn't exist.
- Heading skip h1 -> h3 (no h2).
