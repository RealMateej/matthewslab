"use client"

import { useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ChevronDown } from "lucide-react"
import MagneticButton from "@/components/ui/MagneticButton"
import { useLenis } from "@/components/layout/SmoothScroll"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
})

const HEADLINE = "MatthewsLab"

export default function Hero() {
  const lenis = useLenis()
  const sectionRef = useRef<HTMLElement>(null)
  const canvasLayerRef = useRef<HTMLDivElement>(null)
  const auroraRef = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  function goToContact() {
    if (lenis) lenis.scrollTo("#kontakt", { offset: -60 })
    else document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" })
  }

  // GSAP ScrollTrigger — vrstvený scroll parallax (nezávislý na mouse-parallaxu 3D scény)
  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(canvasLayerRef.current, {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      gsap.to(auroraRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-background"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0" ref={auroraRef}>
        <div className="absolute left-1/4 top-1/4 h-[36rem] w-[36rem] animate-aurora rounded-full bg-neon-blue/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[36rem] w-[36rem] animate-aurora-slow rounded-full bg-neon-purple/20 blur-[120px]" />
        <div className="absolute inset-0 bg-grain opacity-[0.04]" />
      </div>

      <div className="absolute inset-0" ref={canvasLayerRef}>
        <HeroCanvas />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 font-mono text-xs uppercase tracking-[0.4em] text-white/50"
        >
          [ Video · Foto · Design · Web ]
        </motion.p>

        <h1 className="font-display text-[15vw] font-semibold leading-[0.9] tracking-tight text-white sm:text-[11vw] lg:text-[8.5vw]">
          {HEADLINE.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: "0%" }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-8 max-w-xl text-lg text-white/60 sm:text-xl"
        >
          Kreativní studio pro firmy, influencery a osobní brandy. Střih videa,
          reels, podcasty, fotografie a weby, které vypadají draze.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-10"
        >
          <MagneticButton onClick={goToContact}>Spolupracovat</MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-white/40"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={22} />
        </motion.div>
      </motion.div>
    </section>
  )
}
