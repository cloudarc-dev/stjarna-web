"use client"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedText } from "@/components/ui/animated-text"
import { ShineButton } from "@/components/ui/shine-button"
import { SubtleCard } from "@/components/ui/subtle-card"
import { GlareCard } from "@/components/ui/glare-card"
import { Shield, Radio, Wrench, Truck, Search, Code, Rocket, FileCheck2 } from "lucide-react"
import Image from "next/image"
import { MysticalBackground } from "@/components/ui/mystical-background"
// ChatWidget removed - to be replaced with UI-kit based chat interface

const serviceCategories = [
  {
    title: "Säkerhet & Fordonsstyrning",
    icon: <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
    description: "Alkolås, varningssystem, backkameror och övervakning för full efterlevnad och trygghet.",
  },
  {
    title: "Kommunikation & Digital Uppkoppling",
    icon: <Radio className="w-10 h-10 text-green-600 dark:text-green-400" />,
    description: "Komradio, GPS-spårning och digitala körjournaler för en helt uppkopplad fordonspark.",
  },
  {
    title: "Fordonsinredning & Utrustning",
    icon: <Truck className="w-10 h-10 text-green-600 dark:text-green-400" />,
    description: "Specialanpassad bilinredning, hyllsystem och arbetsbelysning för maximal effektivitet.",
  },
  {
    title: "Service & Support",
    icon: <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>,
    description: "Löpande service, reparationer, felsökning och uppgraderingar med mobilitetsgaranti.",
  },
]

const processSteps = [
  { icon: <Search size={32} />, title: "01. Behovsanalys" },
  { icon: <Code size={32} />, title: "02. Lösningsförslag" },
  { icon: <FileCheck2 size={32} />, title: "03. Affärsförslag" },
  { icon: <Wrench size={32} />, title: "04. Installation" },
  { icon: <Rocket size={32} />, title: "05. Eftermarknad" },
]

const cases = [
  {
    title: "Västerbotten Taxi",
    description: "Installation av alkolås och GPS-spårning för hela fordonsflottan.",
  },
  {
    title: "Skellefteå Buss",
    description: "Komplett bilinredning och arbetsbelysning för servicebilar.",
  },
  {
    title: "Räddningstjänsten Västerbotten",
    description: "Kommunikationsradio och varningssystem i utryckningsfordon.",
  },
]

const experts = [
  {
    name: "Urban Eriksson",
    title: "Lösningsspecialist",
    certs: ["Komradio", "Taxi", "Alkolås"],
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Robert Fransson",
    title: "Fordonstekniker",
    certs: ["Installationer", "Taxi", "Alkolås"],
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export default function FordonsteknikPage() {
  return (
    <>
      {/* ChatWidget placeholder - to be replaced with UI-kit based chat interface */}
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative min-h-[80vh] flex items-center">
            <div className="absolute inset-0 overflow-hidden -z-10">
              <Image
                src="/placeholder.svg?height=1080&width=1920"
                alt="Modern verkstad med servicebilar"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>
            <MysticalBackground variant="hero" className="absolute inset-0 z-0" />
            <div className="container mx-auto relative z-10">
              <div className="max-w-4xl">
                <div className="space-y-2">
                  <AnimatedText
                    text="Fordonsteknik"
                    el="h1"
                    className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-foreground leading-none"
                  />
                  <AnimatedText
                    text="i Västerbotten"
                    el="span"
                    className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-foreground leading-none"
                  />
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="mt-6 text-lg text-white/80"
                >
                  Säkerhet, kommunikation och utrustning för alla fordon. Vi levererar helhetslösningar inom
                  fordonsteknik för företag i Västerbotten.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  className="mt-10"
                >
                  <ShineButton>Boka kostnadsfri behovsanalys</ShineButton>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-24 md:py-32 dark:border-t">
            <div className="container mx-auto">
              <AnimatedText text="Våra Tjänstekategorier" el="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-center" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
                {serviceCategories.map((category, i) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="flex"
                  >
                    <GlareCard className="p-8 flex flex-col items-center text-center h-full bg-card/80 backdrop-blur-sm group">
                      <motion.div 
                        className="mb-6"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {category.icon}
                      </motion.div>
                      <h3 className="text-2xl font-semibold mb-4">{category.title}</h3>
                      <p className="text-muted-foreground flex-grow">{category.description}</p>
                    </GlareCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Cases Section */}
          <section className="py-24 md:py-32 dark:border-t bg-gray-100 dark:bg-card/20">
            <div className="container mx-auto">
              <AnimatedText text="Lokala Kundcase" el="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-center" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {cases.map((c) => (
                  <motion.div whileHover={{ y: -5 }} key={c.title} className="p-8 border rounded-xl bg-background">
                    <h3 className="font-bold text-xl">{c.title}</h3>
                    <p className="text-muted-foreground mt-2">{c.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-24 md:py-32 dark:border-t">
            <div className="container mx-auto">
              <AnimatedText text="Vår Tjänsteprocess" el="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-center" />
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute left-8 top-0 h-full w-0.5 bg-border hidden md:block" />
                {processSteps.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2, type: "spring" }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="relative flex items-start gap-8 mb-12 last:mb-0"
                  >
                    <div className="w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 flex-shrink-0">{step.icon}</div>
                    <h3 className="font-semibold text-xl">{step.title}</h3>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Experts Section */}
          <section className="py-24 md:py-32 dark:border-t bg-gray-100 dark:bg-card/20">
            <div className="container mx-auto">
              <AnimatedText text="Våra Experter" el="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-center" />
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {experts.map((expert) => (
                  <motion.div whileHover={{ scale: 1.02 }} key={expert.name}>
                    <GlareCard className="p-8 flex flex-col items-center text-center h-full bg-card/80 backdrop-blur-sm">
                      <Image
                        src={expert.avatar || "/placeholder.svg"}
                        alt={`Porträtt av ${expert.name}`}
                        width={120}
                        height={120}
                        className="rounded-full mb-4 border-2 border-primary"
                      />
                      <h3 className="text-2xl font-semibold">{expert.name}</h3>
                      <p className="text-primary font-medium">{expert.title}</p>
                      <div className="mt-4 flex flex-wrap justify-center gap-2">
                        {expert.certs.map((cert) => (
                          <span
                            key={cert}
                            className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </GlareCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
