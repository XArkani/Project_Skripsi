"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import Toast from "@/components/shared/Toast"
import { Eye, EyeOff, Loader2, ShieldCheck, Layers, Radio, Users, ArrowUpRight } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [toastType, setToastType] = useState<"success" | "error" | "info">("error")

  const showToast = (msg: string, type: "success" | "error" | "info" = "error") => {
    setToastMessage(msg)
    setToastType(type)
    setTimeout(() => setToastMessage(null), 4000)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedEmail = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      showToast("Format email tidak valid. Contoh: admin@hamzanwadi.ac.id", "error")
      return
    }
    if (!password) {
      showToast("Password wajib diisi.", "error")
      return
    }
    setLoading(true)
    try {
      const result = await authClient.signIn.email({ email: trimmedEmail, password })
      if (result.error) {
        showToast(result.error.message ?? "Login gagal. Periksa kembali kredensial Anda.", "error")
        return
      }
      showToast("Login berhasil! Selamat datang Admin FT.", "success")
      router.push("/dashboard")
    } catch {
      showToast("Terjadi kesalahan yang tidak terduga.", "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh bg-white selection:bg-emerald-200 selection:text-emerald-950">
      <Toast message={toastMessage} type={toastType} />
      <div className="min-h-dvh grid lg:grid-cols-[1.05fr_0.95fr]">
        <aside className="relative overflow-hidden bg-emerald-950 text-white flex flex-col min-h-[420px] lg:min-h-dvh">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-700" aria-hidden="true" />
          <div className="absolute inset-0 opacity-[0.08]" aria-hidden="true" style={{ backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`, backgroundSize: "56px 56px" }} />
          <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-emerald-600/25 blur-[1px] border border-white/10" aria-hidden="true" />
          <div className="absolute -bottom-40 -left-20 w-[560px] h-[560px] rounded-full bg-emerald-400/15 blur-[1px] border border-white/10" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/[0.04]" aria-hidden="true" />

          <div className="relative z-10 flex flex-1 flex-col px-6 sm:px-10 lg:px-12 py-8 lg:py-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.18)] shrink-0">
                <div className="relative w-9 h-9">
                  <Image src="/LOGO FAKULTAS TEKNIK.webp" alt="Logo Fakultas Teknik" fill sizes="36px" className="object-contain" priority />
                </div>
              </div>
              <div className="leading-none">
                <p className="text-[13px] font-extrabold tracking-[0.14em] text-white">FAKULTAS TEKNIK</p>
                <p className="text-[11px] font-semibold tracking-[0.18em] text-emerald-200/90 mt-1">UNIVERSITAS HAMZANWADI</p>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center py-6 lg:py-0 max-w-[560px]">
              <h1 className="text-[30px] sm:text-[38px] lg:text-[44px] font-[800] leading-[0.95] tracking-[-0.03em] text-white">
                Satu portal.
                <br />
                <span className="text-emerald-300">Semua kelola.</span>
              </h1>
              <p className="mt-4 text-[14px] sm:text-[15px] leading-7 text-emerald-100/85 max-w-[46ch] font-medium">
                Panel resmi pengelolaan Fakultas Teknik — terbitkan berita, atur agenda, kelola data dosen, UKM, dan struktur organisasi tanpa berpindah sistem.
              </p>

              <div className="mt-8 grid gap-3">
                {[
                  { icon: Layers, title: "Blueprint & Fasilitas", desc: "Kelola 6 kategori sarana — lab, gedung, bengkel hingga penunjang." },
                  { icon: Users, title: "Data Dosen & Riset", desc: "Profil, kepakaran, dan publikasi dalam satu direktori." },
                  { icon: Radio, title: "Agenda & Publikasi", desc: "Event, berita, dan FAQ terbit terjadwal dengan pratinjau." },
                ].map((f) => (
                  <div key={f.title} className="flex gap-3.5 rounded-2xl bg-white/[0.07] border border-white/10 px-4 py-3.5 backdrop-blur-[2px]">
                    <span className="w-9 h-9 rounded-xl bg-white text-emerald-800 flex items-center justify-center shrink-0 shadow-sm">
                      <f.icon className="w-4 h-4" strokeWidth={2.2} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold leading-none text-white">{f.title}</p>
                      <p className="text-[12.5px] leading-5 text-emerald-100/80 mt-1.5">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 lg:mt-10 flex flex-col gap-4">
              <div className="rounded-2xl bg-emerald-900/40 border border-white/10 p-4 flex gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center shrink-0 text-emerald-950">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <p className="text-[12.5px] leading-5 text-emerald-100/90">
                  Akses terbatas untuk operator resmi. Setiap perubahan tercatat dan dapat diaudit oleh dekanat.
                </p>
              </div>
              <p className="text-[11px] tracking-[0.14em] font-semibold text-emerald-300/70">© 2026 FAKULTAS TEKNIK — UNIVERSITAS HAMZANWADI</p>
            </div>
          </div>
        </aside>

        <main className="flex flex-col bg-slate-50/60 min-h-[520px] lg:bg-white">
          <div className="flex flex-1 items-center justify-center px-5 sm:px-8 lg:px-12 py-8 sm:py-10">
            <div className="w-full max-w-[420px] rounded-[28px] border border-slate-200 bg-white p-6 sm:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08),0_1px_3px_rgba(15,23,42,0.08)] ring-1 ring-black/[0.02]">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" aria-hidden="true" />
                  <span className="text-[11px] font-extrabold tracking-[0.14em] text-emerald-700">ADMIN PORTAL</span>
                </div>
                <h2 className="mt-4 text-[26px] sm:text-[28px] font-extrabold tracking-[-0.03em] leading-none text-slate-900">Masuk ke dasbor</h2>
                <p className="mt-2.5 text-[13.5px] leading-6 text-slate-500 max-w-[36ch]">
                  Gunakan kredensial operator. Butuh akses baru? Hubungi dekanat untuk aktivasi akun.
                </p>
              </div>

              <form onSubmit={handleLogin} noValidate className="space-y-5">
                <div>
                  <label htmlFor="login-email" className="block text-[11px] font-extrabold tracking-[0.12em] text-slate-700 mb-2">
                    EMAIL PENGELOLA
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@hamzanwadi.ac.id"
                    className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50/80 px-4 text-[14px] font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/15 focus:border-emerald-500 transition-all caret-emerald-600"
                  />
                </div>

                <div>
                  <label htmlFor="login-password" className="block text-[11px] font-extrabold tracking-[0.12em] text-slate-700 mb-2">
                    PASSWORD
                  </label>
                  <div className="relative">
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Masukkan password"
                      className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50/80 px-4 pr-11 text-[14px] font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/15 focus:border-emerald-500 transition-all caret-emerald-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg inline-flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:outline-offset-2"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-[14px] font-bold tracking-[-0.01em] shadow-[0_8px_20px_rgba(16,122,65,0.25)] hover:shadow-[0_10px_24px_rgba(16,122,65,0.3)] active:shadow-none transition-all disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Memproses...
                    </>
                  ) : (
                    <>
                      Masuk Sebagai Admin <ArrowUpRight className="w-4 h-4 opacity-80" />
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
