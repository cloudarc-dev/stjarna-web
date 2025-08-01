"use client"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedText } from "@/components/ui/animated-text"
import { ShineButton } from "@/components/ui/shine-button"
import { GlareCard } from "@/components/ui/glare-card"
import { Shield, Radio, Wrench, Truck, Search, Code, Users, Rocket } from "lucide-react"
import Image from "next/image"
import { MysticalBackground } from "@/components/ui/mystical-background"
// ChatWidget removed - to be replaced with UI-kit based chat interface

const serviceCategories = [
  {
    title: "Säkerhet & Fordonsstyrning",
    icon: <Shield className="w-10 h-10 text-primary" />,
    description: "Alkolås, varningssystem, backkameror och övervakning för full efterlevnad och trygghet.",
  },
  {
    title: "Kommunikation & Digital Uppkoppling",
    icon: <Radio className="w-10 h-10 text-primary" />,
    description: "Komradio, GPS-spårning och digitala körjournaler för en helt uppkopplad fordonspark.",
  },
  {
    title: "Fordonsinredning & Utrustning",
    icon: <Truck className="w-10 h-10 text-primary" />,
    description: "Specialanpassad bilinredning, hyllsystem och arbetsbelysning för maximal effektivitet.",
  },
  {
    title: "Service & Support",
    icon: <Wrench className="w-10 h-10 text-primary" />,
    description: "Löpande service, reparationer, felsökning och uppgraderingar med mobilitetsgaranti.",
  },
]

const processSteps = [
  { icon: <Search size={32} />, title: "01. Behovsanalys och kravställning" },
  { icon: <Code size={32} />, title: "02. Designfas och lösningsförslag" },
  { icon: <Users size={32} />, title: "03. Implementation och utbildning" },
  { icon: <Rocket size={32} />, title: "04. Kontinuerlig support och utveckling" },
]

const experts = [
  {
    name: "Anna Karlsson",
    title: "Fordonsingenjör & projektledare",
    certs: ["Dräger-certifierad", "Hytera Partner"],
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Johan Berg",
    title: "Installationsexpert",
    certs: ["Sortimo Partner"],
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
              <div className="max-w-2xl">
                <AnimatedText
                  text="Fordonsteknik i Umeå"
                  el="h1"
                  className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter text-white"
                />
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="mt-6 text-lg text-white/80"
                >
                  Säkerhet, kommunikation och utrustning för alla fordon. Vi levererar helhetslösningar inom
                  fordonsteknik för företag i Umeåregionen.
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
          <section className="py-24 md:py-32 border-t">
            <div className="container mx-auto">
              <AnimatedText text="Våra Tjänstekategorier" el="h2" className="text-4xl font-bold mb-16 text-center" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {serviceCategories.map((category, i) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
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
          <section className="py-24 md:py-32 border-t bg-gray-100 dark:bg-card/50">
            <div className="container mx-auto">
              <AnimatedText text="Lokala Kundcase" el="h2" className="text-4xl font-bold mb-12 text-center" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div whileHover={{ y: -5 }} className="p-8 border rounded-xl bg-background">
                  <h3 className="font-bold text-xl">Umeå Taxi</h3>
                  <p className="text-muted-foreground mt-2">
                    Installation av alkolås och GPS-spårning för hela fordonsflottan.
                  </p>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} className="p-8 border rounded-xl bg-background">
                  <h3 className="font-bold text-xl">Bygg & Transport AB</h3>
                  <p className="text-muted-foreground mt-2">
                    Komplett bilinredning och arbetsbelysning för servicebilar.
                  </p>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} className="p-8 border rounded-xl bg-background">
                  <h3 className="font-bold text-xl">Räddningstjänsten Västerbotten</h3>
                  <p className="text-muted-foreground mt-2">
                    Kommunikationsradio och varningssystem i utryckningsfordon.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-24 md:py-32 border-t">
            <div className="container mx-auto">
              <AnimatedText text="Vår Tjänsteprocess" el="h2" className="text-4xl font-bold mb-12 text-center" />
              <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                <div className="absolute top-12 left-0 w-full h-0.5 bg-border -translate-y-1/2 hidden lg:block" />
                {processSteps.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2, type: "spring" }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="relative flex flex-col items-center text-center p-6"
                  >
                    <div className="bg-background p-4 rounded-full border-2 border-primary mb-4 z-10">{step.icon}</div>
                    <h3 className="font-semibold text-lg">{step.title}</h3>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Experts Section */}
          <section className="py-24 md:py-32 border-t bg-gray-100 dark:bg-card/50">
            <div className="container mx-auto">
              <AnimatedText text="Våra Experter" el="h2" className="text-4xl font-bold mb-12 text-center" />
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
