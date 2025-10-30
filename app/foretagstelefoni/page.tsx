"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedText } from "@/components/ui/animated-text"
import { PaintableTextBrushV2 } from "@/components/ui/paintable-text-v2"
import { GlareCard } from "@/components/ui/glare-card"
import { ShineButton } from "@/components/ui/shine-button"
import { Phone, Users, Search, Code, Rocket, MessageSquare, FileCheck2, Smartphone } from "lucide-react"
import Image from "next/image"
import { OptimizedBackground } from "@/components/ui/optimized-background"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FormModal } from "@/components/form-modal"

const serviceCategories = [
  {
    title: "Mobiltelefoner & Abonnemang",
    icon: <Smartphone className="w-8 h-8 text-teal-600 dark:text-teal-400" />,
    description: "Paketerade mobiltelefoner, servicetjänster, skräddarsydda företagsabonnemang och headset.",
  },
  {
    title: "Modern Företagstelefoni",
    icon: <svg className="w-8 h-8 text-teal-600 dark:text-teal-400" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>,
    description: "Skapa smart intern och extern kommunikation med en anpassad växel. AI, ärendehantering, samtalstranskribering och mycket mer.",
  },
  {
    title: "Konferenssystem",
    icon: <Users className="w-8 h-8 text-teal-600 dark:text-teal-400" />,
    description: "Digitala mötesrum, videokonferens och ljud- och bildsystem för moderna möten.",
  },
  {
    title: "Upphandling & Rådgivning",
    icon: <Search className="w-8 h-8 text-teal-600 dark:text-teal-400" />,
    description: "Behovsanalys, operatörsupphandling, kostnadsbesparingar och avtalsstöd.",
  },
]

const processSteps = [
  { icon: <Search size={32} />, title: "01. Behovsanalys", description: "Vi kartlägger era kommunikationsbehov och nuvarande kostnader." },
  { icon: <Users size={32} />, title: "02. Kvalificering", description: "Avstämning med er verksamhet och identifiering av förbättringsområden." },
  { icon: <Code size={32} />, title: "03. Lösningsförslag", description: "Skräddarsydda lösningar baserade på era specifika krav." },
  { icon: <FileCheck2 size={32} />, title: "04. Affärsförslag", description: "Transparent prismodell och tydliga avtalsvillkor." },
  { icon: <Rocket size={32} />, title: "05. Implementation", description: "Smidig installation, konfiguration och användartester." },
  { icon: <Phone size={32} />, title: "06. Support & utveckling", description: "Kontinuerlig support och optimering av era telefoni­lösningar." },
]

const experts = [
  {
    name: "Radion Golubenko",
    title: "Kundansvarig",
    certs: ["Hårdvara", "Växel", "Abonnemang"],
    avatar: "/media/team/radion-golubenko.jpg",
  },
  {
    name: "Anton Forsberg",
    title: "Kundansvarig",
    certs: ["Växel", "Abonnemang"],
    avatar: "/media/team/anton-forsberg.jpg",
  },
];

const cases = [
  {
    title: "Komatsu Forest",
    description: "Upphandling och projektledning av en ny lösning för företagstelefonin med Microsoft Teams samt datanätsförbindelser till samtliga siter.",
    metric: "750+ användare"
  },
  {
    title: "Contractor Bygg",
    description: "Modern företagsväxel och abonnemangshantering med Flow, där anställda enkelt kan hantera sin telefoni på egen hand - samt löpande leverans av paketerade mobiler och headset.",
    metric: "300+ användare"
  },
  {
    title: "Diös Fastigheter",
    description: "Hårdvara som tjänst och system för inventarie­hantering.",
    metric: "200+ enheter"
  },
]

const faqItems = [
  {
    question: "Kan ni hjälpa till med upphandling av operatörsavtal?",
    answer:
      "Ja, vi analyserar era samtalsmönster och behov för att förhandla fram det bästa och mest kostnadseffektiva avtalet för er.",
  },
  {
    question: "Vad är skillnaden mellan VoIP och traditionell telefoni?",
    answer:
      "VoIP använder internetanslutning istället för traditionella telefonlinjer, vilket ger lägre kostnader, större flexibilitet och integration med andra system. Dessutom kan ni enkelt lägga till funktioner som videosamtal och skärmdelning.",
  },
  {
    question: "Erbjuder ni hyr- eller leasinglösningar?",
    answer:
      "Absolut. Vi kan skräddarsy flexibla finansieringslösningar för både hård- och mjukvara som passar er budget.",
  },
  {
    question: "Hur fungerar supporten efter installation?",
    answer:
      "Ni får ett anpassat serviceavtal med garanterade responstider och en dedikerad kontaktperson för trygg och långsiktig drift.",
  },
]

export default function ForetagstelefoniPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <>
      <FormModal
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        formType="foretagstelefoni"
      />
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative min-h-[80vh] flex items-center justify-center text-center px-4">
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/95 to-background" />
            <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)/0.1),transparent)]" />
            <OptimizedBackground variant="hero" />
            <div className="relative z-10">
              <div className="space-y-2">
                <PaintableTextBrushV2
                  text="Företagstelefoni"
                  el="h1"
                  paintColor="#14b8a6"
                  className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-foreground leading-none"
                />
                <PaintableTextBrushV2
                  text="i Västerbotten"
                  el="h1"
                  paintColor="#14b8a6"
                  className="block text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-foreground leading-none"
                />
              </div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="max-w-3xl mx-auto mt-6 text-lg text-muted-foreground"
              >
                Moderna lösningar från paketerade mobiltelefoner och abonnemang till växlar, AI och headset.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="mt-10"
              >
                <ShineButton onClick={() => setIsFormOpen(true)}>
                  Boka kostnadsfri konsultation
                </ShineButton>
              </motion.div>
            </div>
          </section>

          {/* Services Section - Grid Layout */}
          <section className="py-24 md:py-32 dark:border-t">
            <div className="container mx-auto">
              <AnimatedText text="Våra Tjänster" el="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-center" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {serviceCategories.map((category, i) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, type: "spring", stiffness: 50 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <GlareCard className="p-8 h-full">
                      <div className="flex flex-col items-center text-center">
                        <motion.div
                          className="bg-teal-500/10 p-4 rounded-lg mb-4"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {category.icon}
                        </motion.div>
                        <h3 className="text-2xl font-semibold mb-2">{category.title}</h3>
                        <p className="text-muted-foreground">{category.description}</p>
                      </div>
                    </GlareCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Cases Section - 3 Column Layout */}
          <section className="py-24 md:py-32 dark:border-t bg-gray-100 dark:bg-card/20">
            <div className="container mx-auto">
              <AnimatedText text="Kundcase" el="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-center" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {cases.map((caseItem, i) => (
                  <motion.div
                    key={caseItem.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="relative p-8 border rounded-xl bg-background overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                      <div className="text-teal-600 dark:text-teal-400 font-bold text-sm mb-2">{caseItem.metric}</div>
                      <h3 className="font-bold text-xl mb-2">{caseItem.title}</h3>
                      <p className="text-muted-foreground">{caseItem.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Process Section - Timeline Style */}
          <section className="py-24 md:py-32 dark:border-t">
            <div className="container mx-auto">
              <AnimatedText text="Vår Implementationsprocess" el="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-center" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {processSteps.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="p-8 border rounded-xl bg-card/50 backdrop-blur-sm hover:bg-card transition-colors"
                  >
                    <div className="bg-teal-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-teal-600 dark:text-teal-400">
                      {step.icon}
                    </div>
                    <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Experts & FAQ Section - Side by Side */}
          <section className="py-24 md:py-32 dark:border-t bg-gray-100 dark:bg-card/20">
            <div className="container mx-auto grid lg:grid-cols-2 gap-16">
              <div>
                <AnimatedText text="Våra Experter" el="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8" />
                <div className="space-y-6">
                  {experts.map((expert) => (
                    <motion.div
                      key={expert.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="p-6 rounded-xl border bg-background flex items-start gap-6"
                    >
                      <Image
                        src={expert.avatar || "/placeholder.svg"}
                        alt={`Porträtt av ${expert.name}`}
                        width={80}
                        height={80}
                        className="rounded-full border-2 border-teal-500"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{expert.name}</h3>
                        <p className="text-teal-600 dark:text-teal-400 font-medium text-sm mb-2">{expert.title}</p>
                        <div className="flex flex-wrap gap-2">
                          {expert.certs.map((cert) => (
                            <span key={cert} className="text-xs bg-teal-500/10 text-teal-600 dark:text-teal-400 px-2 py-1 rounded">
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div>
                <AnimatedText text="Vanliga frågor" el="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8" />
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, i) => (
                    <AccordionItem value={`item-${i}`} key={i}>
                      <AccordionTrigger className="text-lg text-left">{item.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-base">{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
