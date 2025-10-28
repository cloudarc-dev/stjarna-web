"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedText } from "@/components/ui/animated-text"
import { ShineButton } from "@/components/ui/shine-button"
import { SubtleCard } from "@/components/ui/subtle-card"
import { LifeBuoy, CheckCircle2, FilePlus, Search, Wrench, Check, Settings, UserPlus, HardDrive, Users } from "lucide-react"
import Image from "next/image"
import { MysticalBackground } from "@/components/ui/mystical-background"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { UpsalesModal } from "@/components/upsales-modal"
// ChatWidget removed - to be replaced with UI-kit based chat interface

const includedServices = [
  {
    title: "Användarsupport & Felsökning",
    icon: <Users className="w-8 h-8 text-orange-600 dark:text-orange-400" />,
    points: [
      "Snabb hjälp via telefon, e-post & fjärrstyrning",
      "Lösning av problem med mjuk- & hårdvara",
      "Hantering av användarkonton & behörigheter",
    ],
  },
  {
    title: "Drift & Övervakning",
    icon: <svg className="w-8 h-8 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>,
    points: [
      "Proaktiv övervakning av system & nätverk",
      "Installation & uppdatering av programvara",
      "Hantering av backuper & säkerhet",
    ],
  },
  {
    title: "Onboarding & Offboarding",
    icon: <UserPlus className="w-8 h-8 text-orange-600 dark:text-orange-400" />,
    points: [
      "Iordningställande av dator & konton för nyanställda",
      "Säker avslutning av konton & överlämning av data",
      "Anpassade checklistor för smidiga processer",
    ],
  },
  {
    title: "Hårdvaruhantering & Inköp",
    icon: <svg className="w-8 h-8 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>,
    points: [
      "Rådgivning vid inköp av datorer & utrustning",
      "Installation & konfiguration på plats",
      "Hantering av garantier & reparationer",
    ],
  },
]

const processSteps = [
  {
    icon: <FilePlus size={28} />,
    title: "01. Ärenderegistrering",
    description: "Ditt ärende registreras och prioriteras i vårt system.",
  },
  {
    icon: <Search size={28} />,
    title: "02. Felsökning & Analys",
    description: "En tekniker påbörjar felsökning och håller dig uppdaterad.",
  },
  {
    icon: <Wrench size={28} />,
    title: "03. Åtgärd & Lösning",
    description: "Vi löser problemet och dokumenterar åtgärden.",
  },
  {
    icon: <Check size={28} />,
    title: "04. Uppföljning & Stängning",
    description: "Vi säkerställer att du är nöjd innan ärendet stängs.",
  },
]

const experts = [
  {
    name: "Linnea Nyström",
    title: "Servicedesk-ansvarig",
    certs: ["ITIL Foundation", "Microsoft 365 Certified"],
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Petter Andersson",
    title: "Supporttekniker",
    certs: ["CompTIA A+", "Network+"],
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

const faqItems = [
  {
    question: "Vilka öppettider har er servicedesk?",
    answer:
      "Vår servicedesk är bemannad alla helgfria vardagar 07:00-17:00. Vi erbjuder även utökad support via avtal.",
  },
  {
    question: "Hur snabbt får jag hjälp?",
    answer: "Vi har som mål att påbörja ärenden inom 15 minuter efter registrering för avtalskunder.",
  },
  {
    question: "Kan jag få hjälp på plats?",
    answer: "Absolut, vi erbjuder både fjärrsupport och tekniker på plats i hela Västerbotten.",
  },
]

export default function ServicedeskPage() {
  const [isUpsalesOpen, setIsUpsalesOpen] = useState(false)

  return (
    <>
      <MysticalBackground />
      <UpsalesModal open={isUpsalesOpen} onClose={() => setIsUpsalesOpen(false)} />
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative min-h-[80vh] flex items-center px-4">
            <div className="absolute inset-0 overflow-hidden -z-10">
              <Image
                src="/media/global-object.png"
                alt="Ljust och modernt kontor"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
            </div>
            <MysticalBackground variant="hero" className="absolute inset-0 z-0" />
            <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative z-10 text-left">
                <p className="text-primary font-semibold">Din personliga IT-avdelning</p>
                <AnimatedText
                  text="Servicedesk i Västerbotten"
                  el="h1"
                  animationType="soft"
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mt-2 leading-tight"
                />
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="max-w-xl mt-6 text-lg text-muted-foreground"
                >
                  Snabb, personlig och proaktiv support som håller din verksamhet rullande. Vi är din första kontakt för
                  alla IT-relaterade ärenden.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  className="mt-10"
                >
                  <ShineButton onClick={() => setIsUpsalesOpen(true)}>Kontakta vår Servicedesk</ShineButton>
                </motion.div>
              </div>
              <div className="hidden lg:block">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
                >
                  <Image
                    src="/placeholder.svg?height=500&width=500"
                    alt="Vänlig supporttekniker med headset"
                    width={500}
                    height={500}
                    className="rounded-full shadow-2xl border-8 border-background"
                  />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-24 md:py-32 dark:border-t">
            <div className="container mx-auto">
              <AnimatedText
                text="Vad ingår i vår Servicedesk?"
                el="h2"
                className="text-4xl font-bold mb-4 text-center"
              />
              <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16">
                En komplett tjänst för att hantera alla era dagliga IT-behov.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {includedServices.map((service, i) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <SubtleCard className="p-8 h-full group">
                      <div className="flex items-start gap-4 mb-4">
                        <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                          {service.icon}
                        </motion.div>
                        <h3 className="text-2xl font-semibold">{service.title}</h3>
                      </div>
                      <ul className="space-y-2 text-muted-foreground">
                        {service.points.map((point) => (
                          <li key={point} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 mt-1 text-primary/70 flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </SubtleCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-24 md:py-32 dark:border-t bg-gray-100 dark:bg-card/20">
            <div className="container mx-auto">
              <AnimatedText text="Vår Arbetsprocess" el="h2" className="text-4xl font-bold mb-16 text-center" />
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
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                        {step.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl">{step.title}</h3>
                      <p className="text-muted-foreground mt-1">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Experts Section */}
          <section className="py-24 md:py-32 dark:border-t">
            <div className="container mx-auto">
              <AnimatedText text="Våra Supporttekniker" el="h2" className="text-4xl font-bold mb-12 text-center" />
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {experts.map((expert) => (
                  <SubtleCard key={expert.name} className="p-8 flex flex-col items-center text-center h-full">
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
                  </SubtleCard>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-24 md:py-32 dark:border-t bg-gray-100 dark:bg-card/20">
            <div className="container max-w-3xl mx-auto">
              <AnimatedText
                text="Vanliga frågor om vår Servicedesk"
                el="h2"
                className="text-4xl font-bold mb-8 text-center"
              />
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, i) => (
                  <AccordionItem value={`item-${i}`} key={i}>
                    <AccordionTrigger className="text-lg">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-24 md:py-32 dark:border-t">
            <div className="container mx-auto text-center">
              <AnimatedText text="Starta ett supportärende" el="h2" className="text-4xl font-bold mb-4" />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Lokal partner inom IT, fordonsteknik och kommunikation. Vi hjälper dig att skapa en stabil teknisk
                infrastruktur.
              </p>
              <ShineButton onClick={() => setIsUpsalesOpen(true)}>Kontakta oss nu</ShineButton>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
