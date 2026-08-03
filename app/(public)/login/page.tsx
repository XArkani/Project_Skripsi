"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import Toast from "@/components/shared/Toast"
import { Lock } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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
      router.push("/dashboard/admin")
    } catch {
      showToast("Terjadi kesalahan yang tidak terduga.", "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-4">
      {toastMessage && <Toast message={toastMessage} type={toastType} />}

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg text-center space-y-6">
        <div>
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto shadow-inner mb-4">
            <Lock className="w-7 h-7 text-emerald-700" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Admin Portal FT</h1>
          <p className="text-slate-500 text-xs mt-1">Otorisasi khusus pengelolaan data dekanat & berita kampus.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Pengelola</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@hamzanwadi.ac.id"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-md transition-all disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Masuk Sebagai Admin"}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100">
          <p className="text-[11px] text-slate-400">
            Demo Kredensial:<br />
            <b className="text-slate-600">email: admin | password: teknik2026</b>
          </p>
        </div>
      </div>
    </div>
  )
}
