"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(true)
  const [hovering, setHovering] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 })
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 })

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches
    setIsTouch(coarse)
    if (coarse) return

    function handleMove(e: MouseEvent) {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      const target = e.target as HTMLElement
      setHovering(Boolean(target.closest("[data-cursor='hover']")))
    }

    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [cursorX, cursorY])

  if (isTouch) return null

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
    >
      <motion.div
        animate={{ width: hovering ? 64 : 12, height: hovering ? 64 : 12 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
      />
    </motion.div>
  )
}
