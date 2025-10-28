"use client"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedText } from "@/components/ui/animated-text"
import { PaintableTextBrushV2 } from "@/components/ui/paintable-text-v2"
import { ShineButton } from "@/components/ui/shine-button"
import { SubtleCard } from "@/components/ui/subtle-card"
import { GlareCard } from "@/components/ui/glare-card"
import { Users, Heart, Award, TrendingUp, Coffee, Dumbbell, MapPin, Clock, Phone, Mail } from "lucide-react"
import Image from "next/image"
import { OptimizedBackground } from "@/components/ui/optimized-background"
// ChatWidget removed - to be replaced with UI-kit based chat interface

const benefits = [
  {
    title: "Utvecklingsmöjligheter",
    icon: <TrendingUp className="w-8 h-8 text-primary" />,
    description: "Kontinuerlig kompetensutveckling och möjlighet att växa inom företaget",
  },
  {
    title: "Trygg arbetsmiljö",
    icon: <Heart className="w-8 h-8 text-primary" />,
    description: "ISO 45001-certifierad arbetsmiljö med fokus på säkerhet och välmående",
  },
  {
    title: "Friskvård & aktiviteter",
    icon: <Dumbbell className="w-8 h-8 text-primary" />,
    description: "Friskvårdsbidrag och gemensamma aktiviteter för att främja hälsa",
  },
  {
    title: "Gemenskap",
    icon: <Coffee className="w-8 h-8 text-primary" />,
    description: "Härliga kollegor och en öppen, inkluderande företagskultur",
  },
]

const values = [
  {
    title: "Öppenhet",
    description: "Vi kommunicerar transparent och ärligt med varandra",
  },
  {
    title: "Gemenskap",
    description: "Tillsammans skapar vi en stödjande och inkluderande miljö",
  },
  {
    title: "Eget ansvar",
    description: "Vi tar ansvar för våra uppgifter och vårt eget lärande",
  },
  {
    title: "Utveckling",
    description: "Vi uppmuntrar kontinuerlig utveckling och innovation",
  },
]

export default function KarriarPage() {
  return (
    <>
      {/* ChatWidget placeholder - to be replaced with UI-kit based chat interface */}
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative min-h-[80vh] flex items-center justify-center text-center px-4">
            <div className="absolute inset-0 overflow-hidden -z-10">
              <Image
                src="/placeholder.svg?height=1080&width=1920"
                alt="Glada medarbetare på StjärnaFyrkant"
                fill
                className="object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
            </div>
            <OptimizedBackground variant="minimal" className="absolute inset-0 z-0" />
            <div className="relative z-10 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="mb-6"
              >
                <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="text-primary font-semibold">Nominerad till Årets Arbetsgivare 2023</span>
                </div>
              </motion.div>
              <PaintableTextBrushV2 text="Jobba med oss" paintColor="#fedb00" el="h1" className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6" />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
              >
                Hjärtat i vår verksamhet är våra medarbetare. Bli en del av vårt team och dela dina dagar med riktigt
                duktiga och härliga kollegor.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="mt-10"
              >
                <ShineButton>Se lediga tjänster</ShineButton>
              </motion.div>
            </div>
          </section>

          {/* Culture Section */}
          <section className="py-24 md:py-32 dark:border-t">
            <div className="container mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <AnimatedText text="Vår företagskultur" el="h2" className="text-4xl font-bold mb-6" />
                  <div className="space-y-4 text-lg text-muted-foreground">
                    <p>
                      Som anställd hos oss får du dela dina dagar med riktigt duktiga och härliga kollegor som alla
                      drivs av att göra det där lilla extra – både för våra kunder och varandra.
                    </p>
                    <p>
                      Tillsammans skapar vi en arbetsplats som präglas av öppenhet, gemenskap, eget ansvar och där alla
                      medarbetare ska ha en möjlighet att växa, utvecklas och få vara med och påverka.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {values.map((value, i) => (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, type: "spring" }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <SubtleCard className="p-6 h-full">
                        <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                        <p className="text-sm text-muted-foreground">{value.description}</p>
                      </SubtleCard>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-24 md:py-32 dark:border-t bg-gray-100 dark:bg-card/20">
            <div className="container mx-auto">
              <AnimatedText text="Vad vi erbjuder" el="h2" className="text-4xl font-bold mb-16 text-center" />
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, i) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <GlareCard className="p-8 flex flex-col items-center text-center h-full bg-card/80 backdrop-blur-sm">
                      <div className="mb-6">{benefit.icon}</div>
                      <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                      <p className="text-muted-foreground text-sm">{benefit.description}</p>
                    </GlareCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Vision Section */}
          <section className="py-24 md:py-32 dark:border-t">
            <div className="container mx-auto">
              <div className="max-w-4xl mx-auto text-center">
                <div className="flex items-center justify-center gap-4 mb-8">
                  <Users className="w-12 h-12 text-primary" />
                  <AnimatedText text="Vår vision" el="h2" className="text-4xl font-bold" />
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-xl text-muted-foreground mb-8"
                >
                  StjärnaFyrkants vision är att vara den mest attraktiva arbetsgivaren genom att skapa en trygg och bra
                  arbetsmiljö som främjar initiativtagande, kreativitet, samarbete och utveckling.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-2xl font-semibold text-primary"
                >
                  Vi vill att alla anställda ska vilja rekommendera oss som arbetsgivare till personer med rätt
                  kompetens.
                </motion.p>
              </div>
            </div>
          </section>

          {/* Testimonial Section */}
          <section className="py-24 md:py-32 dark:border-t bg-gray-100 dark:bg-card/20">
            <div className="container mx-auto">
              <div className="max-w-4xl mx-auto">
                <SubtleCard className="p-12 text-center">
                  <blockquote className="text-2xl italic text-muted-foreground mb-8">
                    "Vi har tillsammans hittat nya vägar framåt, utvecklat och kommit på lösningar för att effektivisera
                    och optimera. De finns alltid nära till hands när vi behöver dem och ger en service i Stjärnklass.
                    Hela deras team är på alerten och ger ett väldigt trevligt bemötande."
                  </blockquote>
                  <div className="flex items-center justify-center gap-4">
                    <Image
                      src="/placeholder.svg?height=80&width=80"
                      alt="Nina Karlsson"
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                    <div className="text-left">
                      <p className="font-semibold text-lg">Nina Karlsson</p>
                      <p className="text-muted-foreground">FD Inköpsansvarig, Edukatus</p>
                    </div>
                  </div>
                </SubtleCard>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 md:py-32 dark:border-t">
            <div className="container mx-auto text-center">
              <AnimatedText text="Redo att bli en del av teamet?" el="h2" className="text-4xl font-bold mb-6" />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Vi söker alltid duktiga och engagerade medarbetare inom IT, fordonsteknik och kommunikation. Hör av dig
                även om du inte ser en specifik tjänst som passar dig.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ShineButton>Se lediga tjänster</ShineButton>
                <ShineButton className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Skicka spontanansökan
                </ShineButton>
              </div>
            </div>
          </section>

          {/* Contact Info Section */}
          <section className="py-24 md:py-32 dark:border-t bg-gray-100 dark:bg-card/20">
            <div className="container mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <SubtleCard className="p-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Adress</h3>
                      <p className="text-muted-foreground text-sm">Förrådsvägen 15</p>
                      <p className="text-muted-foreground text-sm">901 32 Västerbotten</p>
                    </div>
                  </div>
                </SubtleCard>

                <SubtleCard className="p-6">
                  <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-primary" />
                    <div>
                      <h3 className="font-semibold mb-1">Telefon</h3>
                      <p className="text-muted-foreground text-sm">090-70 44 70</p>
                    </div>
                  </div>
                </SubtleCard>

                <SubtleCard className="p-6">
                  <div className="flex items-center gap-4">
                    <Mail className="w-6 h-6 text-primary" />
                    <div>
                      <h3 className="font-semibold mb-1">E-post</h3>
                      <p className="text-muted-foreground text-sm">umea@stjarnafyrkant.se</p>
                    </div>
                  </div>
                </SubtleCard>

                <SubtleCard className="p-6">
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Öppettider</h3>
                      <div className="space-y-1 text-muted-foreground text-sm">
                        <p>Mån-fre: 07:00-17:00</p>
                        <p>(Dag före röd dag 07:00-15:00)</p>
                      </div>
                    </div>
                  </div>
                </SubtleCard>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
