"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface PasswordStrengthProps {
  password: string
  className?: string
}

export function PasswordStrength({ password, className }: PasswordStrengthProps) {
  const [strength, setStrength] = useState(0)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!password) {
      setStrength(0)
      setMessage("")
      return
    }

    let score = 0

    // Length check
    if (password.length >= 8) score += 1
    if (password.length >= 12) score += 1

    // Character variety checks
    if (/[A-Z]/.test(password)) score += 1
    if (/[a-z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1

    // Normalize to 0-4 scale
    const normalizedScore = Math.min(4, Math.floor(score / 1.5))
    setStrength(normalizedScore)

    // Set message based on strength
    switch (normalizedScore) {
      case 0:
        setMessage("Très faible")
        break
      case 1:
        setMessage("Faible")
        break
      case 2:
        setMessage("Moyen")
        break
      case 3:
        setMessage("Fort")
        break
      case 4:
        setMessage("Très fort")
        break
      default:
        setMessage("")
    }
  }, [password])

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex h-2 w-full space-x-1 rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={cn(
            "transition-all duration-300 ease-in-out rounded-full",
            strength >= 1 && "bg-red-500",
            strength >= 2 && "bg-yellow-500",
            strength >= 3 && "bg-green-500",
            strength >= 4 && "bg-green-600",
          )}
          style={{ width: `${(strength / 4) * 100}%` }}
        />
      </div>
      {message && (
        <p
          className={cn(
            "text-xs transition-all",
            strength === 0 && "text-red-500",
            strength === 1 && "text-red-500",
            strength === 2 && "text-yellow-500",
            strength === 3 && "text-green-500",
            strength === 4 && "text-green-600",
          )}
        >
          {message}
        </p>
      )}
    </div>
  )
}
