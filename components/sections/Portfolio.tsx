"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import SectionHeading from "@/components/ui/SectionHeading"
import Lightbox from "@/components/ui/Lightbox"
import { portfolioItems, type PortfolioItem } from "@/lib/data"

const sizeToHeight: Record<PortfolioItem["size"], string> = {
  small: "h-64",
  medium: "h-80",
  large: "h-[26rem]",
}

export default function Portfolio() {
  const [active, setActive] = useState<PortfolioItem | null>(null)

  return (
    <section id="portfolio" className="relative bg-background px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Vybraná práce"
          title="Portfolio napříč formáty"
          description="Výběr z projektů pro firmy, podcasty a osobní brandy. Placeholder ukázky — nahraďte reálnými case studies."
        />

        <div className="mt-16 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {portfolioItems.map((item, i) => (
            <motion.button
              key={item.title}
              onClick={() => setActive(item)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              data-cursor="hover"
              className={`group relative block w-full overflow-hidden rounded-2xl border border-white/10 text-left ${sizeToHeight[item.size]}`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-transform duration-700 group-hover:scale-110`}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/80 to-transparent p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="font-mono text-xs uppercase tracking-widest text-white/70">
                  {item.category}
                </p>
                <p className="font-display text-lg text-white">{item.title}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox open={Boolean(active)} onClose={() => setActive(null)}>
        {active && (
          <div
            className={`flex aspect-video w-[min(90vw,64rem)] flex-col items-center justify-center gap-3 rounded-2xl bg-gradient-to-br ${active.gradient} p-10 text-center`}
          >
            <p className="font-mono text-xs uppercase tracking-widest text-white/70">
              {active.category}
            </p>
            <p className="font-display text-3xl text-white">{active.title}</p>
            <p className="max-w-md text-sm text-white/70">
              Zde se zobrazí reálná fotka nebo video z projektu po nahrazení
              placeholderu.
            </p>
          </div>
        )}
      </Lightbox>
    </section>
  )
}
