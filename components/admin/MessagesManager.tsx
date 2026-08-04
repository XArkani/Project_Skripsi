"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, Mail, Trash2, Phone, User, Calendar, ArrowLeft, CheckCircle2 } from "lucide-react"
import { updateRecord, deleteRecord } from "@/lib/admin-actions"
import type { Message } from "@/lib/types"

interface MessagesManagerProps {
  initialData: Message[]
}

export function MessagesManager({ initialData }: MessagesManagerProps) {
  const [data, setData] = useState<Message[]>(initialData)
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<Message | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const filtered = search
    ? data.filter((item) => {
        const haystack = [item.senderName, item.senderEmail, item.subject, item.message].join(" ").toLowerCase()
        return haystack.includes(search.toLowerCase())
      })
    : data

  async function handleOpen(item: Message) {
    setSelected(item)
    setDetailOpen(true)
    if (!item.isRead) {
      const result = await updateRecord("message", item.id, { isRead: true })
      if (result.success) {
        setData((prev) => prev.map((m) => (m.id === item.id ? result.data : m)))
        setSelected(() => result.data)
      }
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus pesan ini?")) return
    await deleteRecord("message", id)
    setData((prev) => prev.filter((item) => item.id !== id))
    setDetailOpen(false)
    setSelected(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kotak Masuk Pesan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari pesan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground text-sm">
            {search ? "Tidak ditemukan." : "Belum ada pesan masuk."}
          </div>
        ) : (
          <ul className="divide-y divide-border border border-border rounded-xl overflow-hidden">
            {filtered.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleOpen(item)}
                  className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-muted/40 transition-colors cursor-pointer"
                >
                  <span className="relative shrink-0">
                    <span className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </span>
                    {!item.isRead && <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-background" />}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold truncate">{item.senderName}</span>
                      <span className="text-xs text-muted-foreground shrink-0">{item.date}</span>
                    </span>
                    <span className="block text-xs text-muted-foreground truncate mt-0.5">{item.subject}</span>
                  </span>
                  {!item.isRead && <Badge variant="secondary">Baru</Badge>}
                </button>
              </li>
            ))}
          </ul>
        )}

        <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
          {selected && (
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  <span className="inline-flex items-center gap-2">
                    <Mail className="h-4 w-4 text-emerald-600" />
                    Detail Pesan
                  </span>
                </DialogTitle>
              </DialogHeader>
              <div className="px-6 py-5 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Nama Pengirim</p>
                    <p className="text-sm font-semibold">{selected.senderName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Email</p>
                    <p className="text-sm">{selected.senderEmail}</p>
                  </div>
                  {selected.senderPhone && (
                    <div className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                      <p className="text-sm">{selected.senderPhone}</p>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="text-sm">{selected.date}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Perihal</p>
                  <p className="text-sm font-semibold">{selected.subject}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Isi Pesan</p>
                  <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed bg-muted/40 rounded-lg p-3">{selected.message}</p>
                </div>

                {selected.isRead && (
                  <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Sudah dibaca
                  </p>
                )}

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/50">
                  <Button variant="secondary" onClick={() => setDetailOpen(false)} className="cursor-pointer">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Kembali
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(selected.id)} className="cursor-pointer">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Hapus
                  </Button>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </CardContent>
    </Card>
  )
}