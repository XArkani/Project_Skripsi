import { Agentation } from "agentation";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import Script from "next/script";
import { CustomThemeProvider } from "@/components/shared/theme-provider";
import "./globals.css";
import { cn } from "@/lib/utils";
import RegisterSW from "@/components/pwa/RegisterSW";
import InstallPrompt from "@/components/pwa/InstallPrompt";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fakultas Teknik Universitas Hamzanwadi",
  description: "Portal resmi Fakultas Teknik Universitas Hamzanwadi. Informasi akademik, profil dosen, agenda event, berita, dan layanan mahasiswa.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "FT Hamzanwadi" },
  icons: {
    icon: [
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={cn("font-sans", inter.variable)} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Blocking theme script: sets the theme class before hydration to
            prevent a flash of the wrong theme. Handled by Next.js infrastructure
            (not rendered inside a React component tree), so it never triggers
            the React 19 "script tag in component" console error. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem("theme")||"system";var r=t==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):t;document.documentElement.classList.add(r);document.documentElement.style.colorScheme=r;}catch(e){}})();`}
        </Script>
        <CustomThemeProvider>
        <div
          hidden
          data-design-contract="FT_HOMEPAGE_REDESIGN"
          data-seed-key="ASSIGNED_DIRECTION_FT_HOMEPAGE"
        >
          THESIS: institutional faculty homepage, not a SaaS dashboard; refuses card-grid-of-everything.
          OWN-WORLD: green-black engineering palette, Inter single face, 8px grid, hairline borders,
          blueprint-grid gradient fields in place of photography. STORY: who the faculty is, its
          scale, facilities, people, student life; then browse or contact. FIRST VIEWPORT: solid 72px white
          nav over a full-bleed green-black gradient hero shifted below it; centered headline,
          description and two CTAs under a guaranteed sky gap; quick-access strip below. FORM:
          editorial 13-section homepage, alternating bands, light reveal + count-up motion.
          FINISH: reviewed and documented with DESIGN.md before the run is called complete.
        </div>
        {children}
        <Toaster />
        <RegisterSW />
        <InstallPrompt />
        {process.env.NODE_ENV === "development" && <Agentation />}
        </CustomThemeProvider>
      </body>
    </html>
  );
}
