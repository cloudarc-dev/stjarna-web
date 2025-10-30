"use client"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedText } from "@/components/ui/animated-text"
import { SubtleCard } from "@/components/ui/subtle-card"
import { Heart, Shield, Award, Leaf, Users, Target, MapPin, Clock, Phone, Mail } from "lucide-react"
import { OptimizedBackground } from "@/components/ui/optimized-background"
// ChatWidget removed - to be replaced with UI-kit based chat interface

const principles = [
  {
    title: "Service",
    icon: <Heart className="w-8 h-8 text-primary" />,
    description:
      "Vi strävar alltid efter att överträffa kundernas förväntningar genom att vara lyhörda, förbättra oss själva och alltid bemöta människor internt och externt med ett vänligt bemötande.",
  },
  {
    title: "Ärlighet",
    icon: <Shield className="w-8 h-8 text-primary" />,
    description:
      "Vi visar respekt till kollegor, våra kunder och samarbetspartners genom att vara transparenta och ärliga. Vi är raka i vår kommunikation, tar ansvar för det vi säger och håller våra löften.",
  },
  {
    title: "Kvalité",
    icon: <Award className="w-8 h-8 text-primary" />,
    description: "Vi strävar alltid efter bästa möjliga upplevelse, omtanke och kompetens i det vi säger och gör.",
  },
]

const qualityPoints = [
  "Vi arbetar kontinuerligt med att förbättra våra arbetssätt och processer, så att våra kunders förväntningar och krav tillfredsställs.",
  "Vi har löpande en aktiv och öppen dialog med våra intressenter i förbättrande och förebyggande syfte.",
  "Vi jobbar med ständig kompetensutveckling för vår personal.",
  "Vi gör kontinuerliga kundundersökningar för att fånga upp kunders upplevelser, behov och förbättringssynpunkter.",
  "Vi reviderar våra tjänster och paketeringar löpande för att hitta nya smarta lösningar som ska täcka våra kunders behov på bästa sätt.",
  "Vi följer marknadstrender och är med på konferenser/seminarium/utbildningar för att hålla oss uppdaterade.",
  "Vi ställer krav på våra leverantörer för att säkerställa att de varor/tjänster vi levererar till våra kunder är av bästa kvalité i relation till efterfrågan.",
]

const workEnvironmentPoints = [
  "Ha ett löpande arbete med risker och möjligheter samt eliminera faror, som vi omsätter i tydliga handlingsplaner skapar vi en trygg och attraktiv arbetsplats.",
  "Vi har tydliga rutiner för hur vi samverkar med arbetstagare i arbetsmiljörelaterade frågor.",
  "Arbetsmiljöpolicyn finns tillgänglig vid begäran för kunder, leverantörer och UL så att dessa kan få kunskap om vårt arbetsmiljöarbete.",
  "Vi gör löpande insatser för att motivera personalstyrkan till fysisk aktivitet/friskvård.",
  "Vi utför kontinuerliga medarbetarundersökningar för att fånga upp anställdas åsikter. Det finns även en anonym tipslåda för att fånga upp sådant som anställda annars kanske inte vågar lyfta.",
  "Kontinuerligt skapa forum där anställda får vara med och påverka och framföra sina åsikter.",
  "Alltid ha personalens bästa i åtanke i alla beslut som tas.",
]

const environmentPoints = [
  "Alltid överväga miljömässiga konsekvenser i alla beslut.",
  "Arbeta systematiskt med våra miljömål.",
  "Hela tiden öka miljökompetensen och engagemanget hos våra anställda.",
  "Informera om och marknadsföra vårt miljöarbete och våra miljömässigt bästa produkter och tjänster.",
  "Använda leverantörer med en acceptabel miljöprestanda.",
  "Alltid arbeta för att förebygga och minska föroreningar, utsläpp och annan negativ miljöpåverkan.",
  "Vi ska alltid sträva efter att erbjuda våra kunder refurbished-produkter och uppmuntra kunden att lämna in gamla enheter till oss för återanvändning eller återvinning.",
]

export default function VerksamhetspolicyPage() {
  return (
    <>
      {/* ChatWidget placeholder - to be replaced with UI-kit based chat interface */}
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative py-24 md:py-32 dark:border-t text-center px-4">
            <div className="container mx-auto">
              <AnimatedText
                text="Verksamhetspolicy (KMA)"
                el="h1"
                animationType="soft"
                className="text-5xl md:text-7xl font-extrabold mb-6"
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-xl text-muted-foreground max-w-3xl mx-auto"
              >
                Våra grundprinciper och riktlinjer för kvalité, arbetsmiljö och miljöansvar
              </motion.p>
            </div>
          </section>

          {/* Grundprinciper Section */}
          <section className="py-24 md:py-32 dark:border-t">
            <div className="container mx-auto">
              <AnimatedText text="Våra grundprinciper" el="h2" animationType="soft" className="text-4xl font-bold mb-4 text-center" />
              <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16">
                Vi står för service, ärlighet och kvalité och dessa värdeord ska vara utgångspunkten i allt vi säger och
                gör.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                {principles.map((principle, i) => (
                  <motion.div
                    key={principle.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <SubtleCard className="p-8 h-full text-center">
                      <div className="flex justify-center mb-6">{principle.icon}</div>
                      <h3 className="text-2xl font-semibold mb-4">{principle.title}</h3>
                      <p className="text-muted-foreground">{principle.description}</p>
                    </SubtleCard>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
                className="mt-12 text-center"
              >
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Vår lägsta nivå ska alltid vara att vi följer relevant lagstiftning och bindande krav.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Kvalité Section */}
          <section className="py-24 md:py-32 dark:border-t bg-gray-100 dark:bg-card/20">
            <div className="container mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <Target className="w-10 h-10 text-primary" />
                    <AnimatedText text="Kvalité" el="h2" className="text-4xl font-bold" />
                  </div>
                  <p className="text-lg text-muted-foreground">
                    Vi vill alltid skapa hållbara lösningar som höjer våra kunders värde. Vårt arbete är affärskritiskt
                    vilket gör att vi måste vara snabbfotade, lyhörda, flexibla och ständigt utvecklas för att
                    säkerställa att vi med hjälp av rätt teknik kan effektivisera våra kunders verksamheter på bästa
                    sätt.
                  </p>
                </div>
                <SubtleCard className="p-8">
                  <h3 className="text-xl font-semibold mb-6">Det gör vi genom att:</h3>
                  <ul className="space-y-4">
                    {qualityPoints.map((point, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </SubtleCard>
              </div>
            </div>
          </section>

          {/* Arbetsmiljö Section */}
          <section className="py-24 md:py-32 dark:border-t">
            <div className="container mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                <SubtleCard className="p-8 order-2 lg:order-1">
                  <h3 className="text-xl font-semibold mb-6">Det gör vi genom att:</h3>
                  <ul className="space-y-4">
                    {workEnvironmentPoints.map((point, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </SubtleCard>
                <div className="order-1 lg:order-2">
                  <div className="flex items-center gap-4 mb-6">
                    <Users className="w-10 h-10 text-primary" />
                    <AnimatedText text="Arbetsmiljö" el="h2" className="text-4xl font-bold" />
                  </div>
                  <p className="text-lg text-muted-foreground">
                    StjärnaFyrkants vision är att vara den mest attraktiva arbetsgivaren genom att skapa en trygg och
                    bra arbetsmiljö som främjar initiativtagande, kreativitet, samarbete och utveckling. Vi vill att
                    alla anställda ska vilja rekommendera oss som arbetsgivare till personer med rätt kompetens.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Miljö Section */}
          <section className="py-24 md:py-32 dark:border-t bg-gray-100 dark:bg-card/20">
            <div className="container mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <Leaf className="w-10 h-10 text-primary" />
                    <AnimatedText text="Miljö" el="h2" className="text-4xl font-bold" />
                  </div>
                  <div className="space-y-4 text-lg text-muted-foreground">
                    <p>
                      För oss är det viktigt att ha kunskap om och förståelse kring vårt samspel med miljön och vår
                      omvärld. Vi jobbar aktivt för att orsaka så liten miljöpåverkan som möjligt.
                    </p>
                    <p>
                      Det inkluderar bland annat klimatkompensering, medvetna produktval, klimatneutrala varuleveranser,
                      hantering av avfall samt att lyfta miljömässiga värden för våra kunder och ge dem möjlighet att
                      göra miljömässigt medvetna val av produkter och tjänster.
                    </p>
                    <p>
                      Vi ska ständigt arbeta för att förbättra miljöarbetet på företaget och integrera miljöfrågorna i
                      våra affärer. På så sätt blir det en naturlig del i både personalens och våra kunders vardag.
                    </p>
                  </div>
                </div>
                <SubtleCard className="p-8">
                  <h3 className="text-xl font-semibold mb-6">Detta gör vi genom att:</h3>
                  <ul className="space-y-4">
                    {environmentPoints.map((point, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </SubtleCard>
              </div>
            </div>
          </section>

          {/* Contact Info Section */}
          <section className="py-24 md:py-32 dark:border-t">
            <div className="container mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <SubtleCard className="p-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Adress</h3>
                      <p className="text-muted-foreground text-sm">Förrådsvägen 15</p>
                      <p className="text-muted-foreground text-sm">901 32 Västerbotten</p>
                      <button className="text-primary hover:underline text-xs mt-2">Se vägbeskrivning</button>
                    </div>
                  </div>
                </SubtleCard>

                <SubtleCard className="p-6">
                  <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-primary" />
                    <div>
                      <h3 className="font-semibold mb-1">Telefon</h3>
                      <p className="text-muted-foreground text-sm">090-70 44 70</p>
                    </div>
                  </div>
                </SubtleCard>

                <SubtleCard className="p-6">
                  <div className="flex items-center gap-4">
                    <Mail className="w-6 h-6 text-primary" />
                    <div>
                      <h3 className="font-semibold mb-1">E-post</h3>
                      <p className="text-muted-foreground text-sm">umea@stjarnafyrkant.se</p>
                    </div>
                  </div>
                </SubtleCard>

                <SubtleCard className="p-6">
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Öppettider</h3>
                      <div className="space-y-1 text-muted-foreground text-sm">
                        <p>Mån-fre: 07:00-17:00</p>
                        <p>(Dag före röd dag 07:00-15:00)</p>
                        <p>Avvikande tider under v. 28-31: 08:00-16:00</p>
                      </div>
                    </div>
                  </div>
                </SubtleCard>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
