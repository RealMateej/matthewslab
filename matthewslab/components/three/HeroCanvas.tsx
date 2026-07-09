"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import FloatingObjects from "./FloatingObjects"

export default function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7.5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[6, 5, 6]} intensity={70} color="#22D3EE" />
        <pointLight position={[-6, -4, 4]} intensity={55} color="#A855F7" />
        <FloatingObjects />
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.55} luminanceThreshold={0.2} luminanceSmoothing={0.9} mipmapBlur />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}
