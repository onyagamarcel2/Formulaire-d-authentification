"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToastProps {
  message: string
  type?: "success" | "error" | "info"
  duration?: number
  onClose?: () => void
}

export function Toast({ message, type = "info", duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onClose) onClose()
    }, duration)

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - 100 / (duration / 100)
        return newProgress < 0 ? 0 : newProgress
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [duration, onClose])

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 flex w-full max-w-md animate-slide-up items-center justify-between rounded-lg p-4 shadow-lg",
        type === "success" && "bg-green-500 text-white dark:bg-green-600",
        type === "error" && "bg-destructive text-white",
        type === "info" && "bg-primary text-white",
      )}
    >
      <p>{message}</p>
      <button
        onClick={() => {
          setIsVisible(false)
          if (onClose) onClose()
        }}
        className="ml-4 rounded-full p-1 hover:bg-black/10"
      >
        <X size={16} />
      </button>
      <div
        className="absolute bottom-0 left-0 h-1 bg-white/30"
        style={{ width: `${progress}%`, transition: "width 100ms linear" }}
      />
    </div>
  )
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function ToastViewport() {
  return null
}

export function ToastTitle({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>
}

export function ToastDescription({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>
}

export function ToastClose() {
  return null
}

export function ToastAction() {
  return null
}
