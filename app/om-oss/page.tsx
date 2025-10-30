"use client"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedText } from "@/components/ui/animated-text"
import { PaintableTextBrushV2 } from "@/components/ui/paintable-text-v2"
import { SubtleCard } from "@/components/ui/subtle-card"
import { ShineButton } from "@/components/ui/shine-button"
import { GlareCard } from "@/components/ui/glare-card"
import { Award, Leaf, Users, MapPin, Clock, Phone, ArrowRight } from "lucide-react"
import { useState } from "react"
import { UpsalesModal } from "@/upsalesmodul"
import Image from "next/image"
import { OptimizedBackground } from "@/components/ui/optimized-background"
// ChatWidget removed - to be replaced with UI-kit based chat interface

const isoCards = [
  {
    title: "Arbetsmiljö",
    standard: "ISO 45001",
    icon: <Users className="w-8 h-8 text-primary" />,
    description: "Säker och hälsosam arbetsmiljö för alla medarbetare",
  },
  {
    title: "Kvalité",
    standard: "ISO 9001",
    icon: <Award className="w-8 h-8 text-primary" />,
    description: "Kontinuerlig förbättring och högsta servicekvalitet",
  },
  {
    title: "Miljö",
    standard: "ISO 14001",
    icon: <Leaf className="w-8 h-8 text-primary" />,
    description: "Hållbart ansvar för miljön och framtida generationer",
  },
]

const departments = [
  {
    name: "Backoffice",
    members: [
      "Lina Sjöstedt - Inköp & backoffice",
      "Albin Kapstad - Backoffice",
      "Katarina Bjuhr - Backoffice",
      "Anneli Bogardi - Backoffice",
      "Nathalie Bodén - Backoffice",
      "Jonas Karlsson - Backoffice",
      "Linda Edlund - Ekonomi",
    ],
  },
  {
    name: "IT",
    members: [
      "Erik Damber - Konsult",
      "Jonnie Karlsson - Affärsutvecklare",
      "Kendy Larsson - Servicedesk IT",
      "Konny Larsson - Servicedesk IT",
      "Daniel Bennervall - Konsult",
      "Alexander Landby - IT-Chef",
      "Jens Nordström - Konsultchef",
      "Dominic Ek - IT Tekniker",
    ],
  },
  {
    name: "Fordonsteknik",
    members: [
      "Aron Hallberg - Servicetekniker",
      "Per Söderlind - Servicetekniker",
      "Oliver Karlsson - Servicetekniker",
      "Robert Fransson - Fordonstekniker",
      "Jacob Lundholm - Fordonstekniker",
      "Andreas Lundqvist - Verkstadschef Umeå",
      "Martin Svarvare - Fordonstekniker",
      "Kamil Dziwniel - Fordonstekniker",
      "Urban Eriksson - Verkstadschef Skellefteå",
      "Stefan Malmgren - Fordonstekniker",
    ],
  },
  {
    name: "Försäljning",
    members: [
      "Ludvig Johansson - Kundansvarig",
      "Leo Lindgren - Butikssäljare",
      "Lucas Englund - Butikssäljare",
      "Theo Salqvist - Butikssäljare",
      "Patric Junes - Kundansvarig",
      "Urban Spetz - Industriförsäljning",
      "Andreas Lindfors - Kundansvarig",
      "Anton Forsberg - Kundansvarig",
      "Mattias Rigertzon - Kundansvarig",
      "Anders Skogebrandt - Säljare e-handel",
      "Radion Golubenko - Kundansvarig",
      "Oscar Wiklund - Avdelningschef E-handel",
    ],
  },
  {
    name: "Ledning",
    members: [
      "Lin Haspel - Vice VD & KMA",
      "Niklas Bjuhr - VD",
      "Joakim Silén - Platschef Skellefteå",
      "Sebastian A. Bjuhr - Säljchef & Marknad",
    ],
  },
]

export default function OmOssPage() {
  const [upsalesOpen, setUpsalesOpen] = useState(false);
  const locations = [
    {
      city: "Umeå",
      address: "Förrådsvägen 15, 901 32 Umeå",
      phone: "090-70 44 70",
      hours: [
        "Helgfria vardagar 07:00 - 17:00",
        "Dag före röd dag 07:00 - 15:00",
        "Avvikande v. 28-31: 08:00 - 16:00",
      ],
    },
    {
      city: "Skellefteå",
      address: "Företagsvägen 1, 931 57 Skellefteå",
      phone: "0910-71 12 20",
      hours: [
        "Helgfria vardagar 08:00 - 17:00 (fre 08:00 - 16:00)",
        "Dag före röd dag 07:00 - 15:00",
        "Stängt v. 29-30",
      ],
    },
  ];

  return (
    <>
      {/* ChatWidget placeholder - to be replaced with UI-kit based chat interface */}
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center text-center px-4">
            <div className="absolute inset-0 overflow-hidden -z-10">
              <Image
                src="/placeholder.svg?height=1080&width=1920"
                alt="Västerbottens landskap"
                fill
                className="object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
            </div>
            {/* Mystical animated background - moved above image/gradient for visibility */}
            <OptimizedBackground variant="minimal" className="absolute inset-0 z-0" />
            <div className="relative z-10 max-w-4xl mx-auto">
              <PaintableTextBrushV2 text="Personligt partnerskap" paintColor="#fedb00" el="h1" className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold mb-6" />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
              >
                Med rätt teknik, en lokal närvaro och ett stort hållbart ansvar hjälper vi till att skapa framtidens starkare företagsmarknad.
              </motion.p>
            </div>
          </section>

          {/* About Section */}
          <section className="py-24 md:py-32 dark:border-t">
            <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <AnimatedText text="Om StjärnaFyrkant Västerbotten" el="h2" className="text-4xl font-bold mb-6" />
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>
                    Vi är en del av den nationella franchisen StjärnaFyrkant sedan 2003 och har arbetat lokalt i Västerbotten i över 40 år.
                  </p>
                  <p>
                    Vårt uppdrag är att göra det enkelt för dig att driva verksamhet med rätt teknik på plats, oavsett om du befinner dig på kontoret, i fordonet eller ute på fält.
                  </p>
                  <p>
                    Från första behovsanalys till implementation och löpande support är vi en partner som tar ansvar på riktigt.
                  </p>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                viewport={{ once: true }}
              >
                <Image
                  src="/media/Om oss.jpg"
                  alt="StjärnaFyrkant team"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-2xl"
                />
              </motion.div>
            </div>
          </section>

          {/* Därför väljer företag oss Section */}
          <section className="py-24 md:py-32 dark:border-t bg-gray-100 dark:bg-card/20">
            <div className="container mx-auto max-w-4xl">
              <AnimatedText text="Därför väljer företag oss" el="h2" className="text-4xl font-bold mb-12 text-center" />
              <div className="grid gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="w-2 h-2 mt-2 bg-primary rounded-full flex-shrink-0" />
                  <p className="text-lg text-muted-foreground">
                    Personligt service och snabb hjälp när det verkligen behövs.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="w-2 h-2 mt-2 bg-primary rounded-full flex-shrink-0" />
                  <p className="text-lg text-muted-foreground">
                    Vår erfarenhet och breda erbjudande skapar färre kontaktytor för den dagliga driften.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="w-2 h-2 mt-2 bg-primary rounded-full flex-shrink-0" />
                  <p className="text-lg text-muted-foreground">
                    Egen verkstad och butik för tillgänglighet, installationer och reparationer.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="w-2 h-2 mt-2 bg-primary rounded-full flex-shrink-0" />
                  <p className="text-lg text-muted-foreground">
                    En smidig och anpassad köpupplevelse med leverans över hela Sverige.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="w-2 h-2 mt-2 bg-primary rounded-full flex-shrink-0" />
                  <p className="text-lg text-muted-foreground">
                    Ärlig och professionell rådgivning med högsta kvalitet i fokus som ger faktisk nytta.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Work With Us Section - Moved up for visibility */}
          <section className="py-24 md:py-32 dark:border-t bg-gray-100 dark:bg-card/20">
            <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <AnimatedText text="Jobba med oss" el="h2" className="text-4xl font-bold mb-6" />
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>
                    Hjärtat i vår verksamhet är våra medarbetare och som anställd hos oss får du dela dina dagar med
                    riktigt duktiga och härliga kollegor som alla drivs av att göra det där lilla extra – både för våra
                    kunder och varandra.
                  </p>
                  <p>
                    Tillsammans skapar vi en arbetsplats som präglas av öppenhet, gemenskap, eget ansvar och där alla
                    medarbetare ska ha en möjlighet att växa, utvecklas och få vara med och påverka.
                  </p>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="mt-8 p-6 bg-primary/10 rounded-xl border border-primary/20"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <Award className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="font-bold text-lg">Nominerad till</h3>
                      <p className="text-primary font-semibold">Årets Arbetsgivare 2023!</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="mt-8"
                >
                  <a href="/karriar">
                    <ShineButton className="w-full">
                      Se lediga tjänster <ArrowRight className="ml-2 h-4 w-4" />
                    </ShineButton>
                  </a>
                </motion.div>
              </div>
              <SubtleCard className="p-8">
                <blockquote className="text-lg italic text-muted-foreground mb-4">
                  "Vi har tillsammans hittat nya vägar framåt, utvecklat och kommit på lösningar för att effektivisera
                  och optimera. De finns alltid nära till hands när vi behöver dem och ger en service i Stjärnklass.
                  Hela deras team är på alerten och ger ett väldigt trevligt bemötande."
                </blockquote>
                <div className="flex items-center gap-4">
                  <Image
                    src="/media/kund/nina-karlsson.jpeg"
                    alt="Nina Karlsson"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">Nina Karlsson</p>
                    <p className="text-sm text-muted-foreground">FD Inköpsansvarig, Edukatus</p>
                  </div>
                </div>
              </SubtleCard>
            </div>
          </section>

          {/* ISO Section */}
          <section className="py-24 md:py-32 dark:border-t">
            <div className="container mx-auto">
              <div className="text-center mb-16">
                <AnimatedText text="ISO-arbete" el="h2" className="text-4xl font-bold mb-4" />
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Det är inte bara en stämpel att visa upp. Det är ett kontinuerligt arbete för att skapa en stabil
                  verksamhet som både personal och kunder kan lita på.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {isoCards.map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <GlareCard className="p-8 flex flex-col items-center text-center h-full bg-card/80 backdrop-blur-sm">
                      <div className="mb-6">{card.icon}</div>
                      <h3 className="text-2xl font-semibold mb-2">{card.title}</h3>
                      <p className="text-primary font-bold text-lg mb-4">{card.standard}</p>
                      <p className="text-muted-foreground">{card.description}</p>
                    </GlareCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="py-24 md:py-32 dark:border-t">
            <div className="container mx-auto">
              <AnimatedText text="Våra stjärnor" el="h2" className="text-4xl font-bold mb-16 text-center" />
              <div className="space-y-12">
                {departments.map((dept, i) => (
                  <motion.div
                    key={dept.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <SubtleCard className="p-8">
                      <h3 className="text-2xl font-bold mb-6 text-primary">{dept.name}</h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {dept.members.map((member) => (
                          <div key={member} className="p-3 bg-secondary/50 rounded-lg">
                            <p className="text-sm">{member}</p>
                          </div>
                        ))}
                      </div>
                    </SubtleCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Info Section */}
          <section className="py-24 md:py-32 dark:border-t bg-gray-100 dark:bg-card/20">
            <div className="container mx-auto">
              <AnimatedText text="Besök oss" el="h2" className="text-4xl font-bold mb-16 text-center" />
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {locations.map((loc, i) => (
                  <motion.div
                    key={loc.city}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <GlareCard className="p-8 flex flex-col gap-4 bg-card/80 backdrop-blur-sm h-full">
                      <h3 className="text-2xl font-bold text-primary mb-2">{loc.city}</h3>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary mt-0.5" />
                        <p>{loc.address}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-primary" />
                        <p>{loc.phone}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-primary mt-0.5" />
                        <div className="space-y-1 text-sm text-muted-foreground">
                          {loc.hours.map((h) => (
                            <p key={h}>{h}</p>
                          ))}
                        </div>
                      </div>
                      <ShineButton onClick={() => setUpsalesOpen(true)} className="mt-auto w-full !py-2">
                        Skicka meddelande
                      </ShineButton>
                    </GlareCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <UpsalesModal open={upsalesOpen} onClose={() => setUpsalesOpen(false)} />
<Footer />
      </div>
    </>
  )
}
