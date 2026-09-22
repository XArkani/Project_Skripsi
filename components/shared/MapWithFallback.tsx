"use client"

import { useState } from "react"
import { MapPin, ExternalLink, Loader2 } from "lucide-react"
import { CONTACT_INFO } from "@/lib/contact"

export default function MapWithFallback() {
  const [failed, setFailed] = useState(false)
  const [loading, setLoading] = useState(true)

  if (failed) {
    return (
      <div className="w-full h-full bg-emerald-900 flex flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-emerald-800 flex items-center justify-center text-emerald-300">
          <MapPin className="w-8 h-8" />
        </div>
        <div>
          <h3 className="font-extrabold text-white text-lg">Fakultas Teknik Universitas Hamzanwadi</h3>
          <p className="text-emerald-200 text-sm mt-2 max-w-md">
            Jl. TGKH. M. Zainuddin Abdul Madjid No. 132, Pancor, Selong, Kabupaten Lombok Timur, Nusa Tenggara Barat.
          </p>
        </div>
        <a
          href={CONTACT_INFO.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-background text-emerald-900 font-bold text-xs px-4 py-2.5 rounded-lg shadow-md hover:bg-emerald-50 transition-colors cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Buka di Google Maps
        </a>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full bg-emerald-50">
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-emerald-700">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-sm font-semibold">Memuat peta lokasi...</p>
        </div>
      )}
      <iframe
        src={CONTACT_INFO.mapsEmbedSrc}
        title="Peta Fakultas Teknik Universitas Hamzanwadi"
        className="absolute inset-0 w-full h-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setLoading(false)}
        onError={() => setFailed(true)}
      />
    </div>
  )
}