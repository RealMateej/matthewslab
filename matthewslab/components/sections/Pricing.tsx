"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import SectionHeading from "@/components/ui/SectionHeading"
import MagneticButton from "@/components/ui/MagneticButton"
import { pricingTiers } from "@/lib/data"
import { useLenis } from "@/components/layout/SmoothScroll"
import { cn } from "@/lib/utils"

export default function Pricing() {
  const lenis = useLenis()

  function goToContact() {
    if (lenis) lenis.scrollTo("#kontakt", { offset: -60 })
    else document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="cenik" className="relative bg-background px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Ceník"
          title="Transparentní ceny, prémiový výsledek"
          description="Orientační ceny pro nejčastější zakázky. U individuálních projektů připravíme nabídku na míru po krátké konzultaci."
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={cn(
                "relative flex flex-col rounded-3xl border p-8",
                tier.popular
                  ? "border-neon-blue/50 bg-gradient-to-b from-neon-blue/10 to-transparent lg:-translate-y-4"
                  : "border-white/10 bg-white/[0.02]"
              )}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-neon-blue px-4 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-background">
                  Nejoblíbenější
                </span>
              )}

              <h3 className="font-display text-lg font-semibold text-white">{tier.name}</h3>
              <p className="mt-4 font-display text-3xl font-semibold text-white">{tier.price}</p>
              <p className="font-mono text-xs text-white/40">{tier.unit}</p>
              <p className="mt-4 text-sm text-white/55">{tier.description}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-white/70">
                    <Check size={16} className="mt-0.5 shrink-0 text-neon-blue" />
                    {feature}
                  </li>
                ))}
              </ul>

              <MagneticButton
                onClick={goToContact}
                className={cn("mt-8 w-full", tier.popular && "border-neon-blue/60 bg-neon-blue/10")}
              >
                Nezávazná poptávka
              </MagneticButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
