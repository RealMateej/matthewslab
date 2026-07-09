# MatthewsLab — portfolio web

Futuristické, cinematic portfolio pro kreativní studio MatthewsLab (video editing,
reels, podcast editing, fotografie, RAW retuš, grafický design, web design).

Next.js 15 · TypeScript · Tailwind CSS v4 · Framer Motion · React Three Fiber ·
Lenis · GSAP ScrollTrigger.

## Rychlý start

```bash
npm install
npm run dev
```

Otevřete [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # produkční build (Turbopack)
npm run start   # spuštění produkčního buildu lokálně
npm run lint     # ESLint
```

> Poznámka: `npm run build` potřebuje připojení k `fonts.googleapis.com`
> (next/font si při buildu stahuje a self-hostuje Google Fonts — Space
> Grotesk, Inter, Space Mono). V běžném prostředí i na Vercelu to funguje
> bez zásahu.

## Struktura projektu

```
app/
  layout.tsx          Root layout, fonty, SEO metadata, JSON-LD
  page.tsx             Skládá všechny sekce
  globals.css          Tailwind v4 @theme tokeny, custom utility třídy
  sitemap.ts           Dynamický sitemap.xml
  robots.ts             robots.txt
  opengraph-image.tsx   Dynamicky generovaný OG obrázek
  icon.svg              Favicon (monogram)
  api/contact/route.ts   Zpracování kontaktního formuláře

components/
  layout/               AppShell, Navbar, Footer, Preloader, CustomCursor,
                         SmoothScroll (Lenis + GSAP ScrollTrigger provider)
  sections/              Hero, Showreel, Services, Portfolio, Pricing,
                         About, Contact — jedna komponenta na sekci
  three/                  HeroCanvas + FloatingObjects (R3F scéna v Hero)
  ui/                     MagneticButton, SpotlightCard, SectionHeading,
                         Lightbox, TimecodeHUD

lib/
  data.ts                Veškerý textový obsah — služby, ceník, portfolio
  utils.ts                cn() helper (clsx + tailwind-merge)

hooks/
  usePrefersReducedMotion.ts
```

## Co doplnit před spuštěním do provozu

Web je plně funkční a nasaditelný hned teď, ale obsahuje záměrné
placeholdery, které je potřeba nahradit reálným obsahem:

- **Showreel video** — `components/sections/Showreel.tsx`. Vložte
  `public/videos/showreel.mp4` a nahraďte placeholder div tagem `<video>`
  (přesné místo je okomentované přímo v souboru).
- **Portfolio** — `lib/data.ts` (`portfolioItems`). Gradientové placeholdery
  nahraďte reálnými fotkami/videi z projektů (`next/image` nebo `<video>`).
- **Fotka v sekci O mně** — `components/sections/About.tsx`.
- **Kontakt** — `lib/data.ts` (`socials`): Instagram handle a e-mail jsou
  placeholdery (`@matthewslab`, `ahoj@matthewslab.cz`) — upravte na reálné.
- **Odesílání e-mailu z formuláře** — `app/api/contact/route.ts` aktuálně
  jen loguje poptávku do konzole. V souboru je hotové TODO pro napojení
  např. na [Resend](https://resend.com) — stačí odkomentovat a doplnit
  `RESEND_API_KEY` do `.env.local` (šablona v `.env.example`).
- **Statistiky v sekci O mně** — `components/sections/About.tsx`
  (`50+`, `30+`, `5+`) jsou orientační, nahraďte reálnými čísly.
- **Doména** — `https://matthewslab.cz` je použita v `app/layout.tsx`,
  `app/sitemap.ts` a `app/robots.ts`. Nahraďte skutečnou doménou.

## Nasazení na Vercel

Žádná speciální konfigurace není potřeba — projekt je čistý Next.js App
Router build.

**Přes GitHub:** pushněte repozitář a v [vercel.com/new](https://vercel.com/new)
ho naimportujte — Vercel automaticky rozpozná Next.js a nastaví build.

**Přes CLI:**

```bash
npm i -g vercel
vercel
```

Pokud napojíte odesílání e-mailů, přidejte `RESEND_API_KEY` (nebo
ekvivalent) do Environment Variables v nastavení projektu na Vercelu.

## Poznámky k designu

- Barvy, fonty a animace (`animate-aurora`, spotlight efekt) jsou
  definované v `app/globals.css` přes Tailwind v4 `@theme inline` —
  žádný `tailwind.config.ts` není potřeba.
- Signature detail: `TimecodeHUD` (REC časovač vlevo dole) a mono-styled
  `[ eyebrow ]` popisky sekcí odkazují na produkční/kamerový vokabulář —
  schválně střídmé, aby nesoutěžily s hlavní 3D scénou v Hero.
- Neonové akcenty (`text-neon-blue`, `bg-neon-purple/10` …) jsou dostupné
  jako běžné Tailwind utility třídy díky `@theme` tokenům.

## Performance tipy (Awwwards-level animace bez propadu FPS)

Už zapracováno v kódu:

- **3D scéna se lazy-loaduje** přes `next/dynamic({ ssr: false })`
  (`components/sections/Hero.tsx`) — Three.js bundle se stáhne až v
  prohlížeči, ne při SSR.
- **`prefers-reduced-motion` je respektováno** na úrovni celého webu
  (`hooks/usePrefersReducedMotion.ts`) — vypíná mouse-parallax 3D objektů,
  GSAP scroll-parallax i Lenis smooth scroll pro uživatele, kteří animace
  nechtějí.
- **DPR cap** na 3D canvasu (`dpr={[1, 1.5]}` v `HeroCanvas.tsx`) — na
  Retina/4K displejích se nerenderuje zbytečně vysoké rozlišení.
- **Jeden sdílený `requestAnimationFrame` loop** — Lenis běží přes
  `gsap.ticker`, takže scroll a GSAP animace nesoupeří o vlastní rAF smyčky.
- **`next/font`** self-hostuje fonty bez layout shiftu (žádný FOUT/CLS).

Další doporučení při rozšiřování:

- Nové obrázky vždy přes `next/image` (automatický WebP/AVIF, lazy loading).
- Těžké sekce pod fold držte v `whileInView`/`viewport={{ once: true }}`
  (už použito ve všech sekcích) — animace se spustí jen jednou, ne při
  každém scrollu.
- Než web pošlete na Awwwards, zkontrolujte Core Web Vitals (LCP, CLS, INP)
  v Lighthouse — zejména po nahrazení placeholder videa/fotek reálnými
  soubory (komprese, správné rozměry).
- Nové GSAP ScrollTrigger animace přidávejte přes `gsap.context()` +
  `ctx.revert()` v cleanup funkci `useEffect` (viz `Hero.tsx`) — zabrání to
  duplicitním triggerům při hot-reloadu i při odmountování komponenty.

## SEO

- Kompletní metadata (title template, description, keywords, Open Graph,
  Twitter card) v `app/layout.tsx`.
- Dynamický OG obrázek (`app/opengraph-image.tsx`) se generuje automaticky
  bez nutnosti nahrávat statický soubor.
- `app/sitemap.ts` a `app/robots.ts` — po nasazení automaticky dostupné na
  `/sitemap.xml` a `/robots.txt`.
- JSON-LD `ProfessionalService` schema v `app/layout.tsx` pro lepší
  zobrazení ve vyhledávání.
- Sémantické nadpisy (`h1` v Hero, `h2` v každé sekci) a `lang="cs"`.
