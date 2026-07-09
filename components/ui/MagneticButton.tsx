"use client"

import { useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: "button" | "submit"
  disabled?: boolean
}

export default function MagneticButton({
  children,
  className,
  onClick,
  type = "button",
  disabled,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.2 })
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.2 })

  function handleMouseMove(event: React.MouseEvent<HTMLButtonElement>) {
    if (window.matchMedia("(pointer: coarse)").matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - rect.left - rect.width / 2) * 0.35)
    y.set((event.clientY - rect.top - rect.height / 2) * 0.5)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      data-cursor="hover"
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-white/15 bg-white/5 px-8 py-4 font-display text-sm font-medium uppercase tracking-wider text-white backdrop-blur-md transition-colors duration-300 hover:border-neon-blue/60 disabled:opacity-50",
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-neon-blue/20 via-neon-purple/20 to-neon-blue/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.button>
  )
}
