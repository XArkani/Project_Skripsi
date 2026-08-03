"use client"

import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

type ToastType = "success" | "error" | "info"

interface ToastProps {
  message: string | null
  type?: ToastType
}

const typeStyles: Record<ToastType, string> = {
  success: "bg-emerald-600",
  error: "bg-red-600",
  info: "bg-slate-800",
}

export default function Toast({ message, type = "info" }: ToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={cn(
            "fixed bottom-6 right-6 z-50 px-6 py-3 rounded-xl text-white text-sm font-semibold shadow-2xl",
            typeStyles[type]
          )}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
