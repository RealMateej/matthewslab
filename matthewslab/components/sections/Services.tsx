"use client"

import { motion } from "framer-motion"
import SectionHeading from "@/components/ui/SectionHeading"
import SpotlightCard from "@/components/ui/SpotlightCard"
import { services } from "@/lib/data"

export default function Services() {
  return (
    <section id="sluzby" className="relative bg-background px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Co děláme"
          title="Služby, které pokryjí celý obsah vaší značky"
          description="Od prvního záběru po nasazený web — vše na jednom místě, v jednotném stylu a bez kompromisů v kvalitě."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              >
                <SpotlightCard className="h-full">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-neon-blue/30 bg-neon-blue/10 text-neon-blue">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">
                    {service.description}
                  </p>
                </SpotlightCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
