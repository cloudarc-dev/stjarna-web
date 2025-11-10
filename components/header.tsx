"use client"
import { motion, AnimatePresence } from "framer-motion"
import type React from "react"
import { useTheme } from "next-themes"
import { useEffect, useState, useMemo } from "react"
import dynamic from "next/dynamic"
import { Menu, X, Computer, Truck, Signal, Phone, Users, ShoppingCart, Building2, Bot } from "lucide-react"

import Link from "next/link"
import Image from "next/image"
import { AnimatedText } from "./ui/animated-text"
import { ThemeToggle } from "./theme-toggle"
import { ShineButton } from "./ui/shine-button"

// Lazy load UpsalesModal
const UpsalesModal = dynamic(() => import("@/components/upsales-modal").then(mod => ({ default: mod.UpsalesModal })), {
  ssr: false
})


const NavChatLauncher = () => (
  <button
    onClick={() => window.dispatchEvent(new Event("toggleChat"))}
    className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 text-primary shadow-lg shadow-primary/20 hover:shadow-xl transition-all duration-300 hover:from-primary/30 hover:to-primary/20 hover:text-primary-foreground backdrop-blur-sm border border-primary/20 rounded-lg"
    aria-label="Öppna AI-chatt"
  >
    <Bot className="w-5 h-5 animate-pulse" />
  </button>
)

const NavLink = ({ href, external=false, children }: { href: string; external?: boolean; children: React.ReactNode }) => (
  external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="relative group text-base md:text-lg">
      {children}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
    </a>
  ) : (
    <Link href={href} className="relative group text-base md:text-lg">
      {children}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
    </Link>
  )
)

const LogoWithTheme = () => {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by not rendering theme-dependent logo until mounted
  if (!mounted) {
    // Return a placeholder that matches SSR
    return (
      <div className="relative h-12 w-48">
        <Image
          src="/stjarnafyrkant-logo-original-rgb-1.svg"
          alt="Stjärna Fyrkant Västerbotten"
          fill
          className="object-contain"
          priority
        />
      </div>
    )
  }

  const currentTheme = theme === 'system' ? systemTheme : theme
  const isDark = currentTheme === 'dark'

  return (
    <div className="relative h-12 w-48">
      <Image
        src={isDark ? "/media/stjarnafyrkant-logo-inverterad-rgb-300x66.png" : "/stjarnafyrkant-logo-original-rgb-1.svg"}
        alt="Stjärna Fyrkant Västerbotten"
        fill
        className="object-contain"
        priority
      />
    </div>
  )
}

// Memoize nav items to prevent re-creation
const NAV_ITEMS = [
  { name: "IT", href: "/it", icon: Computer },
  { name: "Fordonsteknik", href: "/fordonsteknik", icon: Truck },
  { name: "Kommunikation", href: "/kommunikationsteknik", icon: Signal },
  { name: "Företagstelefoni", href: "/foretagstelefoni", icon: Phone },
  { name: "Shop", href: "https://stjarna.shop/", icon: ShoppingCart, external: true },
  { name: "Om oss", href: "/om-oss", icon: Building2 },
] as const

export function Header() {
  const { theme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUpsalesOpen, setIsUpsalesOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <>
      <UpsalesModal open={isUpsalesOpen} onClose={() => setIsUpsalesOpen(false)} />
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 md:h-20 lg:h-24 max-w-screen-2xl items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center z-10">
            <div className="scale-75 md:scale-90 lg:scale-100">
              <LogoWithTheme />
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 100 }}
              >
                <NavLink href={item.href} external={item.external}>{item.name}</NavLink>
              </motion.div>
            ))}
          </nav>
          
          {/* Right Side Actions */}
          <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
            
            <NavChatLauncher />
            
            {/* Support Button - Hidden on mobile */}
            <Link href="/servicedesk" className="hidden md:block">
              <ShineButton
                className="!py-2 !px-4 lg:!px-6 !text-sm lg:!text-base"
              >
                Support
              </ShineButton>
            </Link>

            
            {/* Theme Toggle */}
            <div className="scale-90 md:scale-100">
              <ThemeToggle />
            </div>
            
            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={closeMenu}
            />
            
            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-background/95 backdrop-blur-xl border-l border-border/40 shadow-2xl lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border/40">
                  <h2 className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Meny
                  </h2>
                  <button
                    onClick={closeMenu}
                    className="p-2 rounded-lg hover:bg-accent transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                {/* Navigation Links */}
                <nav className="flex-1 px-6 py-8">
                  <div className="space-y-2">
                    {NAV_ITEMS.map((item, i) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05, type: "spring", stiffness: 300 }}
                      >
                        {item.external ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={closeMenu}
                            className="flex items-center gap-4 p-4 rounded-xl hover:bg-accent/50 transition-all duration-200 group"
                          >
                            <div className="w-6 h-6 text-primary group-hover:scale-110 transition-transform">
                              <item.icon className="w-6 h-6" />
                            </div>
                            <span className="text-lg font-medium group-hover:text-primary transition-colors">
                              {item.name}
                            </span>
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={closeMenu}
                            className="flex items-center gap-4 p-4 rounded-xl hover:bg-accent/50 transition-all duration-200 group"
                          >
                            <div className="w-6 h-6 text-primary group-hover:scale-110 transition-transform">
                              <item.icon className="w-6 h-6" />
                            </div>
                            <span className="text-lg font-medium group-hover:text-primary transition-colors">
                              {item.name}
                            </span>
                          </Link>
                        )}
                      </motion.div>
                    ))}

                    {/* Support button in mobile menu */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + NAV_ITEMS.length * 0.05, type: "spring", stiffness: 300 }}
                    >
                      <Link
                        href="/servicedesk"
                        onClick={closeMenu}
                        className="flex items-center gap-4 p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-all duration-200 group border border-primary/20"
                      >
                        <div className="w-6 h-6 text-primary group-hover:scale-110 transition-transform">
                          <Users className="w-6 h-6" />
                        </div>
                        <span className="text-lg font-medium text-primary transition-colors">
                          Support
                        </span>
                      </Link>
                    </motion.div>
                  </div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
