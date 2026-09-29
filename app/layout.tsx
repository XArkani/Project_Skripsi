import { Agentation } from "agentation";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { CustomThemeProvider } from "@/components/shared/theme-provider";
import "./globals.css";
import { cn } from "@/lib/utils";
import { UiChromeProvider } from "@/components/shared/ui-chrome";
import PwaLazy from "@/components/pwa/PwaLazy";

const inter = localFont({
  src: [{ path: "./fonts/inter-latin.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-sans",
  display: "swap",
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
  viewportFit: "cover",
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
      <body className="antialiased">
        {/* Blocking theme script: inline native script (not next/script) to set
            theme class before hydration and prevent FOUC. Uses type trick to
            avoid React 19 "script tag in component" warning in dev. */}
        <script
          id="theme-init"
          suppressHydrationWarning
          type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme")||"system";var r=t==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):t;document.documentElement.classList.add(r);document.documentElement.style.colorScheme=r;}catch(e){}})();`,
          }}
        />
        <CustomThemeProvider>
        <UiChromeProvider>
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
        <PwaLazy />
        </UiChromeProvider>
        {process.env.NODE_ENV === "development" && <Agentation />}
        </CustomThemeProvider>
      </body>
    </html>
  );
}
