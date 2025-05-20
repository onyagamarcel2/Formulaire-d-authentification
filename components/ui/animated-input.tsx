"use client"

import type React from "react"
import { useState, forwardRef, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeOff, CheckCircle2 } from "lucide-react"

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  error?: string
  success?: boolean
}

const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ className, type, icon, error, success, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(!!props.value)
    const inputRef = useRef<HTMLInputElement>(null)

    const isPassword = type === "password"
    const inputType = isPassword ? (showPassword ? "text" : "password") : type

    useEffect(() => {
      setHasValue(!!props.value)
    }, [props.value])

    return (
      <div className="space-y-1 w-full">
        <div
          className={cn(
            "relative flex items-center rounded-md border transition-all duration-300",
            isFocused && "ring-2 ring-primary/30 border-primary/50",
            error ? "border-destructive" : success ? "border-green-500" : "border-input",
            "glass-input shadow-sm",
            isFocused && "shadow-md",
            className,
          )}
          onClick={() => inputRef.current?.focus()}
        >
          {icon && (
            <div
              className={cn(
                "absolute left-3 flex h-full items-center justify-center text-gray-400 transition-colors duration-300",
                isFocused && "text-primary",
              )}
            >
              {icon}
            </div>
          )}
          <input
            type={inputType}
            className={cn(
              "flex h-11 w-full rounded-md bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
              icon && "pl-10",
              isPassword && "pr-10",
            )}
            ref={(node) => {
              // Forward the ref
              if (typeof ref === "function") {
                ref(node)
              } else if (ref) {
                ref.current = node
              }
              inputRef.current = node
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => {
              setHasValue(!!e.target.value)
              props.onChange?.(e)
            }}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setShowPassword(!showPassword)
              }}
              className="absolute right-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 focus:outline-none transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
          {success && !error && (
            <div className="absolute right-3 text-green-500 animate-scale-in">
              <CheckCircle2 size={18} />
            </div>
          )}

          {isFocused && (
            <span
              className="absolute bottom-0 left-0 h-0.5 bg-primary animate-scale-in"
              style={{ width: hasValue ? "100%" : "0%", transition: "width 0.3s ease" }}
            ></span>
          )}
        </div>
        {error && <p className="text-xs text-destructive animate-slideUp">{error}</p>}
      </div>
    )
  },
)

AnimatedInput.displayName = "AnimatedInput"

export { AnimatedInput }
