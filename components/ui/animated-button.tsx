"use client"

import type React from "react"
import { forwardRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, children, isLoading, variant = "default", size = "default", ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
      <button
        className={cn(
          "relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background overflow-hidden",
          "active:scale-[0.98] hover:scale-[1.02] hover:shadow-md",
          variant === "default" &&
            "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/95 hover:to-primary",
          variant === "destructive" && "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          variant === "outline" && "border border-input glass-button hover:bg-accent hover:text-accent-foreground",
          variant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          variant === "ghost" && "hover:bg-accent hover:text-accent-foreground",
          variant === "link" && "underline-offset-4 hover:underline text-primary",
          size === "default" && "h-11 py-2 px-5",
          size === "sm" && "h-9 px-3 rounded-md text-xs",
          size === "lg" && "h-12 px-8 rounded-md text-base",
          size === "icon" && "h-10 w-10",
          className,
        )}
        ref={ref}
        disabled={isLoading || props.disabled}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {variant === "default" && isHovered && !isLoading && (
          <span className="absolute inset-0 w-full h-full overflow-hidden">
            <span className="absolute top-0 left-[40%] w-8 h-32 -translate-x-1/2 bg-white opacity-20 rotate-12 transition-all duration-1000 ease-out transform animate-shine"></span>
          </span>
        )}

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        ) : null}
        <span className={cn(isLoading && "opacity-0")}>{children}</span>
      </button>
    )
  },
)

AnimatedButton.displayName = "AnimatedButton"

export { AnimatedButton }
