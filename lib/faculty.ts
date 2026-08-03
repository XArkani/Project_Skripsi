import { cacheTag } from "next/cache"
import { prisma } from "@/lib/prisma"
import type { Blueprint, Dosen, UKM, Event, News, FAQ, Struktur, Message } from "@/lib/types"

export async function getBlueprints(): Promise<Blueprint[]> {
  "use cache"
  cacheTag("blueprint")
  const data = await prisma.blueprint.findMany({ orderBy: { createdAt: "asc" } })
  return data as Blueprint[]
}

export async function getDosen(): Promise<Dosen[]> {
  "use cache"
  cacheTag("dosen")
  const data = await prisma.dosen.findMany({ orderBy: { createdAt: "asc" } })
  return data as Dosen[]
}

export async function getUKM(): Promise<UKM[]> {
  "use cache"
  cacheTag("ukm")
  const data = await prisma.ukm.findMany({ orderBy: { createdAt: "asc" } })
  return data as UKM[]
}

export async function getEvents(): Promise<Event[]> {
  "use cache"
  cacheTag("event")
  const data = await prisma.event.findMany({ orderBy: { createdAt: "asc" } })
  return data as Event[]
}

export async function getNews(): Promise<News[]> {
  "use cache"
  cacheTag("news")
  const data = await prisma.news.findMany({ orderBy: { createdAt: "asc" } })
  return data as News[]
}

export async function getFAQs(): Promise<FAQ[]> {
  "use cache"
  cacheTag("faq")
  const data = await prisma.faq.findMany({ orderBy: { createdAt: "asc" } })
  return data as FAQ[]
}

export async function getStruktur(): Promise<Struktur[]> {
  "use cache"
  cacheTag("struktur")
  const data = await prisma.struktur.findMany({ orderBy: { createdAt: "asc" } })
  return data as Struktur[]
}

export async function getMessages(): Promise<Message[]> {
  "use cache"
  cacheTag("messages")
  const data = await prisma.message.findMany({ orderBy: { createdAt: "desc" } })
  return data as Message[]
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  "use cache"
  cacheTag(`event-${slug}`)
  const data = await prisma.event.findUnique({ where: { slug } })
  return data as Event | null
}

export async function getNewsBySlug(slug: string): Promise<News | null> {
  "use cache"
  cacheTag(`news-${slug}`)
  const data = await prisma.news.findUnique({ where: { slug } })
  return data as News | null
}
