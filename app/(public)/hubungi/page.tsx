"use client"

import { useState } from "react"
import { submitContact } from "@/lib/actions"
import Toast from "@/components/shared/Toast"
import MapWithFallback from "@/components/shared/MapWithFallback"
import { MapPin, Mail, Phone, Clock, Send, Loader2, ExternalLink } from "lucide-react"
import { CONTACT_INFO } from "@/lib/contact"

const contactInfo = [
  { icon: MapPin, title: "Alamat Kampus", value: CONTACT_INFO.address },
  { icon: Mail, title: "Surat Elektronik", value: CONTACT_INFO.email },
  { icon: Phone, title: "Nomor Layanan", value: CONTACT_INFO.phone },
  { icon: Clock, title: "Jam Kerja Kantor", value: CONTACT_INFO.hours },
]

const inputClass =
  "w-full border border-border rounded-xl bg-muted px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-background transition-colors"

const labelClass = "block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5"

export default function HubungiPage() {
  const [form, setForm] = useState({
    senderName: "",
    senderEmail: "",
    senderPhone: "",
    subject: "",
    message: "",
  })
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const showToast = (msg: string, type: "success" | "error" | "info" = "success") => {
    setToastMessage(msg)
    setToastType(type)
    setTimeout(() => setToastMessage(null), 4000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.senderName || !form.senderEmail || !form.subject || !form.message) {
      showToast("Mohon lengkapi seluruh field yang bertanda bintang (*).", "error")
      return
    }

    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.set("senderName", form.senderName)
      formData.set("senderEmail", form.senderEmail)
      formData.set("senderPhone", form.senderPhone)
      formData.set("subject", form.subject)
      formData.set("message", form.message)
      const websiteField = document.querySelector('input[name="website"]') as HTMLInputElement | null
      if (websiteField) formData.set("website", websiteField.value)

      await submitContact(formData)
      showToast("Pesan Anda berhasil terkirim!", "success")
      setForm({ senderName: "", senderEmail: "", senderPhone: "", subject: "", message: "" })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : ""
      if (msg.includes("5 menit")) showToast(msg, "info")
      else showToast(msg || "Gagal mengirim pesan. Silakan coba lagi.", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto page-gutter pt-20 sm:pt-28 pb-16 sm:pb-24">
      <Toast message={toastMessage} type={toastType} />

      <div className="text-center md:text-left pb-8 mb-6">
        <span className="text-xs uppercase font-extrabold text-emerald-700 dark:text-emerald-400 tracking-wider">Hubungi Kami</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-2 tracking-tight">
          Layanan Pertanyaan Terpadu
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-3 max-w-2xl md:mx-0 mx-auto">
          Dapatkan info terakreditasi mengenai penerimaan mahasiswa baru, magang, kerja sama industri, dan layanan
          perkuliahan.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
        <div className="lg:col-span-5 space-y-8 bg-emerald-900 text-white p-7 sm:p-8 rounded-3xl shadow-sm flex flex-col">
          <div className="space-y-3">
            <span className="text-emerald-300 font-bold text-xs uppercase tracking-widest block">
              Informasi Kontak
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold leading-snug">
              Fakultas Teknik Universitas Hamzanwadi
            </h2>
            <p className="text-emerald-200 text-sm leading-relaxed">
              Kami senantiasa terbuka menerima kunjungan akademik, diskusi kolaboratif riset, dan rekrutmen magang
              industri.
            </p>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-6 pt-6 border-t border-emerald-800">
            {contactInfo.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-11 h-11 shrink-0 rounded-2xl bg-emerald-800 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-emerald-300 uppercase tracking-wide">{item.title}</h4>
                    <p className="text-sm text-slate-100 mt-1 leading-relaxed break-words">{item.value}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="lg:col-span-7 flex">
          <div className="w-full bg-card p-6 sm:p-8 rounded-3xl border border-border shadow-sm flex flex-col">
            <h3 className="font-extrabold text-xl text-foreground mb-6">Ajukan Pertanyaan / Kirim Aspirasi</h3>

            <form onSubmit={handleSubmit} className="space-y-5 flex flex-col flex-1">
              <div className="absolute left-[-9999px] top-auto" aria-hidden="true">
                <label htmlFor="website">Jangan diisi</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="senderName" className={labelClass}>
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="senderName"
                    type="text"
                    required
                    value={form.senderName}
                    onChange={(e) => setForm({ ...form, senderName: e.target.value })}
                    placeholder="Contoh: Muhammad Yusuf"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="senderEmail" className={labelClass}>
                    Email Aktif <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="senderEmail"
                    type="email"
                    required
                    value={form.senderEmail}
                    onChange={(e) => setForm({ ...form, senderEmail: e.target.value })}
                    placeholder="Contoh: yusuf@gmail.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="senderPhone" className={labelClass}>
                    Nomor Telepon/WA
                  </label>
                  <input
                    id="senderPhone"
                    type="tel"
                    value={form.senderPhone}
                    onChange={(e) => setForm({ ...form, senderPhone: e.target.value })}
                    placeholder="Contoh: 0812345..."
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="subject" className={labelClass}>
                    Subjek Pesan <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Contoh: PMB 2026"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>
                  Isi Pesan / Pertanyaan <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={8}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tulis pesan lengkap Anda..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="mt-auto pt-5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 disabled:cursor-not-allowed text-white font-bold text-sm shadow-md transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Mengirim Pesan...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Kirim Pesan Resmi Anda
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-3xl overflow-hidden border border-border shadow-sm bg-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card px-6 sm:px-8 py-4 sm:py-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-foreground">Lokasi Kampus</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{CONTACT_INFO.mapsAddressShort}</p>
            </div>
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT_INFO.mapsQuery)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2.5 rounded-xl shadow-sm transition-colors cursor-pointer shrink-0"
          >
            Buka di Google Maps
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="h-72 sm:h-[480px] relative">
          <MapWithFallback />
        </div>
      </div>
    </div>
  )
}