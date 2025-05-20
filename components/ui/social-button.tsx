"use client"

import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface SocialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  isLoading?: boolean
  variant?: "primary" | "outline" | "ghost"
}

const SocialButton = forwardRef<HTMLButtonElement, SocialButtonProps>(
  ({ className, children, icon, isLoading, variant = "outline", ...props }, ref) => {
    return (
      <button
        className={cn(
          "relative flex w-full items-center justify-center space-x-2 rounded-md p-3 text-sm font-medium transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/30 active:scale-[0.98]",
          variant === "outline" && "border border-input bg-background hover:bg-accent",
          variant === "primary" && "bg-primary text-white hover:bg-primary/90",
          variant === "ghost" && "hover:bg-accent",
          className,
        )}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        <span className="flex-shrink-0">{icon}</span>
        <span>{children}</span>
      </button>
    )
  },
)

SocialButton.displayName = "SocialButton"

export { SocialButton }
