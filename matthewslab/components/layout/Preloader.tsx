"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

export default function Preloader({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const start = performance.now()
    const duration = 1400
    let frame: number

    function tick(now: number) {
      const elapsed = now - start
      const pct = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(pct)
      if (pct < 100) {
        frame = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setDone(true), 300)
      }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (!done) return
    const t = setTimeout(onFinish, 700)
    return () => clearTimeout(t)
  }, [done, onFinish])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-background"
        >
          <p className="font-display text-2xl tracking-tight text-white">
            Matthews<span className="text-neon-blue">Lab</span>
          </p>
          <div className="h-px w-48 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="font-mono text-xs tabular-nums tracking-widest text-white/40">
            {progress}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
