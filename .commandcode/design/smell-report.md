# Landing Page Smell Report — Fakultas Teknik Universitas Hamzanwadi

**Date**: 2026-08-03  
**Target**: Landing page — 7 components: Hero, QuickNav, Blueprint, Dosen, Event, News, FAQ  
**Register**: Product (public info website, brand-adjacent hero)

---

## Overall Score: 8 / 10 — FAINT

**Verdict**: Two tells detected. The page avoids the worst AI-generated tropes — no tech gradient, no bounce-everywhere, no stat monuments, no unearned blur. But the QuickNavPanel and FAQ answer accent rail are unmistakeable reflex patterns. Minor cleanup, not identity failure.

---

## Odor-by-Odor Detection

| # | Odor | Status | Evidence |
|---|------|--------|----------|
| 1 | Tech gradient | ✅ Absent | Hero uses `emerald-900 → emerald-800 → slate-900` — institutional green, not indigo-cyan or purple-to-teal. |
| 2 | Generic tech hue | ✅ Absent | Emerald is the identity hue. Not blue-purple. Chosen for institutional/faculty context. |
| 3 | Feature tile grid | ❌ Detected | QuickNavPanel: 8 uniform cards, each icon + heading + one sentence, no priority, no hierarchy. |
| 4 | Accent rail | ❌ Detected | FAQ answers: `border-l-2 border-emerald-500` — a colored left stripe on answer blocks. |
| 5 | Unearned blur | ✅ Absent | Header `backdrop-blur-md` is earned — scroll-triggered fixed nav, not a random frosted panel. |
| 6 | Stat monument | ✅ Absent | No oversized number clusters anywhere on the landing page. |
| 7 | Icon topper | ✅ Absent | No decorative icon placed above section headings. All section headers are clean text. |
| 8 | Bounce everywhere | ✅ Absent | Framer Motion uses linear fade+translate entrances (0.6-0.7s). No elastic, no spring, no bounce. |
| 9 | Default type | ✅ Absent | Inter is deliberately chosen in the design brief — institutional, clean, functional. Not a reflex. |
| 10 | Center stack | ✅ Absent | Hero is centered (correct for a hero). Content sections use left-aligned headers with right-aligned "see all" links. |

**8 clean / 2 detected = 8/10 FAINT**

---

## Detected Tells

### Tell 1: Feature Tile Grid — QuickNavPanel

**Pattern**: 8 uniform cards in a 2×4 grid (2 col mobile, 4 col desktop). Each card: icon, bold heading, one-line description. Every card carries identical visual weight regardless of importance.

**Why it smells**: QuickNav is a navigation aid, but it's dressed as a feature showcase. There's no hierarchy between "Blueprint" and "FAQ" — they're visually identical boxes. The section heading "Akses Cepat Informasi" confirms this is navigation, yet the layout treats all destinations as equal features. This is the most common AI-generation reflex: take a list of links, wrap each in a card with an icon, call it done.

**Fix**: `/design relayout` — Turn this into a compact navigation strip or grouped list. If cards must stay, use a featured+secondary layout: highlight 3 primary destinations larger, collapse the remaining 5 into a smaller row.

### Tell 2: Accent Rail — FAQ Answer Blocks

**Pattern**: FAQ answers use `pl-6 border-l-2 border-emerald-500` — a left-side accent stripe on each answer block.

**Why it smells**: The green stripe is decoration pretending to be a structural element. It signals "this is a quote" or "this is a callout" when the content is just an answer body. The rail adds visual noise to an otherwise clean FAQ layout. It's the most common shortcut for "make this text block look designed" — add a colored left border and call it a day.

**Fix**: `/design deslop` — Remove the accent rail. Let the `pl-6` indentation and the `HelpCircle` icon on the question above do the structural work. The answer is already visually separated by the card border; the rail is redundant ornament.

---

## Domain Default Check

**Industry**: Indonesian university faculty website.  
**Domain reflex to avoid**: Cluttered serif layouts, red-and-white flag colors, multiple competing color systems, traditional/formal aesthetic.  
**What shipped instead**: Clean emerald-and-slate palette, Inter font, modern card-based layout, generous whitespace.

**Assessment**: This design is notably cleaner than the Indonesian university domain default. The emerald green has an institutional reason (Teknik/faculty identity). Not a domain-default trap — this is a deliberate departure from the cluttered norm.

---

## What's Clean

**No tech gradient** — The hero gradient goes from deep emerald to slate, not indigo to cyan. Reads as institutional, not startup.

**No bounce everywhere** — Motion is restrained. Section entrances are simple fade+translate at 0.6s. Hover effects use standard CSS transitions. Nothing feels like a toy.

**No stat monument** — The page doesn't pad itself with "50+ Dosen" "1000+ Mahasiswa" number clusters. Content speaks for itself.

**No icon topper** — Section headings are clean type, no decorative icon placed above them to fill space.

**Deliberate composition** — Sections alternate layout intent: hero (centered, brand), QuickNav (grid, navigation), Blueprint (cards, Learn), Dosen (profile grid, Learn), Event (cards with metadata, Explore), News (article list, Learn), FAQ (Q&A blocks, Explore). Each section has a distinct content shape even though the header template repeats.

---

## Next Modes

`/design relayout` — Break the QuickNav feature-tile-grid into a hierarchy-aware navigation strip  
`/design deslop` — Remove the FAQ accent rail, let content structure stand on its own

---

*Generated with CommandCode — 2026-08-03*
