"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface StepTransitionProps {
  children: React.ReactNode
  show: boolean
  direction: "forward" | "backward"
  className?: string
}

export function StepTransition({ children, show, direction, className }: StepTransitionProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (show) {
      setMounted(true)
    }
  }, [show])

  const handleAnimationEnd = () => {
    if (!show) {
      setMounted(false)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div
      className={cn(
        "transition-all duration-500 absolute top-0 left-0 right-0 w-full",
        show
          ? direction === "forward"
            ? "animate-slide-in-right"
            : "animate-slide-in-left"
          : direction === "forward"
            ? "animate-slide-out-left"
            : "animate-slide-out-right",
        className,
      )}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </div>
  )
}
