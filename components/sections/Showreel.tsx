"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play } from "lucide-react"
import SectionHeading from "@/components/ui/SectionHeading"
import Lightbox from "@/components/ui/Lightbox"

export default function Showreel() {
  const [open, setOpen] = useState(false)

  return (
    <section id="showreel" className="relative bg-background px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Showreel 2026" title="Podívejte se, jak pracujeme" />

        <motion.button
          onClick={() => setOpen(true)}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          data-cursor="hover"
          className="group relative mt-14 block aspect-video w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-800 via-slate-900 to-black"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
          <div
            aria-hidden
            className="absolute inset-0 opacity-30 mix-blend-screen"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 30%, #22D3EE 0%, transparent 45%), radial-gradient(circle at 75% 70%, #A855F7 0%, transparent 45%)",
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
              <Play size={26} className="ml-1 fill-white text-white" />
            </span>
          </div>

          <div className="absolute bottom-6 left-6 text-left">
            <p className="font-mono text-xs uppercase tracking-widest text-white/50">
              [ Showreel ]
            </p>
            <p className="font-display text-2xl text-white">Přehrát video</p>
          </div>
        </motion.button>

        <p className="mt-4 text-xs text-white/30">
          Poznámka: nahraďte tento placeholder reálným showreel videem — vložte
          soubor do <code className="text-white/50">public/videos/showreel.mp4</code>{" "}
          a upravte tuto komponentu.
        </p>
      </div>

     <Lightbox open={open} onClose={() => setOpen(false)}>
  <video
    controls
    autoPlay
    playsInline
    className="h-full w-[min(90vw,64rem)] rounded-2xl"
  >
    <source src="/videos/showreel.mp4" type="video/mp4" />
    Váš prohlížeč nepodporuje video.
  </video>
</Lightbox>
    </section>
  )
}
