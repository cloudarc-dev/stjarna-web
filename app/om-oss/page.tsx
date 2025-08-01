"use client"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedText } from "@/components/ui/animated-text"
import { SubtleCard } from "@/components/ui/subtle-card"
import { GlareCard } from "@/components/ui/glare-card"
import { Award, Leaf, Users, MapPin, Clock, Phone, Mail } from "lucide-react"
import Image from "next/image"
import { MysticalBackground } from "@/components/ui/mystical-background"
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
      "Robin Lindahl - Tekniker",
      "Aron Hallberg - Service- & fordonsteknik",
      "Per Söderlind - Servicetekniker",
      "Oliver Karlsson - Servicetekniker",
      "Robert Fransson - Tekniker",
      "Jacob Lundholm - Tekniker",
      "Andreas Lundqvist - Verkstadschef Umeå",
      "Martin Svarvare - Tekniker",
      "Kamil Dziwniel - Tekniker",
      "Urban Eriksson - Verkstadschef Skellefteå",
      "Stefan Malmgren - Tekniker",
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
      "Urban Spetz - Kundansvarig",
      "Andreas Lindfors - Kundansvarig",
      "Anton Forsberg - Kundansvarig",
      "Mattias Rigertzon - Kundansvarig",
      "Sebastian A. Bjuhr - Säljchef",
      "Radion Golubenko - Kundansvarig",
      "Oscar Wiklund - Avdelningschef E-handel",
      "Anders Skogebrandt - Marknad & försäljning",
      "Joakim Silén - Kundansvarig & Platschef Skellefteå",
    ],
  },
  {
    name: "Ledning",
    members: ["Lin Haspel - Vice VD & KMA", "Niklas Bjuhr - VD"],
  },
]

export default function OmOssPage() {
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
                alt="Västerbottens landskap"
                fill
                className="object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
            </div>
            {/* Mystical animated background - moved above image/gradient for visibility */}
            <MysticalBackground variant="hero" className="absolute inset-0 z-0" />
            <div className="relative z-10 max-w-4xl mx-auto">
              <AnimatedText text="Vässa din verksamhet" el="h1" className="text-6xl md:text-8xl font-extrabold mb-6" />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
              >
                Med rätt teknik, en lokal närvaro och ett stort, hållbart ansvar hjälper vi Västerbottens företag att
                utvecklas. Tillsammans bygger vi framtidens, starkare Västerbotten.
              </motion.p>
            </div>
          </section>

          {/* About Section */}
          <section className="py-24 md:py-32 border-t">
            <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <AnimatedText text="Om StjärnaFyrkant Umeå" el="h2" className="text-4xl font-bold mb-6" />
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>
                    StjärnaFyrkant är ett driftbolag som tillhandahåller rätt teknik så att ni har rätt förutsättningar
                    att utveckla er verksamhet. Vi har verkat i Västerbotten med kompetens inom Kommunikations-,
                    Informations- och Fordonsteknik i 40 år.
                  </p>
                  <p>
                    Hos oss får du professionell service av högsta kvalité när du besöker vår butik, vår serviceverkstad
                    och när vi besöker er ute på fält.
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
                  src="/placeholder.svg?height=400&width=600"
                  alt="StjärnaFyrkant team"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-2xl"
                />
              </motion.div>
            </div>
          </section>

          {/* Teknikstress Section */}
          <section className="py-24 md:py-32 border-t bg-gray-100 dark:bg-card/50">
            <div className="container mx-auto">
              <div className="max-w-4xl mx-auto text-center">
                <AnimatedText text="Vi minskar teknikstress" el="h2" className="text-4xl font-bold mb-8" />
                <div className="text-lg text-muted-foreground space-y-4">
                  <p>
                    Arbetsmiljöupplysningen beskriver Teknikstress ganska väl: "Tekniken underlättar vårt arbete då
                    information blir lättare att nå och dela. Tyvärr kan tekniken även ha negativa effekter. Mängden
                    information kan upplevas som stressande och svår att sortera."
                  </p>
                  <p>
                    "Känslan av att behöva vara tillgänglig och snabb att återkoppla skapar en konstant press. Dessutom
                    kan irritation uppstå när tekniken strular och du tvingas vänta."
                  </p>
                  <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-2xl font-semibold text-primary"
                  >
                    Tur nog kan det förebyggas. Vi minskar teknikstress.
                  </motion.p>
                </div>
              </div>
            </div>
          </section>

          {/* ISO Section */}
          <section className="py-24 md:py-32 border-t">
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

          {/* Work With Us Section */}
          <section className="py-24 md:py-32 border-t bg-gray-100 dark:bg-card/50">
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
              </div>
              <SubtleCard className="p-8">
                <blockquote className="text-lg italic text-muted-foreground mb-4">
                  "Vi har tillsammans hittat nya vägar framåt, utvecklat och kommit på lösningar för att effektivisera
                  och optimera. De finns alltid nära till hands när vi behöver dem och ger en service i Stjärnklass.
                  Hela deras team är på alerten och ger ett väldigt trevligt bemötande."
                </blockquote>
                <div className="flex items-center gap-4">
                  <Image
                    src="/placeholder.svg?height=60&width=60"
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

          {/* Team Section */}
          <section className="py-24 md:py-32 border-t">
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
          <section className="py-24 md:py-32 border-t bg-gray-100 dark:bg-card/50">
            <div className="container mx-auto grid md:grid-cols-2 gap-16">
              <div>
                <AnimatedText text="Besök oss" el="h2" className="text-4xl font-bold mb-8" />
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Förrådsvägen 15</p>
                      <p className="text-muted-foreground">901 32 Umeå</p>
                      <button className="text-primary hover:underline text-sm">Se vägbeskrivning</button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-primary" />
                    <p>090-70 44 70</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="w-6 h-6 text-primary" />
                    <p>umea@stjarnafyrkant.se</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Öppettider</p>
                      <p className="text-muted-foreground">Mån-fre: 07:00-17:00</p>
                      <p className="text-sm text-muted-foreground">(Dag före röd dag 07:00-15:00)</p>
                      <p className="text-sm text-muted-foreground">Avvikande tider under v. 28-31: 08:00-16:00</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, type: "spring" }}
                  viewport={{ once: true }}
                >
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="StjärnaFyrkant kontor"
                    width={400}
                    height={400}
                    className="rounded-xl shadow-2xl"
                  />
                </motion.div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
