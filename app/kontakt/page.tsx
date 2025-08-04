"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedText } from "@/components/ui/animated-text"
import { ShineButton } from "@/components/ui/shine-button"
import { Button } from "@/components/ui/button"
import { SubtleCard } from "@/components/ui/subtle-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Clock, Phone, Mail, Shield } from "lucide-react"
import Image from "next/image"
import { MysticalBackground } from "@/components/ui/mystical-background"
import { UpsalesModal } from "@/components/upsales-modal"
// ChatWidget removed - to be replaced with UI-kit based chat interface

export default function KontaktPage() {
  const [isUpsalesOpen, setIsUpsalesOpen] = useState(false)

  return (
    <>
      {/* ChatWidget placeholder - to be replaced with UI-kit based chat interface */}
      <div className="flex flex-col min-h-screen bg-background">
      <UpsalesModal open={isUpsalesOpen} onClose={() => setIsUpsalesOpen(false)} />
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative min-h-[60vh] flex items-center justify-center text-center px-4">
            <div className="absolute inset-0 overflow-hidden -z-10">
              <Image
                src="/placeholder.svg?height=800&width=1920"
                alt="Kontakta oss"
                fill
                className="object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
            </div>
            <MysticalBackground variant="hero" className="absolute inset-0 z-0" />
            <div className="relative z-10 max-w-4xl mx-auto">
              <AnimatedText text="Vässa din verksamhet" el="h1" className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6" />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
              >
                Som ett lokalt företag är vi dedikerade att erbjuda snabb och lättillgänglig support för alla era
                tekniska hård- och mjukvarubehov.
              </motion.p>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-24 md:py-32 dark:border-t">
            <div className="container mx-auto">
              <div className="max-w-4xl mx-auto text-center">
                <AnimatedText
                  text="Vi ska vara ärliga, grundliga och tillförlitliga i vår support"
                  el="h2"
                  className="text-4xl font-bold mb-8"
                />
                <div className="text-lg text-muted-foreground space-y-4">
                  <p>
                    Vi förstår att ingen är perfekt, men vi har som mål att vara den mest pålitliga supporten du är i
                    kontakt med. Vi ska följa upp och fullfölja våra uppgifter, så att vi säkerställer den högsta
                    möjliga drifttiden för er tekniska utrustning.
                  </p>
                  <p>
                    Vi tar vårt löfte att leverera pålitlig support på största allvar. Målet är att lindra er
                    teknikstress och vara det stöd som ni kan lita på, så att ni kan fokusera på att växa ert företag.
                  </p>
                  <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-2xl font-semibold text-primary"
                  >
                    Tveka inte att kontakta oss om ni har några frågor eller behöver hjälp.
                  </motion.p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Form & Info Section */}
          <section className="py-24 md:py-32 dark:border-t bg-gray-100 dark:bg-card/20">
            <div className="container mx-auto grid lg:grid-cols-2 gap-16">
              <div>
                <AnimatedText text="Låt oss hjälpa dig!" el="h2" className="text-4xl font-bold mb-6" />
                <p className="text-lg text-muted-foreground mb-8">
                  Vår uppgift är att avlasta dig och din organisation från de tekniska utmaningar som hör till att driva
                  en verksamhet i dagens samhälle. Fyll gärna i formuläret.
                </p>
                <SubtleCard className="p-8">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Namn <span className="text-destructive">*</span>
                        </Label>
                        <Input id="name" placeholder="Ditt namn" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-post</Label>
                        <Input id="email" type="email" placeholder="din@email.se" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Företag</Label>
                      <Input id="company" placeholder="Ditt företag" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input id="phone" placeholder="070-123 45 67" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Meddelande</Label>
                      <textarea
                        id="message"
                        rows={4}
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Berätta om ditt projekt eller dina behov..."
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <ShineButton className="flex-1">Skicka meddelande</ShineButton>
                      <Button variant="outline" onClick={() => setIsUpsalesOpen(true)}>
                        Alternativt kontaktformulär
                      </Button>
                    </div>
                  </form>
                </SubtleCard>
              </div>

              <div>
                <AnimatedText text="Kontaktinformation" el="h2" className="text-4xl font-bold mb-8" />
                <div className="space-y-8">
                  <SubtleCard className="p-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold mb-2">Besöksadress</h3>
                        <p className="text-muted-foreground">Förrådsvägen 15</p>
                        <p className="text-muted-foreground">901 32 Västerbotten</p>
                        <button className="text-primary hover:underline text-sm mt-2">Se vägbeskrivning</button>
                      </div>
                    </div>
                  </SubtleCard>

                  <SubtleCard className="p-6">
                    <div className="flex items-center gap-4">
                      <Phone className="w-6 h-6 text-primary" />
                      <div>
                        <h3 className="font-semibold mb-1">Telefon</h3>
                        <p className="text-muted-foreground">090-70 44 70</p>
                      </div>
                    </div>
                  </SubtleCard>

                  <SubtleCard className="p-6">
                    <div className="flex items-center gap-4">
                      <Mail className="w-6 h-6 text-primary" />
                      <div>
                        <h3 className="font-semibold mb-1">E-post</h3>
                        <p className="text-muted-foreground">umea@stjarnafyrkant.se</p>
                      </div>
                    </div>
                  </SubtleCard>

                  <SubtleCard className="p-6">
                    <div className="flex items-start gap-4">
                      <Clock className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold mb-2">Öppettider</h3>
                        <div className="space-y-1 text-muted-foreground">
                          <p>Mån-fre: 07:00-17:00</p>
                          <p className="text-sm">(Dag före röd dag 07:00-15:00)</p>
                          <p className="text-sm">Avvikande tider under v. 28-31: 08:00-16:00</p>
                        </div>
                      </div>
                    </div>
                  </SubtleCard>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mt-8"
                  >
                    <Image
                      src="/placeholder.svg?height=300&width=400"
                      alt="StjärnaFyrkant kontor"
                      width={400}
                      height={300}
                      className="rounded-xl shadow-lg w-full"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* Trust Section */}
          <section className="py-24 md:py-32 dark:border-t">
            <div className="container mx-auto text-center">
              <div className="flex items-center justify-center gap-4 mb-8">
                <Shield className="w-12 h-12 text-primary" />
                <AnimatedText text="Trygg och säker hantering" el="h2" className="text-4xl font-bold" />
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                All information behandlas konfidentiellt enligt GDPR. Vi kontaktar dig inom 24 timmar för att diskutera
                dina behov och hur vi bäst kan hjälpa dig.
              </p>
              <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>GDPR-säker</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>ISO-certifierat</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Lokal närvaro</span>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
