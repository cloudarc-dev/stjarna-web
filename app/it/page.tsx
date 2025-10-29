"use client"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedText } from "@/components/ui/animated-text"
import { PaintableTextBrushV2 } from "@/components/ui/paintable-text-v2"
import { ShineButton } from "@/components/ui/shine-button"
import { OptimizedBackground } from "@/components/ui/optimized-background"
import { SubtleCard } from "@/components/ui/subtle-card"
import { CheckCircle2, ShieldCheck, Cloud, Server, Search, Code, Users, Rocket, Computer, Brush, FileCheck2 } from "lucide-react"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
// ChatWidget removed - to be replaced with UI-kit based chat interface

const serviceCategories = [
  {
    title: "IT-infrastruktur & nätverk",
    icon: <Computer className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    points: [
      "Säker och skalbar nätverksdesign",
      "Installation och drift av servrar & arbetsstationer",
      "Backup-strategier och återställning",
    ],
  },
  {
    title: "Molntjänster & Microsoft 365",
    icon: <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>,
    points: [
      "Migrering till molnet & hybridlösningar",
      "Microsoft 365 licenser & adoption",
      "Smart fillagring & samarbetsverktyg",
    ],
  },
  {
    title: "IT-säkerhet & compliance",
    icon: <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>,
    points: ["Brandväggar & hotdetektering", "GDPR-rådgivning & dataskydd", "Proaktiv övervakning & incidenthantering"],
  },
  {
    title: "Proaktiv IT-support & drift",
    icon: <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>,
    points: ["Fjärrsupport & övervakning", "Förebyggande underhåll", "Snabb felsökning & incidenthantering"],
  },
]

const processSteps = [
  { icon: <Search size={32} className="text-blue-600 dark:text-blue-400" />, title: "01. Inventering" },
  { icon: <Search size={32} className="text-blue-600 dark:text-blue-400" />, title: "02. Behovsanalys" },
  { icon: <Brush size={32} className="text-blue-600 dark:text-blue-400" />, title: "03. Lösningsförslag" },
  { icon: <FileCheck2 size={32} className="text-blue-600 dark:text-blue-400" />, title: "04. Affärsförslag" },
  { icon: <Code size={32} className="text-blue-600 dark:text-blue-400" />, title: "05. Implementationsprojekt" },
  { icon: <Rocket size={32} className="text-blue-600 dark:text-blue-400" />, title: "06. Support & utveckling" },
]

const experts = [
  {
    name: "Erik Damber",
    title: "Konsult",
    certs: ["Microsoft 365", "Intune", "Säkerhet"],
    avatar: "/media/team/erik-damber.jpg",
  },
  {
    name: "Daniel Bennervall",
    title: "Konsult",
    certs: ["Microsoft 365", "Företagsnätverk", "Serverdrift"],
    avatar: "/media/team/daniel-bennervall.jpg",
  },
]

const faqItems = [
  {
    question: "Hur snabbt kan ni hjälpa till vid IT-problem?",
    answer: "Vi erbjuder snabb fjärrsupport och akuta insatser alla vardagar för att minimera er nertid.",
  },
  {
    question: "Vad innebär proaktiv IT-support?",
    answer:
      "Det innebär att vi kontinuerligt övervakar era system för att upptäcka och åtgärda potentiella problem innan de påverkar er verksamhet, vilket sparar både tid och pengar.",
  },
  {
    question: "Arbetar ni med små och medelstora företag?",
    answer:
      "Absolut. Våra lösningar är flexibla och skalbara, vilket gör dem idealiska för SMB-segmentet i Västerbotten. Vi fungerar som er externa IT-avdelning.",
  },
]

export default function ITPage() {
  return (
    <>
      {/* ChatWidget placeholder - to be replaced with UI-kit based chat interface */}
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative min-h-[80vh] flex items-center justify-center text-center px-4">
            <OptimizedBackground variant="hero" className="absolute inset-0 z-0" />
            <div className="container mx-auto relative z-10">
              <p className="text-primary font-semibold">40+ års erfarenhet</p>
              <PaintableTextBrushV2
                text="IT-tjänster i Västerbotten"
                el="h1"
                paintColor="#3b82f6"
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mt-2"
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="max-w-2xl mx-auto mt-6 text-lg text-muted-foreground"
              >
                Stabil IT-infrastruktur, molntjänster & cybersäkerhet som låter ditt företag växa utan avbrott.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="mt-10"
              >
                <ShineButton>Boka kostnadsfri IT-genomgång</ShineButton>
              </motion.div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-24 md:py-32 dark:border-t">
            <div className="container mx-auto">
              <AnimatedText text="Våra Tjänstekategorier" el="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center" />
              <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16">
                Helhetslösningar som täcker allt från nätverk till moln & säkerhet.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
                {serviceCategories.map((category, i) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <SubtleCard className="p-8 h-full group">
                      <div className="flex items-start gap-4 mb-4">
                        <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                          {category.icon}
                        </motion.div>
                        <h3 className="text-2xl font-semibold">{category.title}</h3>
                      </div>
                      <ul className="space-y-2 text-muted-foreground">
                        {category.points.map((point) => (
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

          {/* Cases & Experts Section */}
          <section className="py-24 md:py-32 dark:border-t bg-gray-100 dark:bg-card/20">
            <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <AnimatedText text="Lokala Kundcase" el="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4" />
                <p className="text-lg text-muted-foreground mb-8">
                  Se hur vi har hjälpt företag i regionen med skalbara IT-lösningar.
                </p>
                <div className="space-y-6">
                  <div className="p-6 border rounded-lg bg-background">
                    <h3 className="font-bold text-lg">NorrlandsOperan</h3>
                    <p className="text-muted-foreground">
                      Helhetsansvar för nätverk, Microsoft 365 & support för 100+ anställda.
                    </p>
                  </div>
                  <div className="p-6 border rounded-lg bg-background">
                    <h3 className="font-bold text-lg">Umia</h3>
                    <p className="text-muted-foreground">
                      Nationellt ansvar för samtliga kontors IT-infrastruktur, Microsoft 365 och säkerhet.
                    </p>
                  </div>
                  <div className="p-6 border rounded-lg bg-background">
                    <h3 className="font-bold text-lg">Umeå Mark & VA</h3>
                    <p className="text-muted-foreground">
                      Utveckling av samarbetsfunktioner, säkerhet, lagring och nätverk.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <AnimatedText text="Våra Experter" el="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8" />
                <div className="space-y-8">
                  {experts.map((expert) => (
                    <SubtleCard key={expert.name} className="p-6 flex items-center gap-6">
                      <Image
                        src={expert.avatar || "/placeholder.svg"}
                        alt={`Porträtt av ${expert.name}`}
                        width={100}
                        height={100}
                        className="rounded-full border-2 border-primary"
                      />
                      <div>
                        <h3 className="text-2xl font-semibold">{expert.name}</h3>
                        <p className="text-primary font-medium">{expert.title}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {expert.certs.map((cert) => (
                            <span
                              key={cert}
                              className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
                            >
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    </SubtleCard>
                  ))}
                </div>
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

          {/* FAQ Section */}
          <section className="py-24 md:py-32 dark:border-t bg-gray-100 dark:bg-card/20">
            <div className="container max-w-3xl mx-auto">
              <AnimatedText
                text="Vanliga frågor om IT-tjänster"
                el="h2"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center"
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
        </main>
        <Footer />
      </div>
    </>
  )
}
