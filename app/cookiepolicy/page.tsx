"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedText } from "@/components/ui/animated-text"
import { SubtleCard } from "@/components/ui/subtle-card"
import { Cookie, Settings, BarChart3, Target, Clock } from "lucide-react"
import Link from "next/link"

const cookieCategories = [
  {
    icon: <Settings className="w-6 h-6 text-primary" />,
    title: "Nödvändiga cookies",
    required: true,
    description: "Dessa cookies är nödvändiga för att webbplatsen ska fungera korrekt och kan inte stängas av i våra system.",
    examples: [
      {
        name: "cookie-consent",
        purpose: "Lagrar dina cookie-inställningar",
        duration: "1 år",
        type: "Första part",
      },
      {
        name: "session",
        purpose: "Håller dig inloggad under ditt besök",
        duration: "Session",
        type: "Första part",
      },
    ],
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-primary" />,
    title: "Analys-cookies",
    required: false,
    description: "Dessa cookies hjälper oss att förstå hur besökare interagerar med webbplatsen genom att samla in och rapportera information anonymt.",
    examples: [
      {
        name: "_ga, _ga_*",
        purpose: "Google Analytics - Används för att skilja användare åt",
        duration: "2 år",
        type: "Tredje part (Google)",
      },
      {
        name: "_gid",
        purpose: "Google Analytics - Används för att skilja användare åt",
        duration: "24 timmar",
        type: "Tredje part (Google)",
      },
    ],
  },
  {
    icon: <Target className="w-6 h-6 text-primary" />,
    title: "Marknadsföring-cookies",
    required: false,
    description: "Dessa cookies används för att spåra besökare över webbplatser. Avsikten är att visa annonser som är relevanta och engagerande.",
    examples: [
      {
        name: "_fbp",
        purpose: "Facebook Pixel - Används för remarketing och konverteringsspårning",
        duration: "3 månader",
        type: "Tredje part (Meta)",
      },
      {
        name: "NID, CONSENT",
        purpose: "Google Ads - Används för personaliserad marknadsföring",
        duration: "6 månader",
        type: "Tredje part (Google)",
      },
    ],
  },
]

const browserInstructions = [
  {
    browser: "Chrome",
    steps: "Inställningar → Sekretess och säkerhet → Cookies och andra webbplatsdata",
  },
  {
    browser: "Firefox",
    steps: "Inställningar → Sekretess & Säkerhet → Cookies och webbplatsdata",
  },
  {
    browser: "Safari",
    steps: "Inställningar → Sekretess → Hantera webbplatsdata",
  },
  {
    browser: "Edge",
    steps: "Inställningar → Cookies och webbplatsbehörigheter → Hantera och ta bort cookies",
  },
]

export default function CookiepolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 border-b">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Cookie className="w-8 h-8 text-primary" />
                </div>
              </div>
              <AnimatedText text="Cookiepolicy" el="h1" className="text-4xl md:text-5xl font-bold mb-4" />
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Denna cookiepolicy förklarar vad cookies är, hur vi använder dem, och hur du kan hantera dina
                cookie-inställningar.
              </p>
            </motion.div>
          </div>
        </section>

        {/* What are Cookies */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-4xl">
            <SubtleCard className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">Vad är cookies?</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Cookies är små textfiler som placeras på din dator eller mobila enhet när du besöker en webbplats.
                  Cookies används i stor utsträckning för att få webbplatser att fungera mer effektivt, samt för att
                  ge information till webbplatsens ägare.
                </p>
                <p>
                  Cookies kan vara "persistent" (förblir på din enhet tills du tar bort dem eller de går ut) eller
                  "session" cookies (som endast finns kvar tills du stänger din webbläsare).
                </p>
                <p>
                  Vi använder både första parts cookies (satta av oss) och tredje parts cookies (satta av externa
                  tjänster som Google Analytics eller Facebook).
                </p>
              </div>
            </SubtleCard>
          </div>
        </section>

        {/* Cookie Categories */}
        <section className="py-16 md:py-24 bg-gray-100 dark:bg-card/20">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Vilka cookies använder vi?</h2>
            <div className="space-y-8">
              {cookieCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <SubtleCard className="p-6 md:p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        {category.icon}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold">{category.title}</h3>
                          {category.required && (
                            <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                              Krävs
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground">{category.description}</p>
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      {category.examples.map((example, i) => (
                        <div key={i} className="bg-muted/50 rounded-lg p-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="font-semibold text-sm mb-1">Cookie-namn</p>
                              <p className="text-sm text-muted-foreground font-mono">{example.name}</p>
                            </div>
                            <div>
                              <p className="font-semibold text-sm mb-1">Typ</p>
                              <p className="text-sm text-muted-foreground">{example.type}</p>
                            </div>
                            <div>
                              <p className="font-semibold text-sm mb-1">Syfte</p>
                              <p className="text-sm text-muted-foreground">{example.purpose}</p>
                            </div>
                            <div>
                              <p className="font-semibold text-sm mb-1 flex items-center gap-2">
                                <Clock className="w-4 h-4" /> Varaktighet
                              </p>
                              <p className="text-sm text-muted-foreground">{example.duration}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SubtleCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Purpose Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-4xl">
            <SubtleCard className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">Varför använder vi cookies?</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Nödvändiga funktioner</h3>
                  <p>
                    Vi använder cookies för att tillhandahålla grundläggande funktioner som säker inloggning,
                    kundvagn och att komma ihåg dina cookie-preferenser.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Förbättra användarupplevelsen</h3>
                  <p>
                    Cookies hjälper oss att förstå hur du använder vår webbplats så att vi kan förbättra
                    navigeringen, innehållet och funktionaliteten.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Analys och prestanda</h3>
                  <p>
                    Vi använder analys-cookies för att samla in anonym statistik om besökare, vilket hjälper oss att
                    optimera webbplatsen och förstå vilka sidor som är mest populära.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Marknadsföring och personalisering</h3>
                  <p>
                    Med ditt samtycke använder vi marknadsföring-cookies för att visa relevanta annonser och erbjudanden
                    baserat på dina intressen.
                  </p>
                </div>
              </div>
            </SubtleCard>
          </div>
        </section>

        {/* Third Party Services */}
        <section className="py-16 md:py-24 bg-gray-100 dark:bg-card/20">
          <div className="container mx-auto max-w-4xl">
            <SubtleCard className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">Tredjepartstjänster</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Vi använder följande tredjepartstjänster som kan placera cookies på din enhet:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong className="text-foreground">Google Analytics:</strong> För att analysera besöksmönster
                    och förbättra webbplatsens prestanda.
                  </li>
                  <li>
                    <strong className="text-foreground">Google Ads:</strong> För remarketing och mätning av
                    annonskampanjer.
                  </li>
                  <li>
                    <strong className="text-foreground">Facebook Pixel:</strong> För att mäta och optimera
                    Facebook-annonskampanjer.
                  </li>
                </ul>
                <p className="pt-4">
                  Dessa tredjepartstjänster har sina egna integritetspolicyer och cookiepolicyer. Vi rekommenderar
                  att du läser dessa för att förstå hur de behandlar din data.
                </p>
              </div>
            </SubtleCard>
          </div>
        </section>

        {/* Manage Cookies */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Hantera dina cookies</h2>

            <SubtleCard className="p-6 md:p-8 mb-8">
              <h3 className="text-xl font-bold mb-4">Via vår webbplats</h3>
              <p className="text-muted-foreground mb-4">
                Du kan när som helst ändra dina cookie-inställningar genom att klicka på cookie-ikonen i nedre högra
                hörnet av webbplatsen, eller genom att rensa din webbläsarhistorik och besöka sidan igen.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>OBS:</strong> Om du blockerar nödvändiga cookies kan vissa delar av webbplatsen sluta fungera
                korrekt.
              </p>
            </SubtleCard>

            <SubtleCard className="p-6 md:p-8">
              <h3 className="text-xl font-bold mb-4">Via din webbläsare</h3>
              <p className="text-muted-foreground mb-6">
                De flesta webbläsare tillåter dig att hantera cookies genom inställningarna. Här är några snabblänkar
                för populära webbläsare:
              </p>
              <div className="space-y-4">
                {browserInstructions.map((browser, index) => (
                  <div key={index} className="bg-muted/50 rounded-lg p-4">
                    <p className="font-semibold mb-1">{browser.browser}</p>
                    <p className="text-sm text-muted-foreground">{browser.steps}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                För mer information om hur du hanterar cookies i din specifika webbläsare, besök webbläsarens
                supportwebbplats.
              </p>
            </SubtleCard>
          </div>
        </section>

        {/* Updates Section */}
        <section className="py-16 md:py-24 bg-gray-100 dark:bg-card/20">
          <div className="container mx-auto max-w-4xl">
            <SubtleCard className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">Ändringar i denna cookiepolicy</h2>
              <p className="text-muted-foreground">
                Vi kan komma att uppdatera denna cookiepolicy från tid till annan för att återspegla ändringar i vår
                användning av cookies eller av juridiska skäl. Vi uppmuntrar dig att regelbundet granska denna sida
                för att hålla dig informerad om hur vi använder cookies.
              </p>
            </SubtleCard>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-4xl">
            <SubtleCard className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">Har du frågor?</h2>
              <p className="text-muted-foreground mb-4">
                Om du har frågor om vår användning av cookies, vänligen kontakta oss:
              </p>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  E-post:{" "}
                  <a href="mailto:umea@stjarnafyrkant.se" className="text-primary hover:underline">
                    umea@stjarnafyrkant.se
                  </a>
                </p>
                <p className="text-muted-foreground">
                  Telefon:{" "}
                  <a href="tel:+4690704470" className="text-primary hover:underline">
                    090-70 44 70
                  </a>
                </p>
              </div>
              <p className="text-muted-foreground mt-4">
                Läs mer om hur vi hanterar personuppgifter i vår{" "}
                <Link href="/integritetspolicy" className="text-primary hover:underline">
                  integritetspolicy
                </Link>
                .
              </p>
            </SubtleCard>
          </div>
        </section>

        {/* Last Updated */}
        <section className="py-8 border-t">
          <div className="container mx-auto max-w-4xl">
            <p className="text-sm text-muted-foreground text-center">
              Senast uppdaterad: {new Date().toLocaleDateString("sv-SE")}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
