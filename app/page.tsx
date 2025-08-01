"use client"
import { motion } from "framer-motion"
import {
  Computer,
  Truck,
  Signal,
  LifeBuoy,
  Award,
  TrendingUp,
  FileCheck2,
  Search,
  Brush,
  Code,
  Rocket,
  ArrowRight,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GlareCard } from "@/components/ui/glare-card"
import { SubtleCard } from "@/components/ui/subtle-card"
import { AnimatedText } from "@/components/ui/animated-text"
import { MysticalBackground } from "@/components/ui/mystical-background"

import { ShineButton } from "@/components/ui/shine-button"
import { ShineBadge } from "@/components/ui/shine-badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Typewriter } from "@/components/ui/typewriter"

const services = [
  {
    icon: <Computer size={32} />,
    href: "/it", // IT-tjänster

    title: "IT-tjänster",
    description:
      "Säker, skalbar IT för företag. Vi hanterar allt från nätverk och säkerhet till molntjänster och support.",
  },
  {
    icon: <Truck size={32} />,
    href: "/fordonsteknik", // Fordonsteknik

    title: "Fordonsteknik",
    description:
      "Modern teknik för fordon. Vi installerar och servar allt från alkolås till kommunikationsradio och fordonsinredning.",
  },
  {
    icon: <Signal size={32} />,
    href: "/kommunikationsteknik", // Kommunikationsteknik

    title: "Kommunikationsteknik",
    description: "Smarta kommunikationslösningar. Vi hjälper dig med allt från komradio till telefoni och nätverk.",
  },
]

const cases = [
  {
    title: "Västerbotten Taxi",
    description:
      "Installation av alkolås och GPS-spårning för hela fordonsflottan, med integration mot centralsystem för fleet management.",
  },
  {
    title: "Bygg & Transport AB",
    description:
      "Komplett bilinredning och arbetsbelysning för servicebilar, tillsammans med fullskaligt IT-stöd för mobila arbetare.",
  },
  {
    title: "Räddningstjänsten Västerbotten",
    description:
      "Kommunikationsradio och varningssystem i utryckningsfordon med integration mot centrala ledningssystem.",
  },
]

const certifications = [
  {
    icon: <Award size={40} className="text-primary" />,
    title: "Swedac Ackreditering",
    description: "Garanterar att våra produkter och tjänster uppfyller stränga krav på kvalitet och säkerhet.",
  },
  {
    icon: <TrendingUp size={40} className="text-primary" />,
    title: "UC Högsta Kreditvärdighet",
    description: "Bekräftar vår ekonomiska stabilitet och pålitlighet som en långsiktig partner.",
  },
  {
    icon: <FileCheck2 size={40} className="text-primary" />,
    title: "ISO Certifieringar",
    description: "Certifierade för kvalitet (9001), miljö (14001) och arbetsmiljö (45001).",
  },
]

const processSteps = [
  {
    icon: <Search size={32} />,
    title: "01. Behovsanalys",
    description: "Vi börjar med att förstå dina behov och krav genom en noggrann analys.",
  },
  {
    icon: <Brush size={32} />,
    title: "02. Design & Lösningsförslag",
    description: "Baserat på analysen tar vi fram ett anpassat lösningsförslag med tydlig specifikation.",
  },
  {
    icon: <Code size={32} />,
    title: "03. Implementation & Utbildning",
    description: "Vi installerar, konfigurerar och testar lösningen enligt plan och utbildar er personal.",
  },
  {
    icon: <Rocket size={32} />,
    title: "04. Support & Utveckling",
    description: "Efter lansering erbjuder vi löpande support, underhåll och vidareutveckling.",
  },
]

const experts = [
  {
    name: "Anna Karlsson",
    title: "Fordonsingenjör & Projektledare",
    certs: ["Dräger-certifierad", "Hytera Partner"],
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Johan Berg",
    title: "Installationsexpert",
    certs: ["Sortimo Partner"],
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Maria Lindberg",
    title: "IT-säkerhetsspecialist",
    certs: ["CISSP", "Microsoft Certified"],
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export default function LandingPage() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative min-h-[80vh] flex items-center justify-center text-center px-4">
            <MysticalBackground variant="hero" className="absolute inset-0 z-0" />
            <div className="absolute inset-0 overflow-hidden -z-10 bg-gradient-to-b from-background via-background/95 to-background" />
            <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)/0.1),transparent)]" />
            <div className="relative z-10">
              <AnimatedText
                text="StjärnaFyrkant Västerbotten"
                el="h1"
                className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter text-foreground"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="mt-4 h-20 md:h-24 flex items-center justify-center"
              >
                <Typewriter
                  text={["IT-Lösningar", "Fordonsteknik", "Kommunikationsteknik"]}
                  className="text-4xl sm:text-5xl md:text-7xl text-primary"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
                className="mt-10"
              >
                <ShineButton>Starta ett projekt</ShineButton>
              </motion.div>
            </div>
          </section>

          {/* Services Section */}
          <section id="tjanster" className="py-24 md:py-32 dark:border-t">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 lg:sticky lg:top-32">
                  <AnimatedText text="Våra Tjänster" el="h2" className="text-4xl font-bold mb-4" />
                  <p className="text-lg text-muted-foreground">
                    Helhetslösningar inom IT, fordon och kommunikation. Våra specialister hittar rätt lösning för dina
                    behov.
                  </p>
                </div>
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {services.map((service, i) => (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, type: "spring" }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <SubtleCard className="p-8 flex flex-col h-full group">
                        <div className="flex items-center gap-4 mb-4">
                          <motion.div 
                            className="bg-primary/10 p-3 rounded-lg"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            {service.icon}
                          </motion.div>
                          <h3 className="text-2xl font-semibold">{service.title}</h3>
                        </div>
                        <p className="text-muted-foreground mb-6 flex-grow">{service.description}</p>
                        <Link href={service.href} passHref legacyBehavior>
                          <Button as="a" variant="outline" className="mt-auto bg-transparent">
                            Läs mer <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </SubtleCard>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <SubtleCard className="p-8 flex flex-col h-full bg-card/80">
                      <LifeBuoy size={32} className="text-primary mb-4" />
                      <h3 className="text-2xl font-semibold">Personlig Support</h3>
                      <p className="text-muted-foreground mt-2">
                        Vi finns här för dig. Snabb och personlig hjälp när du behöver det som mest.
                      </p>
                    </SubtleCard>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* Customer Cases Section */}
          <section id="kundcase" className="py-24 md:py-32 dark:border-t">
            <div className="container mx-auto">
              <AnimatedText text="Senaste Kundcase" el="h2" className="text-4xl font-bold mb-12 text-center" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <motion.div whileHover={{ y: -5, scale: 1.02 }} className="lg:row-span-2">
                  <GlareCard className="bg-card/80 backdrop-blur-sm p-8 flex flex-col justify-center text-left h-full min-h-[24rem]">
                    <h3 className="text-3xl font-semibold">{cases[0].title}</h3>
                    <p className="text-muted-foreground mt-4 text-lg">{cases[0].description}</p>
                  </GlareCard>
                </motion.div>
                <motion.div whileHover={{ y: -5, scale: 1.02 }}>
                  <GlareCard className="bg-card/80 backdrop-blur-sm p-8 flex flex-col justify-center text-left h-full min-h-[11.5rem]">
                    <h3 className="text-2xl font-semibold">{cases[1].title}</h3>
                    <p className="text-muted-foreground mt-2">{cases[1].description}</p>
                  </GlareCard>
                </motion.div>
                <motion.div whileHover={{ y: -5, scale: 1.02 }}>
                  <GlareCard className="bg-card/80 backdrop-blur-sm p-8 flex flex-col justify-center text-left h-full min-h-[11.5rem]">
                    <h3 className="text-2xl font-semibold">{cases[2].title}</h3>
                    <p className="text-muted-foreground mt-2">{cases[2].description}</p>
                  </GlareCard>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section id="process" className="py-24 md:py-32 dark:border-t bg-gray-100 dark:bg-card/20">
            <div className="container mx-auto">
              <AnimatedText text="Vår Process" el="h2" className="text-4xl font-bold mb-12 text-center" />
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
                    <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Certifications Section */}
          <section id="certifieringar" className="py-24 md:py-32 dark:border-t">
            <div className="container mx-auto">
              <AnimatedText text="Trygghet & Kvalitet" el="h2" className="text-4xl font-bold mb-12 text-center" />
              <div className="grid md:grid-cols-3 gap-8">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15, type: "spring" }}
                    viewport={{ once: true, amount: 0.5 }}
                  >
                    <SubtleCard className="p-8 flex flex-col items-center text-center h-full group">
                      <motion.div 
                        className="mb-6"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        <ShineBadge>
                          {cert.icon}
                        </ShineBadge>
                      </motion.div>
                      <h3 className="text-2xl font-semibold mb-4">{cert.title}</h3>
                      <p className="text-muted-foreground">{cert.description}</p>
                    </SubtleCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Experts Section */}
          <section id="om-oss" className="py-24 md:py-32 dark:border-t bg-gray-100 dark:bg-card/20">
            <div className="container mx-auto">
              <AnimatedText text="Våra Experter" el="h2" className="text-4xl font-bold mb-12 text-center" />
              <div className="grid md:grid-cols-3 gap-8">
                {experts.map((expert, i) => (
                  <motion.div
                    key={expert.name}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15, type: "spring" }}
                    viewport={{ once: true, amount: 0.5 }}
                  >
                    <SubtleCard className="p-8 flex flex-col items-center text-center h-full">
                      <Image
                        src={expert.avatar || "/placeholder.svg"}
                        alt={`Porträtt av ${expert.name}`}
                        width={100}
                        height={100}
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
                    </SubtleCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section id="kontakt" className="py-24 md:py-32 dark:border-t bg-gray-100 dark:bg-card/20">
            <div className="container mx-auto text-center">
              <AnimatedText
                text="Redo att utvecklas tillsammans med oss?"
                el="h2"
                className="text-4xl font-bold mb-4"
              />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Kontakta oss för en kostnadsfri behovsanalys och låt oss skapa framtidens lösningar för er.
              </p>
              <ShineButton>Starta Konversationen</ShineButton>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
