"use client"

import { useTheme } from "@/components/theme-provider"

export function Logo({ className = "" }: { className?: string }) {
  const { theme } = useTheme()

  return (
    <div className={`flex items-center text-2xl font-bold ${className}`}>
      <span className="text-primary">O</span>
      <span className="text-gray-700 dark:text-gray-300">'</span>
      <span className={theme === "dark" ? "text-white" : "text-black"}>test</span>
      <span className="text-primary ml-0.5">.</span>
    </div>
  )
}
