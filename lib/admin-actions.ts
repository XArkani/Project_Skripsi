"use server"

import { revalidateTag } from "next/cache"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { slugify } from "@/lib/utils"

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

export async function createRecord(modelName: ModelName, data: Record<string, unknown>) {
  await checkAdmin()
  if (modelName === "event" || modelName === "news") {
    const title = String(data.title ?? "")
    data.slug = await resolveSlug(modelName, String(data.slug ?? "") || title)
  }
  const record = await createOnModel(modelName, data)
  revalidateTag(modelTags[modelName], "max")
  return { success: true, data: JSON.parse(JSON.stringify(record)) }
}

export async function updateRecord(modelName: ModelName, id: string, data: Record<string, unknown>) {
  await checkAdmin()
  if (modelName === "event" || modelName === "news") {
    const previous =
      modelName === "event"
        ? await prisma.event.findUnique({ where: { id } })
        : await prisma.news.findUnique({ where: { id } })
    if (previous) {
      revalidateTag(`${modelName}-${previous.slug}`, "max")
    }
    const title = String(data.title ?? "")
    data.slug = await resolveSlug(modelName, String(data.slug ?? "") || title, undefined, id)
  }
  const record = await updateOnModel(modelName, id, data)
  revalidateTag(modelTags[modelName], "max")
  if (modelName === "event" || modelName === "news") {
    const slug = (record as { slug: string }).slug
    revalidateTag(`${modelName}-${slug}`, "max")
  }
  return { success: true, data: JSON.parse(JSON.stringify(record)) }
}

export async function deleteRecord(modelName: ModelName, id: string) {
  await checkAdmin()
  await deleteOnModel(modelName, id)
  revalidateTag(modelTags[modelName], "max")
  return { success: true }
}