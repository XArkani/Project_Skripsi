"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// ScrollToTop hanya berguna setelah pengguna menggulir (>600px), jadi komponen
// beserta library animasinya baru diimpor saat scroll pertama — tidak ikut
// hydration awal maupun bundle kritis.
const ScrollToTop = dynamic(() => import("./ScrollToTop"), { ssr: false })

export default function ScrollToTopLazy() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Muat saat scroll pertama, atau langsung bila posisi scroll dipulihkan browser.
    if (window.scrollY > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReady(true)
      return
    }
    const onScroll = () => setReady(true)
    window.addEventListener("scroll", onScroll, { once: true, passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return ready ? <ScrollToTop /> : null
}
