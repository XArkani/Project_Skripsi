"use client"

import { useState } from "react"
import { submitContact } from "@/lib/actions"
import Toast from "@/components/shared/Toast"
import MapWithFallback from "@/components/shared/MapWithFallback"
import { MapPin, Mail, Phone, Clock } from "lucide-react"

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
    } catch {
      showToast("Gagal mengirim pesan. Silakan coba lagi.", "error")
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28">
      <Toast message={toastMessage} type={toastType} />

      <div className="border-b border-slate-200 pb-6 mb-10 text-center md:text-left">
        <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">Hubungi Kami</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-1">Layanan Pertanyaan Terpadu</h1>
        <p className="text-slate-500 text-sm sm:text-base mt-2">Dapatkan info terakreditasi mengenai penerimaan mahasiswa baru, magang, kerja sama industri, dan layanan perkuliahan.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-8 bg-emerald-900 text-white p-8 rounded-3xl shadow-sm">
          <div className="space-y-4">
            <span className="text-emerald-300 font-bold text-xs uppercase tracking-widest block">Informasi Kontak</span>
            <h2 className="text-2xl font-extrabold">Fakultas Teknik Universitas Hamzanwadi</h2>
            <p className="text-emerald-200 text-sm leading-relaxed">
              Kami senantiasa terbuka menerima kunjungan akademik, diskusi kolaboratif riset, dan rekrutmen magang industri.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-emerald-800">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 mt-0.5 text-emerald-300" />
              <div>
                <h4 className="font-bold text-xs text-emerald-300 uppercase">Alamat Kampus</h4>
                <p className="text-xs sm:text-sm text-slate-100 mt-1">Jl. TGKH. M. Zainuddin Abdul Madjid No. 132, Pancor, Selong, Kabupaten Lombok Timur, Nusa Tenggara Barat.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 mt-0.5 text-emerald-300" />
              <div>
                <h4 className="font-bold text-xs text-emerald-300 uppercase">Surat Elektronik</h4>
                <p className="text-xs sm:text-sm text-emerald-300 mt-1">teknik@hamzanwadi.ac.id</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 mt-0.5 text-emerald-300" />
              <div>
                <h4 className="font-bold text-xs text-emerald-300 uppercase">Nomor Layanan</h4>
                <p className="text-xs sm:text-sm text-slate-100 mt-1">+62 (376) 21377 / 0812-3456-7890</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 mt-0.5 text-emerald-300" />
              <div>
                <h4 className="font-bold text-xs text-emerald-300 uppercase">Jam Kerja Kantor</h4>
                <p className="text-xs sm:text-sm text-slate-100 mt-1">Senin - Sabtu: 08:00 - 15:30 WITA</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200">
          <h3 className="font-extrabold text-xl text-slate-900 mb-6">Ajukan Pertanyaan / Kirim Aspirasi</h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="absolute left-[-9999px] top-auto" aria-hidden="true">
              <label htmlFor="website">Jangan diisi</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  value={form.senderName}
                  onChange={(e) => setForm({ ...form, senderName: e.target.value })}
                  placeholder="Contoh: Muhammad Yusuf"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Aktif *</label>
                <input
                  type="email"
                  required
                  value={form.senderEmail}
                  onChange={(e) => setForm({ ...form, senderEmail: e.target.value })}
                  placeholder="Contoh: yusuf@gmail.com"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nomor Telepon/WA</label>
                <input
                  type="tel"
                  value={form.senderPhone}
                  onChange={(e) => setForm({ ...form, senderPhone: e.target.value })}
                  placeholder="Contoh: 0812345..."
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Subjek Pesan *</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Contoh: PMB 2026"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Isi Pesan / Pertanyaan *</label>
              <textarea
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tulis pesan lengkap Anda..."
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all hover:scale-[1.01]"
              >
                Kirim Pesan Resmi Anda
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-12 rounded-3xl overflow-hidden border border-slate-200 shadow-sm h-80 relative">
        <MapWithFallback />
      </div>
    </div>
  )
}
