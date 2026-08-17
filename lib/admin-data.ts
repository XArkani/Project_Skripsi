import { prisma } from "@/lib/prisma"
import type { ModelName } from "@/lib/admin-actions"

export async function getModelList(modelName: ModelName) {
  switch (modelName) {
    case "blueprint":
      return await prisma.blueprint.findMany({ orderBy: { createdAt: "asc" } })
    case "dosen":
      return await prisma.dosen.findMany({ orderBy: { createdAt: "asc" } })
    case "ukm":
      return await prisma.ukm.findMany({ orderBy: { createdAt: "asc" } })
    case "event":
      return await prisma.event.findMany({
        orderBy: [{ dateTime: { sort: "asc", nulls: "last" } }, { createdAt: "asc" }],
      })
    case "news":
      return await prisma.news.findMany({ orderBy: { createdAt: "asc" } })
    case "faq":
      return await prisma.faq.findMany({ orderBy: { createdAt: "asc" } })
    case "struktur":
      return await prisma.struktur.findMany({ orderBy: { createdAt: "asc" } })
    case "message":
      return await prisma.message.findMany({ orderBy: { createdAt: "desc" } })
  }
}

export async function getModelById(modelName: ModelName, id: string) {
  switch (modelName) {
    case "blueprint":
      return await prisma.blueprint.findUnique({ where: { id } })
    case "dosen":
      return await prisma.dosen.findUnique({ where: { id } })
    case "ukm":
      return await prisma.ukm.findUnique({ where: { id } })
    case "event":
      return await prisma.event.findUnique({ where: { id } })
    case "news":
      return await prisma.news.findUnique({ where: { id } })
    case "faq":
      return await prisma.faq.findUnique({ where: { id } })
    case "struktur":
      return await prisma.struktur.findUnique({ where: { id } })
    case "message":
      return await prisma.message.findUnique({ where: { id } })
  }
}
