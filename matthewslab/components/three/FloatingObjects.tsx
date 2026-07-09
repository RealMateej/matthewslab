"use client"

import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Float, MeshDistortMaterial, RoundedBox, Torus, Sphere } from "@react-three/drei"
import * as THREE from "three"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

export default function FloatingObjects() {
  const group = useRef<THREE.Group>(null!)
  const { pointer } = useThree()
  const reducedMotion = usePrefersReducedMotion()

  useFrame((_, delta) => {
    if (reducedMotion || !group.current) return
    const targetX = pointer.x * 0.5
    const targetY = pointer.y * 0.3
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetX, 4, delta)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -targetY, 4, delta)
  })

  const sphere = (
    <Sphere args={[1.05, 64, 64]} position={[-2.3, 0.5, 0]}>
      <MeshDistortMaterial
        color="#22D3EE"
        emissive="#0E7490"
        emissiveIntensity={0.5}
        distort={0.3}
        speed={reducedMotion ? 0 : 1.8}
        roughness={0.15}
        metalness={0.4}
      />
    </Sphere>
  )

  const cube = (
    <RoundedBox args={[1.25, 1.25, 1.25]} radius={0.14} smoothness={4} position={[2.1, -0.5, -1]}>
      <meshPhysicalMaterial
        color="#A855F7"
        roughness={0.1}
        metalness={0.1}
        transmission={0.85}
        thickness={1.2}
        ior={1.3}
        emissive="#6D28D9"
        emissiveIntensity={0.2}
      />
    </RoundedBox>
  )

  const ringLarge = (
    <Torus args={[1, 0.07, 32, 128]} position={[0.3, 1.7, -2]} rotation={[Math.PI / 2.3, 0, 0]}>
      <meshStandardMaterial color="#6366F1" emissive="#4338CA" emissiveIntensity={1.1} roughness={0.25} metalness={0.7} />
    </Torus>
  )

  const ringSmall = (
    <Torus args={[0.55, 0.045, 32, 128]} position={[-1.7, -1.5, -1.4]} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
      <meshStandardMaterial color="#22D3EE" emissive="#0891B2" emissiveIntensity={1.1} roughness={0.25} metalness={0.7} />
    </Torus>
  )

  return (
    <group ref={group}>
      {reducedMotion ? (
        <>
          {sphere}
          {cube}
          {ringLarge}
          {ringSmall}
        </>
      ) : (
        <>
          <Float speed={1.3} rotationIntensity={0.5} floatIntensity={1.1}>
            {sphere}
          </Float>
          <Float speed={1.7} rotationIntensity={0.9} floatIntensity={1.4}>
            {cube}
          </Float>
          <Float speed={1} rotationIntensity={0.7} floatIntensity={0.9}>
            {ringLarge}
          </Float>
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.2}>
            {ringSmall}
          </Float>
        </>
      )}
    </group>
  )
}
