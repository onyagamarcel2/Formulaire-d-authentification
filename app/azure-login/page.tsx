"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Shield, AlertCircle, Loader2 } from "lucide-react"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Toast } from "@/components/ui/toast"
import { AnimatedBackground } from "@/components/animated-background"

export default function AzureLoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showToast, setShowToast] = useState(false)
  const [redirectCountdown, setRedirectCountdown] = useState(0)

  const handleAzureLogin = async () => {
    setError("")
    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setShowToast(true)
      setRedirectCountdown(5)
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de la connexion avec Azure")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (redirectCountdown > 0) {
      const timer = setTimeout(() => {
        setRedirectCountdown(redirectCountdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
    // Redirection would happen here when countdown reaches 0
  }, [redirectCountdown])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <AnimatedBackground />

      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md animate-fade-in-up z-10">
        <div className="flex justify-center mb-8">
          <div className="animate-float">
            <Logo className="text-4xl animate-scale-in" />
          </div>
        </div>

        <div className="glass-card rounded-xl overflow-hidden animate-glow">
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-center mb-2 dark:text-white">Connexion avec Azure DevOps</h1>
            <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
              Connectez-vous à votre compte O'test avec vos identifiants Azure DevOps
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md flex items-center text-sm text-red-600 dark:text-red-400 animate-scale-in">
                <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-inner animate-bounce-in">
                <Shield className="h-12 w-12" />
              </div>
            </div>

            {redirectCountdown > 0 ? (
              <div className="text-center space-y-4 p-4 glass-input rounded-lg">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                <p className="text-sm font-medium">
                  Connexion réussie ! Redirection dans {redirectCountdown} secondes...
                </p>
              </div>
            ) : (
              <AnimatedButton
                type="button"
                className="w-full h-12 text-base bg-[#0078d4] hover:bg-[#106ebe] text-white flex items-center justify-center"
                onClick={handleAzureLogin}
                isLoading={isLoading}
              >
                <Shield className="h-5 w-5 mr-2" />
                Continuer avec Azure DevOps
              </AnimatedButton>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                En vous connectant, vous acceptez nos{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  conditions d'utilisation
                </Link>{" "}
                et notre{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  politique de confidentialité
                </Link>
              </p>
            </div>
          </div>

          <div className="glass-footer px-8 py-4 text-center">
            <Link href="/login" className="flex items-center justify-center text-primary font-medium hover:underline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux options de connexion
            </Link>
          </div>
        </div>
      </div>

      {showToast && (
        <Toast message="Connexion avec Azure DevOps réussie!" type="success" onClose={() => setShowToast(false)} />
      )}
    </div>
  )
}
