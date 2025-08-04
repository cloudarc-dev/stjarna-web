"use client"
import { motion, AnimatePresence } from "framer-motion"
import type React from "react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { UpsalesModal } from "@/components/upsales-modal"
import { Menu, X, Computer, Truck, Signal, Users, ShoppingCart, Building2, Bot } from "lucide-react"

import Link from "next/link"
import Image from "next/image"
import { AnimatedText } from "./ui/animated-text"
import { ThemeToggle } from "./theme-toggle"
import { ShineButton } from "./ui/shine-button"


const NavChatLauncher = () => (
  <button
    onClick={() => window.dispatchEvent(new Event("toggleChat"))}
    className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 text-primary shadow-lg shadow-primary/20 hover:shadow-xl transition-all duration-300 hover:from-primary/30 hover:to-primary/20 hover:text-primary-foreground backdrop-blur-sm border border-primary/20 rounded-lg"
    aria-label="Öppna AI-chatt"
  >
    <Bot className="w-5 h-5 animate-pulse" />
  </button>
)

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="relative group text-lg">
    {children}
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
  </Link>
)

const LogoWithTheme = () => {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder during SSR to avoid hydration mismatch
    return (
      <div className="h-12 w-48 bg-muted animate-pulse rounded" />
    )
  }

  const currentTheme = theme === 'system' ? systemTheme : theme
  const isDark = currentTheme === 'dark'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative h-12 w-48"
    >
      <Image
        src={isDark ? "/media/stjarnafyrkant-logo-inverterad-rgb-300x66.png" : "/stjarnafyrkant-logo-original-rgb-1.svg"}
        alt="Stjärna Fyrkant Västerbotten"
        fill
        className="object-contain"
        priority
      />
    </motion.div>
  )
}

export function Header() {
  const { theme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUpsalesOpen, setIsUpsalesOpen] = useState(false)
  
  const navItems = [
    { name: "IT", href: "/it", icon: Computer },
    { name: "Fordonsteknik", href: "/fordonsteknik", icon: Truck },
    { name: "Kommunikationsteknik", href: "/kommunikationsteknik", icon: Signal },
    { name: "Servicedesk", href: "/servicedesk", icon: Users },
    { name: "Shop", href: "/shop", icon: ShoppingCart },
    { name: "Om oss", href: "/om-oss", icon: Building2 },
  ]

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
            {navItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 100 }}
              >
                <NavLink href={item.href}>{item.name}</NavLink>
              </motion.div>
            ))}
          </nav>
          
          {/* Right Side Actions */}
          <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
            
            <NavChatLauncher />
            
            {/* Contact Button - Hidden on mobile */}
            <ShineButton 
              onClick={() => setIsUpsalesOpen(true)}
              className="hidden md:block !py-2 !px-4 lg:!px-6 !text-sm lg:!text-base"
            >
              Kontakt
            </ShineButton>
            
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
                    {navItems.map((item, i) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05, type: "spring", stiffness: 300 }}
                      >
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
                      </motion.div>
                    ))}
                  </div>
                </nav>
                
                {/* Bottom Actions */}
                <div className="p-6 border-t border-border/40 space-y-4">
                  <ShineButton 
                    onClick={() => {
                      closeMenu();
                      setIsUpsalesOpen(true);
                    }}
                    className="w-full !py-3 !text-base"
                  >
                    Kontakta oss
                  </ShineButton>
                  
                  <div className="flex items-center justify-center gap-4 pt-4">
                    <NavChatLauncher />
                    <span className="text-sm text-muted-foreground">Tema:</span>
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
