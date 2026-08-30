import { cacheTag } from "next/cache"
import { getBlueprints, getDosen, getEvents, getNews, getFAQs, getUKM } from "@/lib/faculty"
import { PRODI_LIST } from "@/lib/prodi"
import HeroSection from "@/components/sections/HeroSection"
import QuickAccess from "@/components/sections/QuickAccess"
import FacultyIntro from "@/components/sections/FacultyIntro"
import FacultyStats from "@/components/sections/FacultyStats"
import BlueprintPreview from "@/components/sections/BlueprintPreview"
import DosenHighlight from "@/components/sections/DosenHighlight"
import EventPreview from "@/components/sections/EventPreview"
import NewsPreview from "@/components/sections/NewsPreview"
import StudentLife from "@/components/sections/StudentLife"
import FaqPreview from "@/components/sections/FaqPreview"
import ContactCTA from "@/components/sections/ContactCTA"

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