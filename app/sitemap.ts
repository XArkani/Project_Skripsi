import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/site-url"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl()
  const now = new Date()

  const routes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/blueprint", changeFrequency: "monthly", priority: 0.8 },
    { path: "/dosen", changeFrequency: "monthly", priority: 0.8 },
    { path: "/berita", changeFrequency: "weekly", priority: 0.8 },
    { path: "/event", changeFrequency: "weekly", priority: 0.8 },
    { path: "/ukm", changeFrequency: "monthly", priority: 0.7 },
    { path: "/struktur", changeFrequency: "monthly", priority: 0.7 },
    { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
    { path: "/hubungi", changeFrequency: "yearly", priority: 0.6 },
  ]

  return routes.map((route) => ({
    url: `${base}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
