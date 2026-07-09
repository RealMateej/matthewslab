"use client"

import { motion } from "framer-motion"
import SectionHeading from "@/components/ui/SectionHeading"

const stats = [
  { value: "50+", label: "Odbavených projektů" },
  { value: "30+", label: "Spokojených klientů" },
  { value: "5+", label: "Let praxe v oboru" },
]

export default function About() {
  return (
    <section id="o-mne" className="relative overflow-hidden bg-background px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative order-2 aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 lg:order-1"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/25 via-slate-900 to-neon-purple/25" />
          <div className="absolute inset-0 bg-grain opacity-[0.06]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-6xl font-semibold text-white/20">ML</span>
          </div>
          <p className="absolute bottom-5 left-5 font-mono text-xs text-white/40">
            [ fotka / portrét — nahraďte placeholder ]
          </p>
        </motion.div>

        <div className="order-1 lg:order-2">
          <SectionHeading eyebrow="O mně" title="Kreativec, který nedělá kompromisy" />

          <p className="mt-6 text-lg leading-relaxed text-white/60">
            Jsem mladý kreativní editor a designer stojící za MatthewsLab.
            Spojuji střih videa, fotografii a design do jednoho konzistentního
            výsledku — bez zbytečných kol schvalování a bez ztráty kvality.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-white/60">
            Důraz na kvalitu, rychlost dodání a moderní vizuální styl je to,
            co odlišuje obsah, který jen „existuje“, od obsahu, který
            skutečně pracuje pro vaši značku.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl font-semibold text-white">{stat.value}</p>
                <p className="mt-1 text-xs text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
