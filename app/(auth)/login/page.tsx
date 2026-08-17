"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import Toast from "@/components/shared/Toast"
import { Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react"

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
    setLoading(true)

    try {
      const result = await authClient.signIn.email({ email, password })

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
    <div className="relative flex min-h-dvh flex-col overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-emerald-700 to-emerald-950"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 min-h-11 px-3 py-2 rounded-lg text-xs font-bold text-emerald-50/90 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            Kembali ke Beranda
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 py-8 sm:py-10">
          <Toast message={toastMessage} type={toastType} />

          <div className="w-full max-w-md">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-white/60 shadow-2xl text-center space-y-6">
              <div>
                <div className="relative w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden mx-auto mb-4">
                  <Image
                    src="/LOGO FAKULTAS TEKNIK.webp"
                    alt="Logo Fakultas Teknik Universitas Hamzanwadi"
                    fill
                    sizes="64px"
                    className="object-contain p-1.5"
                  />
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">Admin Portal FT</h1>
                <p className="text-slate-500 text-xs mt-1">Otorisasi khusus pengelolaan data dekanat & berita kampus.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label htmlFor="login-email" className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                    Email Pengelola
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
                    className="w-full min-h-11 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="login-password" className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                    Password
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
                      className="w-full min-h-11 border border-slate-200 rounded-xl px-4 py-2.5 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full min-h-11 flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      Memproses...
                    </>
                  ) : (
                    "Masuk Sebagai Admin"
                  )}
                </button>
              </form>

              <div className="pt-4 border-t border-slate-100 flex flex-col items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-[11px] text-emerald-800">
                  <b className="text-emerald-700">Demo:</b> admin@hamzanwadi.ac.id / teknik2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}