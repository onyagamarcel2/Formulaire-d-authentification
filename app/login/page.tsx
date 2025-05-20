"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Mail, Lock, AlertCircle, Shield } from "lucide-react"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedInput } from "@/components/ui/animated-input"
import { AnimatedButton } from "@/components/ui/animated-button"
import { SocialButton } from "@/components/ui/social-button"
import { Divider } from "@/components/ui/divider"
import { Toast } from "@/components/ui/toast"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useFormValidation } from "@/hooks/use-form-validation"
import { AnimatedBackground } from "@/components/animated-background"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showToast, setShowToast] = useState(false)

  const { fields, handleChange, handleBlur, validateForm, isFormValid } = useFormValidation(
    {
      email: "",
      password: "",
    },
    {
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minLength: 6,
      },
    },
  )

  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) {
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

  const handleAzureLogin = () => {
    router.push("/azure-login")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <AnimatedBackground />

      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md animate-fade-in-up z-10">
        <div className="flex justify-center mb-8">
          <div className="animate-float">
            <Logo className="text-5xl animate-scale-in" />
          </div>
        </div>

        <div className="glass-card rounded-xl overflow-hidden animate-glow shadow-xl">
          <div className="p-6 sm:p-8">
            <h1 className="text-3xl font-bold text-center mb-2 dark:text-white">Bienvenue</h1>
            <p className="text-center text-gray-500 dark:text-gray-400 mb-8">Connectez-vous à votre compte O'test</p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md flex items-center text-sm text-red-600 dark:text-red-400 animate-scale-in">
                <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
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
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Mot de passe
                  </Label>
                  <Link href="/reset-password" className="text-xs text-primary hover:underline transition-all">
                    Mot de passe oublié?
                  </Link>
                </div>
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
                  className="h-12"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Se souvenir de moi
                </Label>
              </div>

              <AnimatedButton type="submit" className="w-full mt-2 h-12 text-base" isLoading={isLoading} disabled={!isFormValid}>
                Se connecter
              </AnimatedButton>
            </form>

            <Divider text="OU" className="my-6" />

            <SocialButton
              icon={<Shield className="h-5 w-5" />}
              className="w-full h-12 text-base bg-[#0078d4] hover:bg-[#106ebe] text-white transition-colors"
              onClick={handleAzureLogin}
            >
              Se connecter avec Azure
            </SocialButton>
          </div>

          <div className="glass-footer px-8 py-4 text-center">
            <p className="text-sm">
              Pas encore de compte?{" "}
              <Link href="/register" className="text-primary font-medium hover:underline">
                S'inscrire
              </Link>
            </p>
          </div>
        </div>
      </div>

      {showToast && <Toast message="Connexion réussie!" type="success" onClose={() => setShowToast(false)} />}
    </div>
  )
}
