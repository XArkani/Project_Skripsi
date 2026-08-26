"use client";

import { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!visible || !deferred) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm rounded-xl border bg-card p-4 shadow-lg md:left-auto md:right-4">
      <p className="text-sm font-medium">Install Aplikasi FT Hamzanwadi?</p>
      <p className="mt-1 text-xs text-muted-foreground">Akses lebih cepat tanpa buka browser.</p>
      <div className="mt-3 flex gap-2">
        <button
          onClick={async () => {
            deferred.prompt();
            await deferred.userChoice;
            setVisible(false);
            setDeferred(null);
          }}
          className="flex-1 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground"
        >
          Install
        </button>
        <button
          onClick={() => setVisible(false)}
          className="flex-1 rounded-md border px-3 py-2 text-xs font-medium"
        >
          Nanti
        </button>
      </div>
    </div>
  );
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}
