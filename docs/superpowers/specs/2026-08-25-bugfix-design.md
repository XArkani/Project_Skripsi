# Design Spec — Black-Box Bugfix (5 Bugs)

**Date:** 2026-08-25  
**Branch:** `001-faculty-website`  
**Status:** Approved — awaiting implementation  
**Source:** `docs/HASIL-BLACKBOX-TESTING.md` — 87 skenario (95.1% pass, 4 FAIL genuine)

## 1. Overview

Memperbaiki 4 bug nyata (2 Major, 2 Minor) + 1 UX feedback gap dari black-box testing tanpa mengubah arsitektur utama. Stack: Next.js 16 App Router, Prisma 7 + Neon, Better Auth, UploadThing 7, shadcn/ui, Framer Motion.

| Bug | Judul | Severity |
|-----|-------|----------|
| BUG-001 | Mobile hamburger tidak membuka menu | Major |
| BUG-002 | Google Maps embed diblokir CSP | Major |
| BUG-003 | FAQ accordion tidak collapsible | Minor |
| BUG-004 | Login format email invalid tanpa feedback | Minor |
| BUG-005 | Rate-limit reject tanpa feedback user | Minor |

## 2. Goals & Non-Goals

**Goals:**
- Semua 5 bug FAIL → PASS saat retest black-box dengan skenario identik
- Tidak menambah regresi (87 skenario tetap ≥95% pass, `bunx next build` sukses)
- A11y minimal: keyboard + aria untuk nav & accordion

**Non-Goals:**
- Redesign visual besar, pagination baru, multi-bahasa, API key Google Maps berbayar

## 3. Chosen Approaches (dengan trade-off)

**BUG-001 Mobile Nav — Hardening existing `Header.tsx`**
- *Chosen:* Pertahankan `AnimatePresence` + `createPortal` backdrop, perbaiki `handleClickOutside` (stopPropagation di panel) + `aria-controls` + focus. *Why:* Minimal diff, sudah 90% benar, test FAIL adalah false-negative deteksi.
- *Alt:* Rewrite dengan Radix Dialog — lebih berat.

**BUG-002 CSP — tambah `frame-src`**
- *Chosen:* `next.config.ts` CSP tambah `frame-src https://www.google.com https://maps.google.com https://*.google.com` + `child-src` fallback. *Why:* One-line fix, sesuai Next.js CSP docs (Context7 /vercel/next.js).
- *Alt:* `@next/third-parties/google` GoogleMapsEmbed — butuh API key & biaya.

**BUG-003 FAQ Accordion — Radix/Base-UI**
- *Chosen:* Refactor `FaqSearch.tsx` ke Radix Accordion `type="single" collapsible` (atau Base-UI jika Radix belum ada). *Why:* A11y built-in (aria-expanded, keyboard), search filter tetap via `filteredFaqs`.
- *Alt:* Custom `useState` + framer-motion — manual a11y.

**BUG-004 Login — pre-validate + error mapping**
- *Chosen:* Regex trim sebelum `authClient.signIn.email`, mapping `result.error` → toast spesifik. *Why:* Better Auth docs sarankan client validation sebelum signIn.
- *Alt:* Hanya andalkan `type=email` browser — tidak konsisten di programmatic submit.

**BUG-005 Rate-limit — propagate error.message**
- *Chosen:* `hubungi/page.tsx` catch tampilkan `error.message` spesifik, honeypot tetap silent success. *Why:* `lib/actions.ts` sudah throw pesan 5 menit yang benar, tinggal surface ke UI.

## 4. Components & Data Flow

```
Header.tsx (client)
  ├─ isMobileMenuOpen state → AnimatePresence panel + portal backdrop
  └─ handleClickOutside: if (!headerRef.contains(target)) close — exclude portal

next.config.ts → headers(): CSP frame-src

FaqSearch.tsx (client)
  ├─ useState openId
  └─ Accordion.Root → Accordion.Item → Trigger(button) → Content(p)

lib/actions.ts: submitContact()
  ├─ honeypot check → return (silent)
  ├─ rateLimit count senderIp → throw Error("5 menit")
  └─ create message + revalidateTag

app/(auth)/login/page.tsx (client)
  └─ handleLogin: trim → regex → authClient.signIn.email → result.error → showToast

app/(public)/hubungi/page.tsx (client)
  └─ handleSubmit: try submitContact → catch(e:Error) → showToast(e.message, "error"|"info")
```

## 5. Error Handling

- BUG-002: CSP violation → fallback `MapWithFallback` failed state tetap tampil (sudah ada).
- BUG-004: Network error → toast "Terjadi kesalahan yang tidak terduga."
- BUG-005: Rate-limit → toast info 4s + button disabled sementara (opsional countdown).

## 6. Testing Plan

- Re-run black-box suite identik (`test-final.mjs`): BB-041, BB-051, BB-077, BB-085 harus PASS
- Manual: 390px hamburger, Maps iframe 200, FAQ keyboard Enter/Space, login `bukan-email`, kontak submit ×2 <5m
- Build: `bun run lint && bun run typecheck && bunx next build`

## 7. Risks

- CSP terlalu longgar → mitigasi: batasi hanya `*.google.com` untuk frame-src, bukan `*`
- Accordion state reset saat search → mitigasi: key by `faq.id`, openId preserved via filter

## 8. Tasks (approved)

| # | Task | File |
|---|------|------|
| T1 | Fix CSP frame-src | `next.config.ts` |
| T2 | Harden mobile menu | `components/shared/Header.tsx` |
| T3 | Accordion FAQ | `components/sections/FaqSearch.tsx` |
| T4 | Login validation | `app/(auth)/login/page.tsx` |
| T5 | Rate-limit feedback | `app/(public)/hubungi/page.tsx` |

---
*Approved 2026-08-25 — ready for implementation plan.*
