"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SubtleCard } from "@/components/ui/subtle-card"
import { ShineButton } from "@/components/ui/shine-button"
import { Cookie, X, Settings } from "lucide-react"
import Link from "next/link"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setIsVisible(true), 1000)
    }
  }, [])

  const acceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("cookie-consent", JSON.stringify(consent))
    setIsVisible(false)
  }

  const acceptNecessary = () => {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("cookie-consent", JSON.stringify(consent))
    setIsVisible(false)
  }

  const savePreferences = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("cookie-consent", JSON.stringify(consent))
    setIsVisible(false)
    setShowSettings(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="container max-w-screen-xl mx-auto">
            <SubtleCard className="p-6 md:p-8 backdrop-blur-xl bg-card/95 border-2">
              {!showSettings ? (
                <>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Cookie className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-2">Vi använder cookies</h3>
                      <p className="text-muted-foreground text-sm md:text-base">
                        Vi använder cookies för att förbättra din upplevelse på vår webbplats, analysera trafik och
                        tillhandahålla personligt anpassat innehåll. Genom att klicka på "Acceptera alla" samtycker du
                        till vår användning av cookies.{" "}
                        <Link href="/integritetspolicy" className="text-primary hover:underline">
                          Läs mer i vår integritetspolicy
                        </Link>
                        .
                      </p>
                    </div>
                    <button
                      onClick={() => setIsVisible(false)}
                      className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                      aria-label="Stäng"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <ShineButton onClick={acceptAll} className="flex-1">
                      Acceptera alla
                    </ShineButton>
                    <button
                      onClick={acceptNecessary}
                      className="flex-1 px-6 py-3 rounded-lg border-2 border-border hover:border-primary transition-colors font-medium"
                    >
                      Endast nödvändiga
                    </button>
                    <button
                      onClick={() => setShowSettings(true)}
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border hover:border-primary transition-colors"
                      aria-label="Inställningar"
                    >
                      <Settings className="w-4 h-4" />
                      <span className="hidden sm:inline">Anpassa</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">Cookie-inställningar</h3>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Stäng"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex-grow pr-4">
                        <h4 className="font-semibold mb-1">Nödvändiga cookies</h4>
                        <p className="text-sm text-muted-foreground">
                          Dessa cookies krävs för att webbplatsen ska fungera korrekt och kan inte stängas av.
                        </p>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={true}
                          disabled
                          className="w-5 h-5 rounded accent-primary"
                        />
                      </div>
                    </div>

                    <div className="flex items-start justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex-grow pr-4">
                        <h4 className="font-semibold mb-1">Analys-cookies</h4>
                        <p className="text-sm text-muted-foreground">
                          Dessa cookies hjälper oss att förstå hur besökare interagerar med webbplatsen.
                        </p>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={preferences.analytics}
                          onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                          className="w-5 h-5 rounded accent-primary cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="flex items-start justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex-grow pr-4">
                        <h4 className="font-semibold mb-1">Marknadsföring-cookies</h4>
                        <p className="text-sm text-muted-foreground">
                          Dessa cookies används för att visa relevanta annonser och marknadsföring.
                        </p>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={preferences.marketing}
                          onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                          className="w-5 h-5 rounded accent-primary cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <ShineButton onClick={savePreferences} className="flex-1">
                      Spara inställningar
                    </ShineButton>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="flex-1 px-6 py-3 rounded-lg border border-border hover:border-primary transition-colors"
                    >
                      Avbryt
                    </button>
                  </div>
                </>
              )}
            </SubtleCard>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
