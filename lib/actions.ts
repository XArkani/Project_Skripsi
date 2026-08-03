"use server"

import { revalidateTag } from "next/cache"
import { headers } from "next/headers"
import { prisma } from "@/lib/prisma"

const RATE_LIMIT_MS = 5 * 60 * 1000

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
}

export async function saveNews(formData: FormData) {
  const id = formData.get("id") as string | null
  const title = formData.get("title") as string
  const date = (formData.get("date") as string) ?? new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
  const excerpt = formData.get("excerpt") as string
  const content = formData.get("content") as string
  const image = (formData.get("image") as string) ?? "/placeholder.svg"

  if (id) {
    await prisma.news.update({
      where: { id },
      data: { title, date, excerpt, content, image },
    })
  } else {
    const baseSlug = slugify(title) || `berita-${Date.now()}`
    let slug = baseSlug
    let suffix = 2
    while (await prisma.news.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${suffix}`
      suffix += 1
    }
    await prisma.news.create({
      data: { title, slug, date, excerpt, content, image },
    })
  }

  revalidateTag("news", "max")
}

export async function deleteNews(id: string) {
  await prisma.news.delete({ where: { id } })
  revalidateTag("news", "max")
}

async function getClientIp() {
  const headersList = await headers()
  const forwarded = headersList.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown"
  return headersList.get("x-real-ip") ?? "unknown"
}

export async function submitContact(formData: FormData) {
  const honeypot = formData.get("website")
  if (honeypot) return

  const senderName = formData.get("senderName") as string
  const senderEmail = formData.get("senderEmail") as string
  const senderPhone = formData.get("senderPhone") as string | null
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string
  const date = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
  const ip = await getClientIp()

  const recent = await prisma.message.count({
    where: {
      senderIp: ip,
      createdAt: { gte: new Date(Date.now() - RATE_LIMIT_MS) },
    },
  })
  if (recent > 0) {
    throw new Error("Pesan sudah terkirim baru-baru ini. Silakan coba lagi dalam 5 menit.")
  }

  await prisma.message.create({
    data: { senderName, senderEmail, senderPhone, senderIp: ip, subject, message, date },
  })

  revalidateTag("messages", "max")
}

export async function deleteMessage(id: string) {
  await prisma.message.delete({ where: { id } })
  revalidateTag("messages", "max")
}
