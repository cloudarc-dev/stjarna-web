"use client"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedText } from "@/components/ui/animated-text"
import { SubtleCard } from "@/components/ui/subtle-card"
import { GlareCard } from "@/components/ui/glare-card"
import { ShineButton } from "@/components/ui/shine-button"
import { Phone, Radio, Users, Search, Code, Rocket, MessageSquare } from "lucide-react"
import Image from "next/image"
import { MysticalBackground } from "@/components/ui/mystical-background"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
// ChatWidget removed - to be replaced with UI-kit based chat interface

const serviceCategories = [
  {
    title: "Telefonilösningar & Konferenssystem",
    icon: <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>,
    description: "Mobiltelefoner, abonnemang, headset, moderna konferenssystem och IP-telefoni.",
  },
  {
    title: "Komradio & Täckningsförstärkning",
    icon: <Radio className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
    description: "Installationer för industri & räddningstjänst, inomhustäckning, repeaters och gruppkommunikation.",
  },
  {
    title: "Upphandling & Implementation",
    icon: <Search className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
    description: "Behovsanalys, kravställning, projektledning och smidig driftsättning av nya system.",
  },
  {
    title: "Service & Support",
    icon: <MessageSquare className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
    description: "Löpande serviceavtal, användarutbildning och snabb felsökning både på plats och distans.",
  },
]

const processSteps = [
  { icon: <Search size={32} />, title: "01. Behovsanalys & rådgivning" },
  { icon: <Code size={32} />, title: "02. Design & offert" },
  { icon: <Users size={32} />, title: "03. Implementation & utbildning" },
  { icon: <Rocket size={32} />, title: "04. Löpande support & utveckling" },
]

const experts = [
  {
    name: "Maria Johansson",
    title: "Telekom- & VoIP-specialist",
    certs: ["Cisco Certified", "Microsoft Teams Voice"],
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Oskar Nilsson",
    title: "Komradioingenjör",
    certs: ["Hytera Partner", "Kapsch Radio"],
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

const faqItems = [
  {
    question: "Kan ni hjälpa till med upphandling av operatörsavtal?",
    answer:
      "Ja, vi analyserar era samtalsmönster och behov för att förhandla fram det bästa och mest kostnadseffektiva avtalet för er.",
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

export default function KommunikationsteknikPage() {
  return (
    <>
      {/* ChatWidget placeholder - to be replaced with UI-kit based chat interface */}
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative min-h-[80vh] flex items-center justify-center text-center px-4">
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/95 to-background" />
            <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)/0.1),transparent)]" />
            <MysticalBackground variant="hero" />
            <div className="relative z-10">
              <AnimatedText
                text="Kommunikationsteknik i Västerbotten"
                el="h1"
                className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter"
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="max-w-3xl mx-auto mt-6 text-lg text-muted-foreground"
              >
                Från mobil & VoIP till komradio – framtidssäkra lösningar som förbättrar samarbetet och ökar säkerheten.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="mt-10"
              >
                <ShineButton>Boka kostnadsfri kommunikationsanalys</ShineButton>
              </motion.div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-24 md:py-32 dark:border-t">
            <div className="container mx-auto grid lg:grid-cols-3 gap-16">
              <div className="lg:col-span-1 lg:sticky top-32 self-start">
                <AnimatedText text="Våra Tjänstekategorier" el="h2" className="text-4xl font-bold mb-4" />
                <p className="text-lg text-muted-foreground">
                  Helhetslösningar inom kommunikation – vi hjälper er hela vägen.
                </p>
              </div>
              <div className="lg:col-span-2 space-y-8">
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
                          className="bg-primary/10 p-4 rounded-lg"
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

          {/* Cases Section */}
          <section className="py-24 md:py-32 dark:border-t bg-gray-100 dark:bg-card/20">
            <div className="container mx-auto">
              <AnimatedText text="Lokala Kundcase" el="h2" className="text-4xl font-bold mb-12 text-center" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 border rounded-xl bg-background text-center">
                  <h3 className="font-bold text-xl">Räddningstjänsten Västerbotten</h3>
                  <p className="text-muted-foreground mt-2">
                    Installation av digital komradio & inomhustäckning i stationer.
                  </p>
                </div>
                <div className="p-8 border rounded-xl bg-background text-center">
                  <h3 className="font-bold text-xl">Västerbotten Energi</h3>
                  <p className="text-muted-foreground mt-2">
                    IP-baserad växellösning med 350 anknytningar & headset-deployment.
                  </p>
                </div>
                <div className="p-8 border rounded-xl bg-background text-center">
                  <h3 className="font-bold text-xl">Logistik AB Norr</h3>
                  <p className="text-muted-foreground mt-2">
                    Fleet-kommunikation via 4G/5G för samtliga transportfordon.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-24 md:py-32 dark:border-t">
            <div className="container mx-auto">
              <AnimatedText text="Vår Tjänsteprocess" el="h2" className="text-4xl font-bold mb-12 text-center" />
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
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Experts & FAQ Section */}
          <section className="py-24 md:py-32 dark:border-t bg-gray-100 dark:bg-card/20">
            <div className="container mx-auto grid lg:grid-cols-5 gap-16">
              <div className="lg:col-span-2">
                <AnimatedText text="Våra Experter" el="h2" className="text-4xl font-bold mb-8" />
                <div className="space-y-8">
                  {experts.map((expert) => (
                    <SubtleCard key={expert.name} className="p-6 flex items-center gap-6">
                      <Image
                        src={expert.avatar || "/placeholder.svg"}
                        alt={`Porträtt av ${expert.name}`}
                        width={80}
                        height={80}
                        className="rounded-full border-2 border-primary"
                      />
                      <div>
                        <h3 className="text-xl font-semibold">{expert.name}</h3>
                        <p className="text-primary font-medium text-sm">{expert.title}</p>
                      </div>
                    </SubtleCard>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-3">
                <AnimatedText text="Vanliga frågor" el="h2" className="text-4xl font-bold mb-8" />
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
