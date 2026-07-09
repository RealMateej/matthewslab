import type { Metadata } from "next"
import { Space_Grotesk, Inter, Space_Mono } from "next/font/google"
import AppShell from "@/components/layout/AppShell"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
})

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://matthewslab.cz"),
  title: {
    default: "MatthewsLab — Video, Foto & Web Studio",
    template: "%s | MatthewsLab",
  },
  description:
    "MatthewsLab je kreativní studio pro střih videa, reels, podcasty, fotografii, RAW retuš, grafický design a web design. Obsah a weby, které vypadají draze.",
  keywords: [
    "střih videa",
    "reels",
    "podcast editing",
    "fotografie",
    "RAW retuš",
    "grafický design",
    "web design",
    "MatthewsLab",
    "kreativní studio",
  ],
  authors: [{ name: "MatthewsLab" }],
  creator: "MatthewsLab",
  openGraph: {
    title: "MatthewsLab — Video, Foto & Web Studio",
    description:
      "Kreativní studio pro firmy, influencery, podnikatele a podcasty. Video, foto, design, web.",
    url: "https://matthewslab.cz",
    siteName: "MatthewsLab",
    locale: "cs_CZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MatthewsLab — Video, Foto & Web Studio",
    description: "Kreativní studio pro firmy, influencery, podnikatele a podcasty.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="cs"
      className={`${spaceGrotesk.variable} ${inter.variable} ${spaceMono.variable}`}
    >
      <body className="bg-background font-body text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "MatthewsLab",
              description:
                "Kreativní studio — video editing, reels, podcast editing, fotografie, RAW retuš, grafický design a web design.",
              url: "https://matthewslab.cz",
              email: "ahoj@matthewslab.cz",
              areaServed: "CZ",
              sameAs: ["https://instagram.com/matthewslab"],
            }),
          }}
        />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
