"use client"

import { useEffect, useState } from "react"

function formatTimecode(ms: number) {
  const totalFrames = Math.floor(ms / (1000 / 24))
  const frames = totalFrames % 24
  const totalSeconds = Math.floor(ms / 1000)
  const seconds = totalSeconds % 60
  const minutes = Math.floor(totalSeconds / 60) % 60
  const hours = Math.floor(totalSeconds / 3600)
  const pad = (n: number) => n.toString().padStart(2, "0")
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`
}

export default function TimecodeHUD() {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const id = window.setInterval(() => {
      setElapsed(performance.now() - start)
    }, 1000 / 24)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="pointer-events-none fixed bottom-6 left-6 z-40 hidden items-center gap-2 rounded-full border border-white/10 bg-background/60 px-3 py-1.5 font-mono text-[11px] tracking-wider text-white/50 backdrop-blur-md sm:flex">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
      REC {formatTimecode(elapsed)}
    </div>
  )
}
