import type { LucideIcon } from "lucide-react"
import {
  Clapperboard,
  Sparkles,
  Mic,
  Camera,
  Wand2,
  PenTool,
  Code2,
} from "lucide-react"

export interface Service {
  icon: LucideIcon
  title: string
  description: string
}

export const services: Service[] = [
  {
    icon: Clapperboard,
    title: "Video Editing",
    description:
      "Dynamický střih, který drží pozornost od první do poslední vteřiny — pro sociální sítě, kampaně i firemní obsah.",
  },
  {
    icon: Sparkles,
    title: "Reels & Shorts",
    description:
      "Krátký formát, který prodává. Reels stavěné na první tři vteřiny a algoritmus sociálních sítí.",
  },
  {
    icon: Mic,
    title: "Podcast Editing",
    description:
      "Čistý zvuk, plynulé tempo. Střih podcastů včetně video verze pro YouTube a klipů na sociální sítě.",
  },
  {
    icon: Camera,
    title: "Fotografie",
    description:
      "Produktová, portrétní i eventová fotografie s důrazem na světlo, kompozici a atmosféru.",
  },
  {
    icon: Wand2,
    title: "RAW Retouching",
    description:
      "Profesionální retuš v Photoshopu — barvy, světlo a detail, bez ztráty přirozenosti snímku.",
  },
  {
    icon: PenTool,
    title: "Grafický Design",
    description:
      "Vizuální identita, sociální sítě a tiskoviny — design, který má styl i jasnou strukturu.",
  },
  {
    icon: Code2,
    title: "Web Design",
    description:
      "Weby, které vypadají draze a fungují rychle. Od návrhu přes animace až po nasazení.",
  },
]

export interface PricingTier {
  name: string
  price: string
  unit: string
  description: string
  features: string[]
  popular?: boolean
}

export const pricingTiers: PricingTier[] = [
  {
    name: "Reels Video",
    price: "od 1 500 Kč",
    unit: "za video",
    description: "Krátký formát pro Instagram, TikTok a YouTube Shorts.",
    features: [
      "Střih na míru platformě",
      "Barevné korekce",
      "Titulky a podpora textu",
      "Export ve všech formátech",
    ],
    popular: true,
  },
  {
    name: "Podcast Edit",
    price: "od 1 000 Kč",
    unit: "za epizodu",
    description: "Kompletní postprodukce vašeho podcastu.",
    features: [
      "Čištění a mastering zvuku",
      "Sestřih a tempo",
      "Video verze pro YouTube",
      "Kapitoly a titulky",
    ],
  },
  {
    name: "RAW Foto Retuš",
    price: "Individuálně",
    unit: "dle rozsahu zakázky",
    description: "Profesionální retuš na míru vaší sérii.",
    features: [
      "Barvy, světlo, detail",
      "Retuš pleti a nedokonalostí",
      "Konzistentní styl celé série",
      "Rychlé dodání",
    ],
  },
  {
    name: "Grafický Design",
    price: "Individuálně",
    unit: "dle projektu",
    description: "Vizuální identita i jednotlivé grafiky.",
    features: [
      "Vizuální identita a branding",
      "Grafika pro sociální sítě",
      "Tiskoviny a prezentace",
      "Zdrojové soubory",
    ],
  },
  {
    name: "Web Design",
    price: "Individuálně",
    unit: "dle rozsahu webu",
    description: "Weby na míru od návrhu po nasazení.",
    features: [
      "Návrh na míru značce",
      "Moderní animace a interakce",
      "Responzivní a rychlý kód",
      "Nasazení a technická podpora",
    ],
  },
]

export interface PortfolioItem {
  title: string
  category: string
  gradient: string
  size: "small" | "medium" | "large"
}

// Poznámka: gradienty jsou dočasné placeholdery místo reálných
// fotek/videí z projektů. Nahraďte je <Image> nebo <video> komponentami
// — viz README.md, sekce "Co doplnit před spuštěním".
export const portfolioItems: PortfolioItem[] = [
  { title: "Reels Kampaň", category: "Video / Reels", gradient: "from-cyan-500 via-blue-600 to-indigo-700", size: "large" },
  { title: "Podcast Series", category: "Podcast Editing", gradient: "from-violet-600 via-purple-600 to-fuchsia-600", size: "medium" },
  { title: "Produktová Fotografie", category: "Fotografie", gradient: "from-slate-600 via-slate-800 to-black", size: "medium" },
  { title: "Portrétní Retuš", category: "RAW Retouching", gradient: "from-rose-500 via-pink-600 to-purple-700", size: "small" },
  { title: "Brand Identity", category: "Grafický Design", gradient: "from-amber-500 via-orange-600 to-red-600", size: "medium" },
  { title: "E-shop Landing Page", category: "Web Design", gradient: "from-emerald-500 via-teal-600 to-cyan-700", size: "large" },
  { title: "Event Coverage", category: "Fotografie", gradient: "from-blue-600 via-indigo-700 to-violet-800", size: "small" },
  { title: "Firemní Video", category: "Video Editing", gradient: "from-cyan-400 via-sky-600 to-blue-800", size: "medium" },
]

export const navLinks = [
  { label: "Showreel", href: "#showreel" },
  { label: "Služby", href: "#sluzby" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Ceník", href: "#cenik" },
  { label: "O mně", href: "#o-mne" },
  { label: "Kontakt", href: "#kontakt" },
]

export const socials = {
  instagram: "@matthewslab",
  instagramUrl: "https://instagram.com/matthewslab",
  email: "ahoj@matthewslab.cz",
}
