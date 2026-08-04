import { Suspense } from "react"
import Header from "@/components/shared/Header"
import Footer from "@/components/shared/Footer"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800 font-sans selection:bg-emerald-200">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Suspense>
        <Footer />
      </Suspense>
    </div>
  )
}
