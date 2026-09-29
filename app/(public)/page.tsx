import dynamic from "next/dynamic"
import { cacheTag } from "next/cache"
import { getBlueprints, getDosen, getEvents, getNews, getFAQs, getUKM } from "@/lib/faculty"
import { PRODI_LIST } from "@/lib/prodi"
import HeroSection from "@/components/sections/HeroSection"
import QuickAccess from "@/components/sections/QuickAccess"
import FacultyIntro from "@/components/sections/FacultyIntro"
import EventPreview from "@/components/sections/EventPreview"
import NewsPreview from "@/components/sections/NewsPreview"
import ContactCTA from "@/components/sections/ContactCTA"

// Below-the-fold sections yang membawa JS client (MobileCarousel,
// count-up, accordion) di-split agar tidak ikut bundle paint pertama.
// SSR tetap aktif sehingga konten tetap ada di HTML server (SEO aman),
// hanya JS interaktifnya yang ditunda — sesuai panduan lazy-loading Next.js.
const FacultyStats = dynamic(() => import("@/components/sections/FacultyStats"))
const BlueprintPreview = dynamic(
  () => import("@/components/sections/BlueprintPreview"),
)
const DosenHighlight = dynamic(() => import("@/components/sections/DosenHighlight"))
const StudentLife = dynamic(() => import("@/components/sections/StudentLife"))
const FaqPreview = dynamic(() => import("@/components/sections/FaqPreview"))

export default async function HomePage() {
  "use cache"
  cacheTag("home")

  const [blueprints, dosen, events, news, faqs, ukm] = await Promise.all([
    getBlueprints(),
    getDosen(),
    getEvents(),
    getNews(),
    getFAQs(),
    getUKM(),
  ])

  const labCount = blueprints.filter((b) => /laboratorium/i.test(b.category)).length

  const stats = [
    { label: "Program Studi", value: String(PRODI_LIST.length) },
    { label: "Tenaga Pendidik", value: String(dosen.length) },
    { label: "Laboratorium", value: String(labCount) },
    { label: "Unit Kegiatan Mahasiswa", value: String(ukm.length) },
  ]

  return (
    <>
      <HeroSection />
      <QuickAccess />
      <FacultyIntro />
      <FacultyStats stats={stats} />
      <BlueprintPreview items={blueprints} />
      <DosenHighlight items={dosen} />
      <EventPreview items={events} />
      <NewsPreview items={news} />
      <StudentLife items={ukm} />
      <FaqPreview items={faqs} />
      <ContactCTA />
    </>
  )
}