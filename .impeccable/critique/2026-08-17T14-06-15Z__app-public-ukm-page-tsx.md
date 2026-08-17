---
target: /ukm page total redesign
total_score: 21
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 3
timestamp: 2026-08-17T14-06-15Z
slug: app-public-ukm-page-tsx
---
# Critique & Audit — /ukm (Unit Kegiatan Mahasiswa)

## Design Health Score (Nielsen, 0-4)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | live count + summary + reset good |
| 2 | Match System / Real World | 1 | "Daftar"→/hubungi mismatch; UKM vs Ormawa terminology |
| 3 | User Control and Freedom | 3 | clear + reset, escape works |
| 4 | Consistency and Standards | 2 | intra-page consistent; vocabulary inconsistent |
| 5 | Error Prevention | 2 | free-form inputs; no link parsing |
| 6 | Recognition Rather Than Recall | 3 | icons+search help; anonymous Flag fallback |
| 7 | Flexibility and Efficiency | 1 | no filter/sort/per-UKM route |
| 8 | Aesthetic and Minimalist Design | 2 | text-heavy cards, redundant label chrome |
| 9 | Error Recovery | 3 | excellent empty/reset |
| 10 | Help and Documentation | 1 | "Daftar" destination unexplained |
| **Total** | | **21/40** | **Acceptable** |

## Audit Health Score (0-4 per dimension)

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 1.5 | contrast fails (2.7-3.7:1), no aria-label/live, reduced-motion ignored by grid |
| 2 | Performance | 2 | blur-filter anim per card, raw img, full grid re-render per keystroke |
| 3 | Theming | 1 | hard-coded slate/emerald; dark mode dead |
| 4 | Responsive | 2.5 | 1-col OK; CTA ≈40px <44px, 10px labels |
| 5 | Implementation Integrity | 1.5 | contact = dead text, generic CTA for all cards, emoji logo orphaned |
| **Total** | | **8.5/20** | **Poor** |

## Design Specificity Verdict
Category-interchangeable student-org listing. Icons (Palette/Music/Dumbbell) generic; no engineering identity; no imagery, flat undifferentiated scroll.

## Priority Issues

- **[P0] CTA lie** — "Daftar Ormawa Ini" navigates to generic /hubungi with no UKM context (UkmGrid.tsx:168-174). Label promises per-UKM signup.
- **[P0] Contact is dead text** — `contact` string ("Instagram: @hmif...", "Email: techart@...") displayed unlinked; users must copy manually.
- **[P1] Mobile touch/readability floor** — 24px clear button, ~40px CTA, text-[10px] labels, text-xs body.
- **[P1] No way to short-circuit the list** — no category/filter; flat 30-card scroll.
- **[P1] Reduced-motion ignored + blur animations** — Stagger/fadeUpItem blur(4px) per card; expensive/low-end GPU + vestibular risk.
- **[P2] Contrast failures** — slate-400 labels ~2.7:1, slate-600 ~3.7:1, placeholder ~2.7:1.
- **[P2] Dark mode dead** — layout hard-codes bg-slate-50; no dark: variants.
- **[P3] Emoji logos orphaned** — DB stores emojis the component ignores; keyword-icon mapping fragile.

## Persona Red Flags
- Alex: no share/bookmark URL per UKM; hits /hubungi dead end.
- Jordan: "Ormawa" vs "UKM" confusion; nothing explains "Daftar" outcome.
- Casey: fat-fingers 24px X / 40px CTA; low-contrast 10px text.
- Sam: no aria-live on results, no search label, blur+slide ignores reduced-motion.

## Minor Observations
- Count pill hidden on mobile (hidden sm:inline-flex) — the users who need it most lose it.
- Card identity tile (56px) smallest element vs bottom-heavy CTA.
- Heading skip h1→h3 without h2.
