"use client"

import { useTheme } from "@/components/theme-provider"
import { useEffect, useState, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedY: number
  opacity: number
  color: string
}

export function AnimatedBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)

  useEffect(() => {
    setMounted(true)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particlesRef.current = []
      const particleCount = Math.min(Math.floor(window.innerWidth * 0.05), 50)

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: canvas.height + Math.random() * 100,
          size: Math.random() * 4 + 1,
          speedY: Math.random() * 1 + 0.2,
          opacity: Math.random() * 0.5 + 0.1,
          color: `rgba(255, 122, 0, ${Math.random() * 0.5 + 0.1})`,
        })
      }
    }

    const drawParticles = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      if (theme === "dark") {
        gradient.addColorStop(0, "rgba(0, 0, 0, 1)")
        gradient.addColorStop(1, "rgba(30, 10, 0, 1)")
      } else {
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)")
        gradient.addColorStop(1, "rgba(255, 245, 235, 1)")
      }

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw particles
      particlesRef.current.forEach((particle, index) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fill()

        // Move particle up
        particle.y -= particle.speedY

        // Reset particle if it goes off screen
        if (particle.y < -10) {
          particle.y = canvas.height + 10
          particle.x = Math.random() * canvas.width
        }
      })

      ctx.globalAlpha = 1

      animationRef.current = requestAnimationFrame(drawParticles)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    drawParticles()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mounted, theme])

  if (!mounted) return null

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" style={{ pointerEvents: "none" }} />
}
