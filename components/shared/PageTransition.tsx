"use client"

import { usePathname } from "next/navigation"

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Transisi masuk berbasis CSS (keyframes `page-enter`) — tanpa framer-motion
  // agar library animasi tidak ikut di bundle awal setiap halaman publik.
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  )
}
