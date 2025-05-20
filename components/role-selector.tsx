"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { Shield, Code, LineChart } from "lucide-react"
import { useState } from "react"

interface RoleOption {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

interface RoleSelectorProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function RoleSelector({ value, onChange, className }: RoleSelectorProps) {
  const [hoveredRole, setHoveredRole] = useState<string | null>(null)

  const roles: RoleOption[] = [
    {
      id: "admin",
      title: "Administrateur",
      description: "Gérez les utilisateurs et les paramètres système",
      icon: <Shield className="h-6 w-6" />,
    },
    {
      id: "security",
      title: "Analyste Sécurité",
      description: "Analysez et gérez les risques de sécurité",
      icon: <LineChart className="h-6 w-6" />,
    },
    {
      id: "developer",
      title: "Développeur",
      description: "Créez et maintenez des applications",
      icon: <Code className="h-6 w-6" />,
    },
  ]

  return (
    <div className={cn("space-y-4", className)}>
      {roles.map((role) => (
        <div
          key={role.id}
          className={cn(
            "relative flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 glass-input",
            value === role.id
              ? "border-primary bg-primary/5 dark:bg-primary/10 shadow-md"
              : hoveredRole === role.id
                ? "border-primary/50 shadow-sm"
                : "border-gray-200 dark:border-gray-700",
          )}
          onClick={() => onChange(role.id)}
          onMouseEnter={() => setHoveredRole(role.id)}
          onMouseLeave={() => setHoveredRole(null)}
        >
          <div
            className={cn(
              "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-all duration-300",
              value === role.id
                ? "bg-primary text-white animate-pulse-subtle"
                : hoveredRole === role.id
                  ? "bg-primary/20 text-primary"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
            )}
          >
            {role.icon}
          </div>
          <div className="flex-grow">
            <h3
              className={cn(
                "font-medium transition-colors duration-300",
                value === role.id ? "text-primary" : hoveredRole === role.id ? "text-primary/80" : "",
              )}
            >
              {role.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{role.description}</p>
          </div>
          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 right-4 w-5 h-5 rounded-full border-2 transition-all duration-300",
              value === role.id
                ? "border-primary bg-primary scale-110"
                : hoveredRole === role.id
                  ? "border-primary/50"
                  : "border-gray-300 dark:border-gray-600",
            )}
          >
            {value === role.id && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white w-full h-full p-0.5 animate-scale-in"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
