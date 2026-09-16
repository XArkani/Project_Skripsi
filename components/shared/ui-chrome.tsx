"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"

interface UiChromeContextValue {
  navOpen: boolean
  setNavOpen: (open: boolean) => void
  installPromptOpen: boolean
  setInstallPromptOpen: (open: boolean) => void
}

const UiChromeContext = createContext<UiChromeContextValue>({
  navOpen: false,
  setNavOpen: () => {},
  installPromptOpen: false,
  setInstallPromptOpen: () => {},
})

export function useUiChrome(): UiChromeContextValue {
  return useContext(UiChromeContext)
}

export function UiChromeProvider({ children }: { children: ReactNode }) {
  const [navOpen, setNavOpen] = useState(false)
  const [installPromptOpen, setInstallPromptOpen] = useState(false)

  const value = useMemo(
    () => ({ navOpen, setNavOpen, installPromptOpen, setInstallPromptOpen }),
    [navOpen, installPromptOpen]
  )

  return <UiChromeContext.Provider value={value}>{children}</UiChromeContext.Provider>
}
