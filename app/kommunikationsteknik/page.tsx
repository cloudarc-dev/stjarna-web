"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedText } from "@/components/ui/animated-text"
import { PaintableTextBrushV2 } from "@/components/ui/paintable-text-v2"
import { SubtleCard } from "@/components/ui/subtle-card"
import { GlareCard } from "@/components/ui/glare-card"
import { ShineButton } from "@/components/ui/shine-button"
import { Phone, Radio, Users, Search, Code, Rocket, MessageSquare, FileCheck2 } from "lucide-react"
import Image from "next/image"
import { OptimizedBackground } from "@/components/ui/optimized-background"
import { ParallaxScroll } from "@/components/ui/parallax-scroll"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FormModal } from "@/components/form-modal"
import { CaseCard } from "@/components/case-card"
import { type CaseStudy } from "@/lib/supabase"

const serviceCategories = [
  {
    title: "Traditionell Komradio",
    icon: <Radio className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
    description: "Professionella radiosystem för pålitlig kommunikation i tuffa miljöer och avlägsna områden.",
  },
  {
    title: "Modern Mobilkommunikation",
    icon: <MessageSquare className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
    description: "GroupTalk och push-to-talk över 4G/5G – komradions enkelhet i din smartphone.",
  },
  {
    title: "Täckningsförstärkning",
    icon: <Search className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
    description: "Mobiltäckning, repeaters och signalförstärkare för optimal täckning inomhus och utomhus.",
  },
  {
    title: "Hörselskydd & Tillbehör",
    icon: <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
    description: "3M Peltor kommunikationssystem och hörselskydd för säker kommunikation i bullriga miljöer.",
  },
]

const processSteps = [
  { icon: <Search size={32} />, title: "01. Behovsanalys" },
  { icon: <Users size={32} />, title: "02. Kvalificering" },
  { icon: <Code size={32} />, title: "03. Lösningsförslag" },
  { icon: <FileCheck2 size={32} />, title: "04. Affärsförslag" },
  { icon: <Rocket size={32} />, title: "05. Implementationsprojekt" },
  { icon: <Phone size={32} />, title: "06. Support & utveckling" },
]

const experts = [
  {
    name: "Urban Eriksson",
    title: "Verkstadschef Skellefteå",
    certs: ["Komradio", "Täckningsförstärkning"],
    avatar: "/media/team/urban-eriksson.jpg",
  },
  {
    name: "Urban Spetz",
    title: "Industriförsäljning",
    certs: ["Komradio", "GroupTalk", "Täckningsförstärkning"],
    avatar: "/media/team/urban-spetz.jpg",
  },
];


const faqItems = [
  {
    question: "Vad är skillnaden mellan traditionell komradio och GroupTalk?",
    answer:
      "Traditionell komradio använder dedikerade frekvenser och fungerar utan mobilnät, perfekt för avlägsna områden. GroupTalk använder 4G/5G och ger komradions enkelhet i din smartphone med obegränsad räckvidd.",
  },
  {
    question: "Hur fungerar täckningsförstärkning?",
    answer:
      "Vi installerar repeaters och signalförstärkare som förbättrar mobiltäckningen inomhus och i svårtillgängliga områden. Detta säkerställer pålitlig kommunikation även där operatörernas nät är svagt.",
  },
  {
    question: "Varför behöver vi specialiserat hörselskydd?",
    answer:
      "I bullriga miljöer som skogsbruk, industri och bygg behövs hörselskydd som både dämpar farligt buller OCH tillåter tydlig radiokommunikation. 3M Peltor-system integreras direkt med era radioapparater.",
  },
  {
    question: "Hur fungerar supporten efter installation?",
    answer:
      "Ni får ett anpassat serviceavtal med garanterade responstider och en dedikerad kontaktperson för trygg och långsiktig drift.",
  },
]

export default function KommunikationsteknikPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [cases, setCases] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCases() {
      try {
        const response = await fetch('/api/cases/kommunikation')
        const data = await response.json()
        setCases(data)
      } catch (error) {
        console.error('Failed to fetch cases:', error)
      } finally {
        setLoading(false)
      }
    }
    loadCases()
  }, [])

  return (
    <>
      <FormModal
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        formType="komradio"
      />
      {/* ChatWidget placeholder - to be replaced with UI-kit based chat interface */}
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
                  text="Kommunikationsteknik"
                  el="h1"
                  paintColor="#a855f7"
                  className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-foreground leading-none"
                />
                <PaintableTextBrushV2
                  text="i Västerbotten"
                  el="h1"
                  paintColor="#a855f7"
                  className="block text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-foreground leading-none"
                />
              </div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="max-w-3xl mx-auto mt-6 text-lg text-muted-foreground"
              >
                Traditionell och modern gruppkommunikation för ökad säkerhet i krävande arbete samt inomhustäckning för radio, GPS och mobilnätet.
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

          {/* Services Section - Different layout from foretagstelefoni */}
          {/* Cases Section - Social Proof */}
          <section className="py-24 md:py-32 dark:border-t">
            <div className="container mx-auto">
              <AnimatedText text="Lokala kundcase" el="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-center" />
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : cases.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cases.map((caseStudy, index) => (
                    <CaseCard key={caseStudy.id} caseStudy={caseStudy} index={index} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-12">
                  Inga kundcase att visa än.
                </p>
              )}
            </div>
          </section>

          <section className="py-24 md:py-32 dark:border-t bg-gray-100 dark:bg-card/20">
            <div className="container mx-auto grid lg:grid-cols-3 gap-16">
              <ParallaxScroll distance={320} className="lg:col-span-1 space-y-4">
                <AnimatedText text="Våra tjänster" el="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4" />
                <p className="text-lg text-muted-foreground">
                  Komplett radiokommunikation – från klassisk komradio till modern push-to-talk.
                </p>
              </ParallaxScroll>
              <div className="lg:col-span-2 grid grid-cols-1 gap-8 justify-items-center">
                {serviceCategories.map((category, i) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, type: "spring", stiffness: 50 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <SubtleCard className="p-8 group">
                      <div className="flex items-center gap-6">
                        <motion.div
                          className="bg-purple-500/10 p-4 rounded-lg"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {category.icon}
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-semibold">{category.title}</h3>
                          <p className="text-muted-foreground mt-1">{category.description}</p>
                        </div>
                      </div>
                    </SubtleCard>
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

          {/* Experts & FAQ Section */}
          <section className="py-24 md:py-32 dark:border-t bg-gray-100 dark:bg-card/20">
            <div className="container mx-auto grid lg:grid-cols-5 gap-16">
              <div className="lg:col-span-2">
                <AnimatedText text="Våra Experter" el="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8" />
                <div className="space-y-8">
                  {experts.map((expert) => (
                    <SubtleCard key={expert.name} className="p-6 flex items-start gap-6">
                      <Image
                        src={expert.avatar || "/placeholder.svg"}
                        alt={`Porträtt av ${expert.name}`}
                        width={80}
                        height={80}
                        className="rounded-full border-2 border-purple-500"
                      />
                      <div>
                        <h3 className="text-xl font-semibold">{expert.name}</h3>
                        <p className="text-purple-600 dark:text-purple-400 font-medium text-sm mb-2">{expert.title}</p>
                        <div className="flex flex-wrap gap-2">
                          {expert.certs.map((cert) => (
                            <span key={cert} className="text-xs bg-purple-500/10 text-purple-600 dark:text-purple-400 px-2 py-1 rounded">
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    </SubtleCard>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-3">
                <AnimatedText text="Vanliga frågor" el="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8" />
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, i) => (
                    <AccordionItem value={`item-${i}`} key={i}>
                      <AccordionTrigger className="text-lg">{item.question}</AccordionTrigger>
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
