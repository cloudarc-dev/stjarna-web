"use client"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedText } from "@/components/ui/animated-text"
import { ShineButton } from "@/components/ui/shine-button"
import { InteractiveGridBackground } from "@/components/ui/interactive-grid-background"
import { MysticalBackground } from "@/components/ui/mystical-background"
import { SubtleCard } from "@/components/ui/subtle-card"
import { CheckCircle2, ShieldCheck, Cloud, Server, Search, Code, Users, Rocket } from "lucide-react"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
// ChatWidget removed - to be replaced with UI-kit based chat interface

const serviceCategories = [
  {
    title: "IT-infrastruktur & nätverk",
    icon: <Server className="w-8 h-8 text-primary" />,
    points: [
      "Säker och skalbar nätverksdesign",
      "Installation och drift av servrar & arbetsstationer",
      "Backup-strategier och återställning",
    ],
  },
  {
    title: "Molntjänster & Microsoft 365",
    icon: <Cloud className="w-8 h-8 text-primary" />,
    points: [
      "Migrering till molnet & hybridlösningar",
      "Microsoft 365 licenser & adoption",
      "Smart fillagring & samarbetsverktyg",
    ],
  },
  {
    title: "IT-säkerhet & compliance",
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    points: ["Brandväggar & hotdetektering", "GDPR-rådgivning & dataskydd", "Proaktiv övervakning & incidenthantering"],
  },
  {
    title: "Proaktiv IT-support & drift",
    icon: <CheckCircle2 className="w-8 h-8 text-primary" />,
    points: ["Fjärrsupport & övervakning dygnet runt", "Förebyggande underhåll", "Snabb felsökning & åtgärd"],
  },
]

const processSteps = [
  { icon: <Search size={32} />, title: "01. Behovsanalys & rådgivning" },
  { icon: <Code size={32} />, title: "02. Design & implementation" },
  { icon: <Users size={32} />, title: "03. Utbildning & överlämning" },
  { icon: <Rocket size={32} />, title: "04. Löpande support & utveckling" },
]

const experts = [
  {
    name: "Sara Lindgren",
    title: "Moln- & Microsoft 365-specialist",
    certs: ["Microsoft Certified", "GDPR-expert"],
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Erik Svensson",
    title: "IT-säkerhetsexpert",
    certs: ["CompTIA Security+", "Fortinet NSE"],
    avatar: "/placeholder.svg?height=100&width=100",
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
          <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 isolate overflow-hidden">
            <MysticalBackground variant="hero" className="absolute inset-0 z-0" />
            <InteractiveGridBackground />
            <div className="relative z-10">
              <p className="text-primary font-semibold">30+ års erfarenhet</p>
              <AnimatedText
                text="IT-tjänster i Umeå"
                el="h1"
                className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter mt-2"
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
          <section className="py-24 md:py-32 border-t">
            <div className="container mx-auto">
              <AnimatedText text="Våra Tjänstekategorier" el="h2" className="text-4xl font-bold mb-4 text-center" />
              <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16">
                Helhetslösningar som täcker allt från nätverk till moln & säkerhet.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {serviceCategories.map((category, i) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
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
          <section className="py-24 md:py-32 border-t bg-gray-100 dark:bg-card/50">
            <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <AnimatedText text="Lokala Kundcase" el="h2" className="text-4xl font-bold mb-4" />
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
                    <h3 className="font-bold text-lg">Byggbolag Västerbotten</h3>
                    <p className="text-muted-foreground">
                      Implementering av trådlöst nätverk och backup-lösning i hela verksamheten.
                    </p>
                  </div>
                  <div className="p-6 border rounded-lg bg-background">
                    <h3 className="font-bold text-lg">Redovisningsbyrå</h3>
                    <p className="text-muted-foreground">
                      Kontinuerlig IT-support och GDPR-rådgivning för växande SMB.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <AnimatedText text="Våra Experter" el="h2" className="text-4xl font-bold mb-8" />
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
          <section className="py-24 md:py-32 border-t">
            <div className="container mx-auto">
              <AnimatedText text="Vår Tjänsteprocess" el="h2" className="text-4xl font-bold mb-12 text-center" />
              <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                <div className="absolute top-12 left-0 w-full h-0.5 bg-border -translate-y-1/2 hidden lg:block my-2.5" />
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

          {/* FAQ Section */}
          <section className="py-24 md:py-32 border-t bg-gray-100 dark:bg-card/50">
            <div className="container max-w-3xl mx-auto">
              <AnimatedText
                text="Vanliga frågor om IT-tjänster"
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
        </main>
        <Footer />
      </div>
    </>
  )
}
