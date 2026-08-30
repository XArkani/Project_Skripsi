"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "ft-install-dismissed";

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY)) return;
    } catch {
      /* storage unavailable */
    }
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  function dismiss(forever = false) {
    setVisible(false);
    setDeferred(null);
    if (forever) {
      try {
        localStorage.setItem(DISMISS_KEY, "1");
      } catch {
        /* storage unavailable */
      }
    }
  }

  if (!visible || !deferred) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[45] w-[calc(100vw-2rem)] max-w-sm rounded-xl border border-border bg-card p-4 shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
            <Download className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-medium text-foreground">Install Aplikasi FT Hamzanwadi?</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Akses lebih cepat tanpa membuka browser.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => dismiss()}
          aria-label="Tutup"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={async () => {
            await deferred.prompt();
            dismiss(true);
          }}
          className="flex-1 rounded-md bg-[#008f5a] px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-[#00714c]"
        >
          Install
        </button>
        <button
          type="button"
          onClick={() => dismiss(true)}
          className="flex-1 rounded-md border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          Jangan tampilkan lagi
        </button>
      </div>
    </div>
  );
}