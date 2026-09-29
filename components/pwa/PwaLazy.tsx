"use client";

import dynamic from "next/dynamic";

// PWA helpers hanya relevan setelah load (idle / event) — di-split agar
// tidak ikut bundle kritis paint pertama. Wrapper ini adalah Client
// Component sehingga boleh memakai `ssr: false`; keduanya me-return null
// saat initial render dan hanya bekerja via browser API.
const RegisterSW = dynamic(() => import("./RegisterSW"), { ssr: false });
const InstallPrompt = dynamic(() => import("./InstallPrompt"), {
  ssr: false,
});

export default function PwaLazy() {
  return (
    <>
      <RegisterSW />
      <InstallPrompt />
    </>
  );
}
