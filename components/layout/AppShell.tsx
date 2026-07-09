"use client"

import { useEffect, useState } from "react"
import Preloader from "./Preloader"
import Navbar from "./Navbar"
import Footer from "./Footer"
import CustomCursor from "./CustomCursor"
import SmoothScroll from "./SmoothScroll"
import TimecodeHUD from "@/components/ui/TimecodeHUD"

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.documentElement.style.overflow = loading ? "hidden" : ""
    return () => {
      document.documentElement.style.overflow = ""
    }
  }, [loading])

  return (
    <SmoothScroll>
      <Preloader onFinish={() => setLoading(false)} />
      <div
        aria-hidden={loading}
        className={loading ? "pointer-events-none opacity-0" : "opacity-100"}
        style={{ transition: "opacity 0.6s ease" }}
      >
        <CustomCursor />
        <TimecodeHUD />
        <Navbar />
        <main id="top">{children}</main>
        <Footer />
      </div>
    </SmoothScroll>
  )
}
