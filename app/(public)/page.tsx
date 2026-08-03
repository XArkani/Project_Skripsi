import { cacheTag } from "next/cache"
import { getBlueprints, getDosen, getEvents, getNews, getFAQs } from "@/lib/faculty"
import HeroSection from "@/components/sections/HeroSection"
import QuickNavPanel from "@/components/sections/QuickNavPanel"
import BlueprintPreview from "@/components/sections/BlueprintPreview"
import DosenHighlight from "@/components/sections/DosenHighlight"
import EventPreview from "@/components/sections/EventPreview"
import NewsPreview from "@/components/sections/NewsPreview"
import FaqPreview from "@/components/sections/FaqPreview"

export default async function HomePage() {
  "use cache"
  cacheTag("home")

  const [blueprints, dosen, events, news, faqs] = await Promise.all([
    getBlueprints(), getDosen(), getEvents(), getNews(), getFAQs()
  ])

  return (
    <>
      <HeroSection />
      <QuickNavPanel />
      <BlueprintPreview items={blueprints} />
      <DosenHighlight items={dosen} />
      <EventPreview items={events} />
      <NewsPreview items={news} />
      <FaqPreview items={faqs} />
    </>
  )
}
