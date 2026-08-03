# Landing Page Design Review — Fakultas Teknik Universitas Hamzanwadi

**Date**: 2026-08-03
**Target**: Landing page (Hero + QuickNav + Blueprint + Dosen + Event + News + FAQ)
**Register**: Product (public informational website)

---

## Overall Score: 32 / 50

**Verdict**: Functional, lean, but visually timid. The page avoids AI tropes and reads cleanly, but every section uses the same header + grid + "Selengkapnya" link pattern. The page has been aggressively dieted — most decorations are gone — but nothing distinctive has replaced them. It's a skeleton waiting for flesh.

---

## Heuristic Scores

| # | Lens | Score | Finding |
|---|------|-------|---------|
| 1 | First impression | 6/10 | Emerald identity registers immediately. But after the hero, the page becomes a flat sequence of identical-section-rhythm. Nothing after section 2 feels surprising or authored. |
| 2 | Hierarchy | 5/10 | Hero hierarchy is strong. Section headers use `font-extrabold` vs card titles `font-bold` — the weight contrast works. But all 6 content sections carry identical visual weight — the page has no peak after the hero. |
| 3 | Color voice | 7/10 | Emerald + slate is consistent and institutional. Background alternation (white/slate-50) creates rhythm without relying on decoration. The footer dark block anchors the page end. No color misuse. |
| 4 | Type voice | 6/10 | Inter is intentional. Scale has clear steps (xs → sm → xl → 3xl). But line-height is uniform `leading-relaxed` everywhere — no typographic tension between headings and body. Footer has 10px text buried in the dark. |
| 5 | Interaction feel | 8/10 | Reduced-motion respected everywhere. Cards are entire clickable links. Hover transitions are clean color changes. Focus rings from shadcn are present. The experience feels quiet and professional — nothing janky, nothing missing. |

---

## The Experience Walkthrough

**Arrival**: The hero lands clearly. Emerald gradient + "Fakultas Teknik" + geometric circles reads deliberate, not generic. The two-CTAs-in-dark-surround pattern is competent.

**Scroll into QuickNav**: 8 compact chips appear immediately below the hero. Fast, scannable. No wasted space. Good — this is navigation, not a feature showcase.

**Blueprint section**: Standard card grid. Image + category badge + title + description. Clean, predictable. By the time I reach this section, I've seen the header+grid+link pattern once. It's fine.

**Dosen section**: Profile grid. Photo circles + name + title. Also clean but now I'm seeing the same header+grid rhythm for the third time. Dosen cards link to `/dosen` — not to individual profiles. A missed opportunity for deeper content.

**Event section**: Same header+grid pattern but with date/location metadata and status badges. The status colors (blue/amber/slate) add a functional detail the other sections lack. This is the most information-dense section and feels the most useful.

**News section**: Same header+grid pattern again. Image + date + title + excerpt. Identical rhythm to Blueprint. At this point the page is mechanically repeating itself.

**FAQ section**: Centered heading, stacked Q&A blocks, centered CTA. This breaks the header+grid pattern — it's the only section that feels visually distinct. But the Q&A blocks are passive displays, not interactive accordions.

**Footer**: Dark block, 3 columns, social links. Competent and institutional. Text at 10px in the footer is hard to read. Social links point to `#` — dead ends.

---

## What Works

- **Hero has identity** — the geometric circles + emerald gradient say "engineering faculty" without saying "generic Unsplash tech photo"
- **Reduced-motion everywhere** — every animated component checks `useReducedMotion()`. This is real accessibility work.
- **Button diet is real** — no shadow bloat, no scale animations on hover, consistent `font-semibold`/`font-medium` throughout
- **QuickNav is honest** — 8 compact chips doing navigation work, not pretending to be features
- **FAQ accent rail is dead** — removed entirely, answers now use plain indentation
- **Footer is complete** — address, phone, email, hours, social links, copyright. This is what an institution footer should have.

---

## Priority Issues

### P1 — Section template monotony (Hierarchy 5/10)

After 3 sections, every visitor knows exactly what comes next: left-aligned heading + description, right-aligned "Selengkapnya" link, grid of identical cards. The page has no editorial rhythm — it's a conveyor belt of preview modules.

**Fix**: Give sections different densities. Make News more compact (smaller images, tighter text). Make Dosen into a single scrollable row. Let Blueprint stay full-width cards. Vary the "Selengkapnya" position — some centered below, some right-aligned in header. The pattern itself isn't wrong, but 6 identical repetitions are.

### P1 — No hierarchy between sections (Hierarchy 5/10)

Every section has the same `py-12 sm:py-16` and same `mb-6` header gap. No section claims more visual weight than another. The content after the hero is a flat plain.

**Fix**: Give Blueprint or Event more visual weight — larger heading, more prominent images, or a different background treatment. Let one section own the page after the hero. The rest can recede slightly.

### P2 — Dosen cards link to list, not profiles (Interaction feel)

Each Dosen card links to `/dosen` — the same destination for all 8 cards. If the data has individual slugs, link to `/dosen/[slug]`. If not, the click feels like a broken promise — "I clicked this person but got a list."

**Fix**: Link to individual profile pages if slugs exist. Otherwise, remove the Link wrapper and let the card be display-only.

### P2 — Footer text too small to read (Type voice 6/10)

Footer university name uses `text-[11px]` on dark background, social links at `text-xs`, copyright at `text-slate-500`. On mobile these become illegible at arm's length.

**Fix**: Minimum `text-sm` on all footer text. Copyright can stay `text-xs` since it's auxiliary.

### P3 — Social links are dead (Interaction feel)

All 4 social media links (`Facebook`, `Instagram`, `YouTube`, `Twitter/X`) point to `href="#"`. This registers as incomplete — either the faculty has social media presence (add real URLs) or it doesn't (remove the section).

**Fix**: Add real URLs or remove the social row entirely.

---

## Smell Check (cross-reference with smell-report.md)

- **Feature tile grid**: Fixed — QuickNav is now 8 compact chips
- **Accent rail**: Fixed — FAQ answers no longer have `border-l-2`
- All 8 other tells remain absent

---

## Next Modes

`/design relayout` — Break the header+grid template monotony, give sections different densities
`/design typeset` — Fix footer text sizing, add typographic tension between headings and body
`/design interaction` — Link Dosen cards correctly, fix dead social links, add FAQ accordion toggle

---

*Generated with CommandCode — 2026-08-03*
