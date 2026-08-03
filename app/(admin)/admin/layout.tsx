import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { AdminSidebar } from "@/components/admin/AdminSidebar"

async function SessionCheck({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
    redirect("/login")
  }

  return <AdminSidebar>{children}</AdminSidebar>
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-slate-400 text-sm">Memuat...</div>}>
      <SessionCheck>{children}</SessionCheck>
    </Suspense>
  )
}
