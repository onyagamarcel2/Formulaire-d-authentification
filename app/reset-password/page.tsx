"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, AlertCircle, ArrowLeft, Check, KeyRound, X } from "lucide-react"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedInput } from "@/components/ui/animated-input"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Toast } from "@/components/ui/toast"
import { Label } from "@/components/ui/label"
import { useFormValidation } from "@/hooks/use-form-validation"
import { AnimatedBackground } from "@/components/animated-background"

export default function ResetPasswordPage() {
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showToast, setShowToast] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { fields, handleChange, handleBlur, validateForm, isFormValid } = useFormValidation(
    {
      email: "",
    },
    {
      email: {
        required: true,
        email: true,
      },
    },
  )

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsEmailSent(true)
      setResendTimer(60)
      setShowToast(true)

      // Start countdown timer
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendLink = async () => {
    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setResendTimer(60)
      setShowToast(true)

      // Start countdown timer
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
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
            <AnimatePresence mode="wait">
              {!isEmailSent ? (
                <motion.div
                  key="request-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="text-2xl font-bold text-center mb-2 dark:text-white">Mot de passe oublié</h1>
                  <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
                    Entrez votre email pour recevoir un lien de réinitialisation
                  </p>

                  <div className="flex justify-center mb-8">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-primary shadow-inner"
                    >
                      <KeyRound className="h-10 w-10" />
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

                  <form onSubmit={handleRequestReset} className="space-y-5">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email
                      </Label>
                      <AnimatedInput
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        icon={<Mail className="h-4 w-4" />}
                        value={fields.email.value}
                        onChange={(e) => handleChange("email", e.target.value)}
                        onBlur={() => handleBlur("email")}
                        error={fields.email.touched ? fields.email.error || "" : ""}
                        success={fields.email.touched && !fields.email.error}
                        required
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <AnimatedButton type="submit" className="w-full mt-6" isLoading={isLoading}>
                        Envoyer le lien de réinitialisation
                      </AnimatedButton>
                    </motion.div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="text-2xl font-bold text-center mb-2 dark:text-white">Vérifiez votre email</h1>
                  <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
                    Nous avons envoyé un lien de réinitialisation à{" "}
                    <span className="font-medium text-primary">{fields.email.value}</span>
                  </p>

                  <div className="flex justify-center mb-8">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="relative"
                    >
                      <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400 shadow-inner">
                        <Mail className="h-10 w-10" />
                      </div>
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
                        className="absolute -top-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white shadow-md"
                      >
                        <Check className="h-5 w-5" />
                      </motion.div>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="glass-input rounded-lg p-5 mb-6"
                  >
                    <h3 className="font-medium mb-3 dark:text-white">Instructions:</h3>
                    <ul className="text-sm space-y-3 text-gray-600 dark:text-gray-300">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                          1
                        </div>
                        <span>Vérifiez votre boîte de réception et vos spams</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                          2
                        </div>
                        <span>Cliquez sur le lien dans l'email</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                          3
                        </div>
                        <span>Créez votre nouveau mot de passe</span>
                      </li>
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center space-y-4"
                  >
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {resendTimer > 0
                        ? `Vous pourrez demander un nouveau lien dans ${resendTimer} secondes`
                        : "Vous n'avez pas reçu l'email?"}
                    </p>

                    <AnimatedButton
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={handleResendLink}
                      disabled={resendTimer > 0 || isLoading}
                      isLoading={isLoading}
                    >
                      Renvoyer le lien
                    </AnimatedButton>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
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
        <Toast
          message={isEmailSent ? "Email envoyé avec succès!" : ""}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  )
}
