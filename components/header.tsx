"use client"
import { motion } from "framer-motion"
import type React from "react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import Link from "next/link"
import Image from "next/image"
import { AnimatedText } from "./ui/animated-text"
import { ThemeToggle } from "./theme-toggle"
import { ShineButton } from "./ui/shine-button"
import { NavbarChat } from "./ui/navbar-chat"
// Chat interface placeholder - to be implemented with UI-kit design

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
        src={isDark ? "/stjarnafyrkant-logo-inverterad-rgb-300x66.png" : "/stjarnafyrkant-logo-original-rgb-1.svg"}
        alt="Stjärna Fyrkant Västerbotten"
        fill
        className="object-contain"
        priority
      />
    </motion.div>
  )
}

export function Header() {
  const navItems = [
    { name: "IT", href: "/it" },
    { name: "Fordonsteknik", href: "/fordonsteknik" },
    { name: "Kommunikationsteknik", href: "/kommunikationsteknik" },
    { name: "Servicedesk", href: "/servicedesk" },
    { name: "Shop", href: "/shop" },
    { name: "Om oss", href: "/om-oss" },
  ]



  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-24 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center">
          <LogoWithTheme />
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
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
        <div className="flex items-center gap-4">
          <NavbarChat />
          <Link href="/#kontakt">
            <ShineButton className="hidden md:inline-flex !py-2 !px-6 !text-base">Kontakt</ShineButton>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
