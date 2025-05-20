"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, User, Lock, AlertCircle, ArrowLeft, ArrowRight, Check, Shield, UserCircle, X } from "lucide-react"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedInput } from "@/components/ui/animated-input"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Toast } from "@/components/ui/toast"
import { PasswordStrength } from "@/components/ui/password-strength"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RoleSelector } from "@/components/role-selector"
import { useFormValidation } from "@/hooks/use-form-validation"
import { AnimatedBackground } from "@/components/animated-background"

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState<"forward" | "backward">("forward")
  const [role, setRole] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showToast, setShowToast] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { fields, handleChange, handleBlur, validateForm, isFormValid } = useFormValidation(
    {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    {
      name: {
        required: true,
        minLength: 2,
      },
      email: {
        required: true,
        email: true,
      },
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

  const validateStep1 = () => {
    const fieldsToValidate = ["name", "email"]
    let isValid = true

    fieldsToValidate.forEach((fieldName) => {
      handleBlur(fieldName)
      if (fields[fieldName].error) {
        isValid = false
      }
    })

    return isValid
  }

  const validateStep2 = () => {
    const fieldsToValidate = ["password", "confirmPassword"]
    let isValid = true

    fieldsToValidate.forEach((fieldName) => {
      handleBlur(fieldName)
      if (fields[fieldName].error) {
        isValid = false
      }
    })

    if (!acceptTerms) {
      setError("Vous devez accepter les conditions d'utilisation")
      isValid = false
    } else {
      setError("")
    }

    return isValid
  }

  const validateStep3 = () => {
    if (!role) {
      setError("Veuillez sélectionner un rôle")
      return false
    }
    setError("")
    return true
  }

  const handleNextStep = () => {
    setError("")
    if (step === 1 && validateStep1()) {
      setDirection("forward")
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      setDirection("forward")
      setStep(3)
    }
  }

  const handlePrevStep = () => {
    setError("")
    if (step === 2) {
      setDirection("backward")
      setStep(1)
    } else if (step === 3) {
      setDirection("backward")
      setStep(2)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateStep3()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setShowToast(true)
      // Redirect would happen here
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
          >
            <Logo className="text-4xl" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-xl overflow-hidden shadow-xl"
        >
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold dark:text-white">Créer un compte</h1>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-2">Étape {step}/3</span>
                <div className="flex space-x-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-2 w-8 rounded-full transition-all duration-300 ${
                        i === step ? "bg-primary" : i < step ? "bg-primary/50" : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    />
                  ))}
                </div>
              </div>
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

            <form onSubmit={handleSubmit} className="relative overflow-hidden min-h-[380px]">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: direction === "forward" ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction === "forward" ? -50 : 50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <div className="flex justify-center mb-6">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-primary shadow-inner"
                      >
                        <UserCircle className="h-10 w-10" />
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="name" className="text-sm font-medium">
                        Nom
                      </Label>
                      <AnimatedInput
                        id="name"
                        placeholder="Dupont"
                        value={fields.name.value}
                        onChange={(e) => handleChange("name", e.target.value)}
                        onBlur={() => handleBlur("name")}
                        error={fields.name.touched ? fields.name.error || "" : ""}
                        success={fields.name.touched && !fields.name.error}
                        required
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
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
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <AnimatedButton type="button" className="w-full mt-6" onClick={handleNextStep}>
                        Continuer
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </AnimatedButton>
                    </motion.div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: direction === "forward" ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction === "forward" ? -50 : 50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <div className="flex justify-center mb-6">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-primary shadow-inner"
                      >
                        <Shield className="h-10 w-10" />
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="password" className="text-sm font-medium">
                        Mot de passe
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
                      className="flex items-start space-x-2 py-2"
                    >
                      <Checkbox
                        id="terms"
                        checked={acceptTerms}
                        onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-1"
                      />
                      <Label htmlFor="terms" className="text-sm font-normal">
                        J'accepte les{" "}
                        <Link href="/terms" className="text-primary hover:underline">
                          conditions d'utilisation
                        </Link>{" "}
                        et la{" "}
                        <Link href="/privacy" className="text-primary hover:underline">
                          politique de confidentialité
                        </Link>
                      </Label>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="flex space-x-3 pt-4"
                    >
                      <AnimatedButton type="button" variant="outline" className="flex-1" onClick={handlePrevStep}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour
                      </AnimatedButton>
                      <AnimatedButton type="button" className="flex-1" onClick={handleNextStep}>
                        Continuer
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </AnimatedButton>
                    </motion.div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: direction === "forward" ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction === "forward" ? -50 : 50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <div className="flex justify-center mb-6">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-primary shadow-inner"
                      >
                        <User className="h-10 w-10" />
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="space-y-2"
                    >
                      <Label className="text-sm font-medium">Sélectionnez votre rôle</Label>
                      <RoleSelector value={role} onChange={setRole} className="mt-2" />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="flex space-x-3 pt-6"
                    >
                      <AnimatedButton type="button" variant="outline" className="flex-1" onClick={handlePrevStep}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour
                      </AnimatedButton>
                      <AnimatedButton type="submit" className="flex-1" isLoading={isLoading}>
                        S'inscrire
                      </AnimatedButton>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          <div className="glass-footer px-8 py-4 text-center">
            <p className="text-sm">
              Déjà un compte?{" "}
              <Link href="/login" className="text-primary font-medium hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {showToast && <Toast message="Compte créé avec succès!" type="success" onClose={() => setShowToast(false)} />}
    </div>
  )
}
