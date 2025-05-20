"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Lock, AlertCircle, ArrowLeft, Check, X } from "lucide-react"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedInput } from "@/components/ui/animated-input"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Toast } from "@/components/ui/toast"
import { PasswordStrength } from "@/components/ui/password-strength"
import { Label } from "@/components/ui/label"
import { useFormValidation } from "@/hooks/use-form-validation"
import { AnimatedBackground } from "@/components/animated-background"

export default function NewPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showToast, setShowToast] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { fields, handleChange, handleBlur, validateForm, isFormValid } = useFormValidation(
    {
      password: "",
      confirmPassword: "",
    },
    {
      password: {
        required: true,
        minLength: 8,
        customValidator: (value) => {
          if (!/[A-Z]/.test(value)) {
            return "Le mot de passe doit contenir au moins une majuscule"
          }
          if (!/[0-9]/.test(value)) {
            return "Le mot de passe doit contenir au moins un chiffre"
          }
          return null
        },
      },
      confirmPassword: {
        required: true,
        match: "password",
      },
    },
  )

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSuccess(true)
      setShowToast(true)
      // Redirect would happen here after a delay
      setTimeout(() => {
        // window.location.href = "/login"
      }, 3000)
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <AnimatedBackground />

      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md animate-fade-in-up z-10">
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="animate-float"
          >
            <Logo className="text-4xl animate-scale-in" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-xl overflow-hidden shadow-xl animate-glow"
        >
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-center mb-2 dark:text-white">Créer un nouveau mot de passe</h1>
            <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
              Choisissez un mot de passe fort pour sécuriser votre compte
            </p>

            <div className="flex justify-center mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-primary shadow-inner"
              >
                <Lock className="h-10 w-10" />
              </motion.div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md flex items-center text-sm text-red-600 dark:text-red-400"
              >
                <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="flex-grow">{error}</span>
                <button onClick={() => setError("")} className="text-red-500 hover:text-red-700">
                  <X size={16} />
                </button>
              </motion.div>
            )}

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4 p-6"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400">
                    <Check className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-medium dark:text-white">Mot de passe réinitialisé</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Votre mot de passe a été réinitialisé avec succès. Vous allez être redirigé vers la page de connexion.
                </p>
                <AnimatedButton type="button" className="w-full mt-4" onClick={() => (window.location.href = "/login")}>
                  Aller à la connexion
                </AnimatedButton>
              </motion.div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="space-y-2"
                >
                  <Label htmlFor="password" className="text-sm font-medium">
                    Nouveau mot de passe
                  </Label>
                  <AnimatedInput
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    icon={<Lock className="h-4 w-4" />}
                    value={fields.password.value}
                    onChange={(e) => handleChange("password", e.target.value)}
                    onBlur={() => handleBlur("password")}
                    error={fields.password.touched ? fields.password.error || "" : ""}
                    success={fields.password.touched && !fields.password.error}
                    required
                  />
                  <PasswordStrength password={fields.password.value} className="mt-2" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="space-y-2"
                >
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirmer le mot de passe
                  </Label>
                  <AnimatedInput
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    icon={<Lock className="h-4 w-4" />}
                    value={fields.confirmPassword.value}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    onBlur={() => handleBlur("confirmPassword")}
                    error={fields.confirmPassword.touched ? fields.confirmPassword.error || "" : ""}
                    success={fields.confirmPassword.touched && !fields.confirmPassword.error}
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <AnimatedButton type="submit" className="w-full mt-6" isLoading={isLoading}>
                    Réinitialiser le mot de passe
                  </AnimatedButton>
                </motion.div>
              </form>
            )}
          </div>

          <div className="glass-footer px-8 py-4 text-center">
            <Link href="/login" className="flex items-center justify-center text-primary font-medium hover:underline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la connexion
            </Link>
          </div>
        </motion.div>
      </div>

      {showToast && (
        <Toast message="Mot de passe réinitialisé avec succès!" type="success" onClose={() => setShowToast(false)} />
      )}
    </div>
  )
}
