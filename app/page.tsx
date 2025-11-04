"use client"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
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
  ArrowRight,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GlareCard } from "@/components/ui/glare-card"
import { SubtleCard } from "@/components/ui/subtle-card"
import { AnimatedText } from "@/components/ui/animated-text"
import { OptimizedBackground } from "@/components/ui/optimized-background"
import { ParallaxScroll } from "@/components/ui/parallax-scroll"
import { PaintableTextBrushV2 } from "@/components/ui/paintable-text-v2"

import { ShineButton } from "@/components/ui/shine-button"
import { ShineBadge } from "@/components/ui/shine-badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Typewriter } from "@/components/ui/typewriter"
import { getAnonSupabase, type CaseStudy } from "@/lib/supabase"

// Lazy load FormModal - only loads when needed
const FormModal = dynamic(() => import("@/components/form-modal").then(mod => ({ default: mod.FormModal })), {
  ssr: false
})

const services = [
  {
    icon: (
      <motion.div
        className="relative"
        whileHover={{ rotate: [0, 360] }}
        transition={{ duration: 0.6 }}
      >
        <Computer size={32} className="text-blue-600 dark:text-blue-400" />
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    ),
    href: "/it",
    title: "IT-tjänster",
    description:
      "Säker, skalbar IT för företag. Vi hanterar allt från nätverk och säkerhet till molntjänster och support.",
  },
  {
    icon: (
      <motion.div
        whileHover={{ y: [-2, -6, -2, 0] }}
        transition={{ duration: 0.4 }}
      >
        <Truck size={32} className="text-green-600 dark:text-green-400" />
      </motion.div>
    ),
    href: "/fordonsteknik",
    title: "Fordonsteknik",
    description:
      "Skräddarsydd fordonsutrustning och installationer för effektivt fältarbete.",
  },
  {
    icon: (
      <motion.div
        whileHover={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.3 }}
      >
        <Signal size={32} className="text-purple-600 dark:text-purple-400" />
      </motion.div>
    ),
    href: "/kommunikationsteknik",
    title: "Kommunikation",
    description: "Traditionell och modern gruppkommunikation för ökad säkerhet i krävande arbete samt inomhustäckning för radio, GPS och mobilnätet.",
  },
  {
    icon: (
      <motion.div
        whileHover={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 0.4 }}
      >
        <svg className="w-8 h-8 text-teal-600 dark:text-teal-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      </motion.div>
    ),
    href: "/foretagstelefoni",
    title: "Företagstelefoni",
    description: "Moderna lösningar från paketerade mobiltelefoner och abonnemang till växlar, AI och headset.",
  },
]

// Fallback cases if Supabase is not available
const fallbackCases = [
  {
    title: "Komatsu Forest",
    description:
      "Upphandling och projektledning av en ny lösning för företagstelefonin med Microsoft Teams samt datanätsförbindelser till samtliga siter.",
  },
  {
    title: "Norrtech VVS",
    description:
      "Anpassade fordonsinredningar till uppdaterad flotta för ett mer effektivt arbete ute i fält.",
  },
  {
    title: "Railcare",
    description:
      "Paketerad hårdvara med livscykelhantering för drygt 200 anställda, samt intern avlastning med vår servicedesk för all support rörande företagstelefonin.",
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
    description: "Vi behöver först förstå era faktiska behov och krav genom en noggrann analys tillsammans.",
  },
  {
    icon: <FileCheck2 size={32} />,
    title: "02. Kvalificering",
    description: "Vi avgör tillsammans om vi är rätt partner för era behov.",
  },
  {
    icon: <Brush size={32} />,
    title: "03. Lösningsförslag",
    description: "Baserat på analysen tar vi fram ett anpassat lösningsförslag med ett tydligt värde.",
  },
  {
    icon: <FileCheck2 size={32} />,
    title: "04. Affärsförslag",
    description: "Vi kommer överens om ett konkret affärsförslag.",
  },
  {
    icon: <Code size={32} />,
    title: "05. Implementationsprojekt",
    description: "Vi sätter upp ett projekt för en framgångsrik implementation med nödvändiga tester och utbildning.",
  },
  {
    icon: <LifeBuoy size={32} />,
    title: "06. Support & Utveckling",
    description: "Efter projektets slut erbjuder vi löpande support, underhåll och vidareutveckling.",
  },
]

const experts = [
  {
    name: "Erik Damber",
    title: "Konsult",
    certs: ["Microsoft 365", "Intune", "Säkerhet"],
    avatar: "/media/team/erik-damber.jpg",
  },
  {
    name: "Robin Carlström",
    title: "Fordonstekniker",
    certs: ["Taxi", "Alkolås"],
    avatar: "/media/team/robin-carlstrom.jpg",
  },
  {
    name: "Konny Larsson",
    title: "Servicedesk IT",
    certs: ["IT & Företagstelefoni"],
    avatar: "/media/team/konny-larsson.jpg",
  },
]

export default function LandingPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentFormType, setCurrentFormType] = useState<'projekt' | 'general'>('projekt')
  const [cases, setCases] = useState<Array<{title: string, description: string}>>(fallbackCases)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCases() {
      try {
        const supabase = getAnonSupabase()
        const { data, error } = await supabase
          .from('case_studies')
          .select('client_name, summary')
          .eq('is_published', true)
          .eq('is_featured', true)
          .order('display_order', { ascending: true })
          .limit(3)

        if (data && data.length > 0) {
          setCases(data.map(c => ({
            title: c.client_name,
            description: c.summary
          })))
        }
      } catch (err) {
        console.error('Failed to fetch cases:', err)
        // Keep fallback cases
      } finally {
        setLoading(false)
      }
    }

    fetchCases()
  }, [])

  const handleOpenForm = (formType: 'projekt' | 'general') => {
    setCurrentFormType(formType)
    setIsFormOpen(true)
  }

  return (
    <>
      <FormModal open={isFormOpen} onClose={() => setIsFormOpen(false)} formType={currentFormType} />
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative min-h-[90vh] flex items-center justify-center text-center px-4 overflow-hidden">
            <OptimizedBackground variant="hero" className="absolute inset-0 z-0" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/95 to-background" />
            <div className="relative z-10 max-w-6xl mx-auto">
              <PaintableTextBrushV2
                text="StjärnaFyrkant Västerbotten"
                el="h1"
                paintColor="#fedb00"
                className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-extrabold tracking-tighter text-foreground mb-6"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="mt-4 h-20 md:h-24 flex items-center justify-center"
              >
                <Typewriter
                  text={["IT-Lösningar", "Fordonsteknik", "Radiokommunikation", "Företagstelefoni"]}
                  className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-primary"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
                className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
              >
                <ShineButton onClick={() => handleOpenForm('projekt')}>Starta ett projekt</ShineButton>
                <ShineButton
                  onClick={() => handleOpenForm('general')}
                  className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Hör av dig
                </ShineButton>
              </motion.div>
            </div>
          </section>

          {/* Customer Cases Section - Social Proof */}
          <section id="kundcase" className="py-24 md:py-32 dark:border-t bg-gray-100 dark:bg-card/20">
            <div className="container mx-auto relative z-10">
              <AnimatedText text="Senaste kundcase" el="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-center" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <motion.div whileHover={{ y: -5, scale: 1.02 }} className="lg:row-span-2">
                  <GlareCard className="bg-card/80 backdrop-blur-sm p-8 flex flex-col justify-center text-left h-full min-h-[24rem]">
                    <h3 className="text-3xl font-semibold">{cases[0].title}</h3>
                    <p className="text-muted-foreground mt-4 text-lg">{cases[0].description}</p>
                  </GlareCard>
                </motion.div>
                <motion.div whileHover={{ y: -5, scale: 1.02 }}>
                  <GlareCard className="bg-card/80 backdrop-blur-sm p-8 flex flex-col justify-center text-left h-full min-h-[11.5rem]">
                    <h3 className="text-xl sm:text-2xl font-semibold">{cases[1].title}</h3>
                    <p className="text-muted-foreground mt-2">{cases[1].description}</p>
                  </GlareCard>
                </motion.div>
                <motion.div whileHover={{ y: -5, scale: 1.02 }}>
                  <GlareCard className="bg-card/80 backdrop-blur-sm p-8 flex flex-col justify-center text-left h-full min-h-[11.5rem]">
                    <h3 className="text-xl sm:text-2xl font-semibold">{cases[2].title}</h3>
                    <p className="text-muted-foreground mt-2">{cases[2].description}</p>
                  </GlareCard>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Services Section - 2+2+1 Layout */}
          <section id="tjanster" className="py-24 md:py-32 dark:border-t relative">
            <div className="container mx-auto">
              <AnimatedText text="Våra tjänster" el="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center" />
              <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
                Helhetslösningar inom IT, fordonsteknik, radiokommunikation och företagstelefoni. Våra specialister hittar rätt lösning för dina behov.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* First 4 service cards in 2x2 grid */}
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
                        <h3 className="text-xl sm:text-2xl font-semibold">{service.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-6 flex-grow">{service.description}</p>
                      <Link href={service.href} passHref legacyBehavior>
                        <Button variant="outline" className="mt-auto bg-transparent">
                          Läs mer <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </SubtleCard>
                  </motion.div>
                ))}

                {/* Personlig Support card - full width on last row */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="md:col-span-2"
                >
                  <SubtleCard className="p-8 flex flex-col md:flex-row items-center gap-6 bg-card/80">
                    <div className="flex items-center gap-6 flex-1">
                      <div className="bg-primary/10 p-4 rounded-lg">
                        <LifeBuoy size={40} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-semibold mb-2">Personlig Support</h3>
                        <p className="text-muted-foreground">
                          Vi finns här för dig. Snabb och personlig hjälp när du behöver det som mest.
                        </p>
                      </div>
                    </div>
                    <Link href="/servicedesk" legacyBehavior passHref>
                      <Button variant="outline" className="bg-transparent shrink-0">
                        Gå till Support <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </SubtleCard>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section id="process" className="py-24 md:py-32 dark:border-t bg-gray-100 dark:bg-card/20">
            <div className="container mx-auto">
              <AnimatedText text="Vår process" el="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-center" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {processSteps.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15, type: "spring" }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="relative"
                  >
                    <SubtleCard className="p-8 flex flex-col items-center text-center h-full">
                      <div className="bg-primary/10 p-4 rounded-full mb-4">
                        {step.icon}
                      </div>
                      <h3 className="font-semibold text-xl mb-3">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </SubtleCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Certifications Section */}
          <section id="certifieringar" className="py-24 md:py-32 dark:border-t">
            <div className="container mx-auto">
              <AnimatedText text="Trygghet och kvalitet" el="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-center" />
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
              <AnimatedText text="Våra experter" el="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-center" />
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
                      <h3 className="text-xl sm:text-2xl font-semibold">{expert.name}</h3>
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
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Kontakta oss för en kostnadsfri behovsanalys och låt oss skapa framtidens lösningar för er.
              </p>
              <ShineButton onClick={() => handleOpenForm('general')}>Kontakta oss</ShineButton>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
