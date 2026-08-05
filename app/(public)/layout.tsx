import { Suspense } from "react"
import Header from "@/components/shared/Header"
import Footer from "@/components/shared/Footer"
import PageTransition from "@/components/shared/PageTransition"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800 font-sans selection:bg-emerald-200">
      <Header />
      <main className="flex-grow">
        <PageTransition>{children}</PageTransition>
      </main>
      <Suspense>
        <Footer />
      </Suspense>
    </div>
  )
}
