"use client"

import { useTheme } from "@/components/theme-provider"
import { useEffect, useState } from "react"

export function AuthBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50 via-white to-white dark:from-gray-900 dark:via-gray-950 dark:to-black transition-colors duration-500"></div>
      <div className="absolute inset-0 bg-auth-pattern opacity-70"></div>

      {/* Decorative elements */}
      <div className="absolute top-[10%] left-[15%] w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[20%] right-[10%] w-72 h-72 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>

      {/* Animated dots */}
      <div className="absolute top-[30%] right-[20%] w-2 h-2 rounded-full bg-primary/40 animate-pulse-subtle"></div>
      <div
        className="absolute bottom-[40%] left-[25%] w-3 h-3 rounded-full bg-primary/30 animate-pulse-subtle"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-[60%] right-[30%] w-2 h-2 rounded-full bg-primary/40 animate-pulse-subtle"
        style={{ animationDelay: "1.5s" }}
      ></div>
    </div>
  )
}
