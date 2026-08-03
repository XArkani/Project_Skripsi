"use client"

import { useState } from "react"
import { MapPin, ExternalLink } from "lucide-react"

export default function MapWithFallback() {
  const [failed, setFailed] = useState(false)

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
          href="https://www.google.com/maps/search/?api=1&query=Universitas+Hamzanwadi"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-emerald-900 font-bold text-xs px-4 py-2.5 rounded-lg shadow-md hover:bg-emerald-50 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Buka di Google Maps
        </a>
      </div>
    )
  }

  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.8344607736637!2d116.5317765!3d-8.6596489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dcc4ee5abcb672f%3A0xe5a3c00c7104b281!2sUniversitas%20Hamzanwadi!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
      className="w-full h-full border-0"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      onError={() => setFailed(true)}
    />
  )
}
