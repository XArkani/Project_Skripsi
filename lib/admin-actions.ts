"use server"

import { refresh, updateTag } from "next/cache"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { slugify } from "@/lib/utils"
import { fieldConfigMap } from "@/lib/admin-field-configs"

export type ModelName = "blueprint" | "dosen" | "ukm" | "event" | "news" | "faq" | "struktur" | "message"

const modelTags: Record<ModelName, string> = {
  blueprint: "blueprint",
  dosen: "dosen",
  ukm: "ukm",
  event: "event",
  news: "news",
  faq: "faq",
  struktur: "struktur",
  message: "messages",
}

const STRING_FIELD_TYPES = new Set(["text", "textarea", "slug", "select", "image"])
const NULLABLE_UNIQUE_FIELDS = new Set(["nuptk"])

/**
 * Buang semua key yang bukan field model (mis. `id`, `createdAt`,
 * `updatedAt` yang ikut terkirim dari form edit) agar tidak sengaja
 * tertulis ke kolom read-only. Pengaman untuk semua halaman edit.
 */
function sanitizePayload(modelName: ModelName, data: Record<string, unknown>) {
  const allowed = new Set((fieldConfigMap[modelName] ?? []).map((f) => f.name))
  const next: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(data)) {
    if (allowed.has(key)) next[key] = value
  }
  return next
}

function normalizeEmptyStrings(modelName: ModelName, data: Record<string, unknown>) {
  const fields = fieldConfigMap[modelName] ?? []
  const next: Record<string, unknown> = { ...data }
  for (const f of fields) {
    // Input tanggal yang dikosongkan terkirim sebagai "" — Prisma menolak
    // string kosong untuk DateTime, jadi ubah ke null (kolom nullable).
    if (f.type === "date" && next[f.name] === "") {
      next[f.name] = null
      continue
    }
    if (STRING_FIELD_TYPES.has(f.type)) {
      if (NULLABLE_UNIQUE_FIELDS.has(f.name)) {
        if (next[f.name] == null || next[f.name] === "") next[f.name] = null
      } else if (next[f.name] == null) {
        next[f.name] = ""
      }
    }
  }
  return next
}

async function checkAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
    throw new Error("Unauthorized")
  }
}

async function resolveSlug(modelName: "event" | "news", base: string, current?: string, excludeId?: string) {
  const fallback = modelName === "event" ? "event" : "berita"
  const clean = slugify(base) || fallback
  if (current && slugify(current) === clean && excludeId) return current
  let candidate = clean
  let suffix = 2
  while (true) {
    const existing =
      modelName === "event"
        ? await prisma.event.findUnique({ where: { slug: candidate } })
        : await prisma.news.findUnique({ where: { slug: candidate } })
    if (!existing || existing.id === excludeId) return candidate
    candidate = `${clean}-${suffix}`
    suffix += 1
  }
}

async function createOnModel(modelName: ModelName, data: Record<string, unknown>) {
  switch (modelName) {
    case "blueprint": return await prisma.blueprint.create({ data: data as never })
    case "dosen": return await prisma.dosen.create({ data: data as never })
    case "ukm": return await prisma.ukm.create({ data: data as never })
    case "event": return await prisma.event.create({ data: data as never })
    case "news": return await prisma.news.create({ data: data as never })
    case "faq": return await prisma.faq.create({ data: data as never })
    case "struktur": return await prisma.struktur.create({ data: data as never })
    case "message": return await prisma.message.create({ data: data as never })
  }
}

async function updateOnModel(modelName: ModelName, id: string, data: Record<string, unknown>) {
  switch (modelName) {
    case "blueprint": return await prisma.blueprint.update({ where: { id }, data: data as never })
    case "dosen": return await prisma.dosen.update({ where: { id }, data: data as never })
    case "ukm": return await prisma.ukm.update({ where: { id }, data: data as never })
    case "event": return await prisma.event.update({ where: { id }, data: data as never })
    case "news": return await prisma.news.update({ where: { id }, data: data as never })
    case "faq": return await prisma.faq.update({ where: { id }, data: data as never })
    case "struktur": return await prisma.struktur.update({ where: { id }, data: data as never })
    case "message": return await prisma.message.update({ where: { id }, data: data as never })
  }
}

async function deleteOnModel(modelName: ModelName, id: string) {
  switch (modelName) {
    case "blueprint": return await prisma.blueprint.delete({ where: { id } })
    case "dosen": return await prisma.dosen.delete({ where: { id } })
    case "ukm": return await prisma.ukm.delete({ where: { id } })
    case "event": return await prisma.event.delete({ where: { id } })
    case "news": return await prisma.news.delete({ where: { id } })
    case "faq": return await prisma.faq.delete({ where: { id } })
    case "struktur": return await prisma.struktur.delete({ where: { id } })
    case "message": return await prisma.message.delete({ where: { id } })
  }
}

export async function createRecord(modelName: ModelName, _base: string, data: Record<string, unknown>) {
  await checkAdmin()
  if (modelName === "event" || modelName === "news") {
    const title = String(data.title ?? "")
    data.slug = await resolveSlug(modelName, String(data.slug ?? "") || title)
  }
  const normalized = normalizeEmptyStrings(modelName, sanitizePayload(modelName, data))
  await createOnModel(modelName, normalized)
  // updateTag = expire seketika (read-your-own-writes). Jangan pakai
  // revalidateTag di sini karena itu stale-while-revalidate (butuh 1x
  // refresh tambahan sebelum data baru terlihat).
  updateTag(modelTags[modelName])
  updateTag("home")
  refresh()
  return { success: true }
}

export async function updateRecord(
  modelName: ModelName,
  id: string,
  _base: string,
  data: Record<string, unknown>
) {
  await checkAdmin()
  if (modelName === "event" || modelName === "news") {
    const previous =
      modelName === "event"
        ? await prisma.event.findUnique({ where: { id } })
        : await prisma.news.findUnique({ where: { id } })
    if (previous) {
      updateTag(`${modelName}-${previous.slug}`)
    }
    const title = String(data.title ?? "")
    data.slug = await resolveSlug(modelName, String(data.slug ?? "") || title, undefined, id)
  }
  const normalized = normalizeEmptyStrings(modelName, sanitizePayload(modelName, data))
  const record = await updateOnModel(modelName, id, normalized)
  updateTag(modelTags[modelName])
  updateTag("home")
  if (modelName === "event" || modelName === "news") {
    const slug = (record as { slug: string }).slug
    updateTag(`${modelName}-${slug}`)
  }
  refresh()
  return { success: true }
}

export async function markMessageRead(id: string) {
  await checkAdmin()
  const record = await prisma.message.update({ where: { id }, data: { isRead: true } })
  updateTag(modelTags.message)
  refresh()
  return { success: true, data: JSON.parse(JSON.stringify(record)) }
}

export async function deleteRecord(modelName: ModelName, id: string) {
  await checkAdmin()
  await deleteOnModel(modelName, id)
  updateTag(modelTags[modelName])
  updateTag("home")
  refresh()
  return { success: true }
}