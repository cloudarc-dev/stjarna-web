"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedText } from "@/components/ui/animated-text"
import { PaintableTextBrushV2 } from "@/components/ui/paintable-text-v2"
import { ShineButton } from "@/components/ui/shine-button"
import { SubtleCard } from "@/components/ui/subtle-card"
import { GlareCard } from "@/components/ui/glare-card"
import { FAQSchema } from "@/components/schema/faq-schema"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Shield, Radio, Wrench, Truck, Search, Code, Rocket, FileCheck2 } from "lucide-react"
import Image from "next/image"
import { OptimizedBackground } from "@/components/ui/optimized-background"
import { FormModal } from "@/components/form-modal"
import { FormType } from "@/lib/form-config"

const serviceCategories = [
  {
    title: "Säkerhet & Fordonsstyrning",
    icon: <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
    description: "Alkolås, varningssystem, backkameror och övervakning för full efterlevnad och trygghet.",
  },
  {
    title: "Kommunikation & Digital Uppkoppling",
    icon: <Radio className="w-10 h-10 text-green-600 dark:text-green-400" />,
    description: "Komradio, GPS-spårning och trådlöst nät ute i fält för en helt uppkopplad fordonspark.",
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
    title: "Holmen Wood Products",
    description: "Kamerasystem från Motec för säkrare logistikarbete i Combiliftar inklusive installation on site.",
  },
  {
    title: "Säll Entreprenad",
    description: "Transportradios inklusive programmering och installation till entreprenadfordon.",
  },
  {
    title: "Räddningstjänsten Västerbotten",
    description: "Kommunikationsradio och varningssystem i utryckningsfordon.",
  },
]

const experts = [
  {
    name: "Robin Carlström",
    title: "Fordonstekniker",
    certs: ["Taxi", "Alkolås"],
    avatar: "/media/team/robin-carlstrom.jpg",
  },
  {
    name: "Jacob Lundholm",
    title: "Fordonstekniker",
    certs: ["Inredning", "Taxi", "Alkolås"],
    avatar: "/media/team/jacob-lundholm.jpg",
  },
]

const faqItems = [
  {
    question: "Hur lång tid tar installation av alkolås i Umeå?",
    answer: "Installation av alkolås tar normalt 1-2 timmar beroende på fordonets modell. Vi erbjuder drop-in-tider vardagar 08:00-15:00 i Umeå och Skellefteå, eller du kan boka tid i förväg. Efter installation får du en grundlig genomgång av hur alkolåset fungerar och underhålls. Vi är godkända för installation av alla ledande märken.",
  },
  {
    question: "Vad kostar installation av taxameter och taxiutrustning?",
    answer: "Kostnaden varierar beroende på vilken utrustning du väljer och fordonets förutsättningar. En komplett taxiinstallation med taxameter, takljus, skylt och betalningssystem kostar från ca 25 000 kr exkl. moms. Vi hjälper även till med ansökan till Transportstyrelsen och ser till att fordonet uppfyller alla krav. Kontakta oss för en kostnadsfri offert anpassad efter ditt fordon.",
  },
  {
    question: "Kan ni anpassa fordonsinredning för olika yrken?",
    answer: "Absolut! Vi designar och installerar skräddarsydda fordonsinredningar för hantverkare, service, räddningstjänst och transport. Våra lösningar inkluderar effektiv förvaring, verktygsorganisation, arbetsbelysning och lastningslösningar. Alla inredningar är tillverkade i Sverige med hög kvalitet och anpassas efter ditt specifika behov och fordonets mått.",
  },
  {
    question: "Vilken kommunikationsutrustning behöver mitt företag i fordonen?",
    answer: "Behovet varierar beroende på er bransch. För många företag räcker komradio (PMR/DMR) för intern kommunikation, medan andra behöver GPS-spårning, digital tachograf eller mobilt bredband. Vi gör alltid en behovsanalys för att rekommendera rätt lösning. Vanliga kombinationer är komradio + GPS-spårning för entreprenad och transport, eller 4G-router + radio för räddningstjänst.",
  },
  {
    question: "Erbjuder ni service och underhåll av fordonsutrustning?",
    answer: "Ja, vi erbjuder löpande service och kalibrering av alkolås, taxameter, kamerasystem och annan fordonsutrustning. Vi har serviceavtal för företag med flera fordon där vi sköter all periodisk kontroll och underhåll. Vid fel eller problem kan du besöka våra verkstäder i Umeå eller Skellefteå för snabb reparation. Vi har ett stort lager av reservdelar för att minimera stilleståndstid.",
  },
  {
    question: "Är ni godkända för installation av säkerhetsutrustning?",
    answer: "Ja, vi är certifierade och godkända för installation av alkolås, kamerasystem, GPS-spårning och säkerhetsutrustning för företagsfordon. Våra tekniker har specialutbildning för olika fabrikat och vi följer alla branschstandarder och lagkrav. All installation dokumenteras och levereras med garantier. Vi är även godkända av Transportstyrelsen för taxiinstallationer.",
  },
]

export default function FordonsteknikPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentFormType, setCurrentFormType] = useState<FormType>('fordon')

  const handleOpenForm = (formType: FormType) => {
    setCurrentFormType(formType)
    setIsFormOpen(true)
  }

  return (
    <>
      <FAQSchema faqItems={faqItems} />
      <FormModal
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        formType={currentFormType}
      />
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
            <OptimizedBackground variant="hero" className="absolute inset-0 z-0" />
            <div className="container mx-auto relative z-10">
              <div className="max-w-4xl">
                <div className="space-y-2">
                  <PaintableTextBrushV2
                    text="Fordonsteknik"
                    paintColor="#22c55e"
                    el="h1"
                    className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-foreground leading-none"
                  />
                  <PaintableTextBrushV2
                    text="i Västerbotten"
                    paintColor="#22c55e"
                    el="h1"
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
                  <ShineButton onClick={() => handleOpenForm('fordon')}>
                    Boka kostnadsfri behovsanalys
                  </ShineButton>
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

          {/* FAQ Section */}
          <section className="py-24 bg-gray-100 dark:bg-card/20">
            <div className="container mx-auto max-w-4xl">
              <AnimatedText text="Vanliga frågor" el="h2" className="text-4xl font-bold mb-12 text-center" />
              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-background border rounded-lg px-6">
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="font-semibold">{item.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
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
