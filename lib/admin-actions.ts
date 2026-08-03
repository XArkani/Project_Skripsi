"use server"

import { revalidateTag } from "next/cache"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export type ModelName = "blueprint" | "dosen" | "ukm" | "event" | "news" | "faq" | "struktur" | "message"

async function checkAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
    throw new Error("Unauthorized")
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
  const record = await createOnModel(modelName, data)
  revalidateTag(modelName, "max")
  return { success: true, data: JSON.parse(JSON.stringify(record)) }
}

export async function updateRecord(modelName: ModelName, id: string, data: Record<string, unknown>) {
  await checkAdmin()
  const record = await updateOnModel(modelName, id, data)
  revalidateTag(modelName, "max")
  return { success: true, data: JSON.parse(JSON.stringify(record)) }
}

export async function deleteRecord(modelName: ModelName, id: string) {
  await checkAdmin()
  await deleteOnModel(modelName, id)
  revalidateTag(modelName, "max")
  return { success: true }
}
