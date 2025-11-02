"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedText } from "@/components/ui/animated-text"
import { SubtleCard } from "@/components/ui/subtle-card"
import { Shield, Lock, Database, Mail, Phone, MapPin, AlertCircle } from "lucide-react"

const sections = [
  {
    icon: <Database className="w-6 h-6 text-primary" />,
    title: "Insamling av information",
    content: [
      "Vi samlar in information från dig exempelvis:",
      "• När du registrerar dig på vår webbplats, loggar in på ditt konto.",
      "• Ber om en offert eller beställer någonting online och/eller i butik.",
      "• När du nyttjar någon/några av våra tjänster.",
      "• Om du deltar i någon utbildning, ett kundevent eller tävling som vi arrangerar.",
      "• När du frivilligt fyller i något av de formulär vi använder oss av.",
      "",
      "Uppgifter kan även samlas in från andra källor, så som register som används för kreditbedömningar, från operatörer och samarbetspartners.",
      "",
      "Dessutom tar vi automatiskt emot och sparar information från din dator och webbläsare, inklusive din IP-adress, uppgifter om programvara och hårdvara och den begärda sidan när du besöker vår hemsida.",
      "",
      "Den informationen vi behandlar om dig beror på vilken/vilka tjänster du använder.",
    ],
  },
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: "Användning av information",
    content: [
      "Behandlingen av information baseras på någon av följande rättsliga grunder:",
      "• Du har lämnat Samtycke till behandling",
      "• Behandlingen behövs för att vi ska kunna uppfylla ett Avtal med dig",
      "• Efter en Intresseavvägning",
      "• Behandlingen behövs för att vi ska kunna uppfylla en Rättslig förpliktelse",
      "",
      "Den information vi samlar in från dig kan användas för att:",
      "• Göra din upplevelse personlig och tillgodose dina personliga behov",
      "• Tillhandahålla anpassade annonser",
      "• Förbättra vår hemsida",
      "• Förbättra vår kundservice och ditt behov av hjälp",
      "• Kontakta dig via e-post",
      "• Administrera en tävling, ett erbjudande eller en undersökning",
    ],
  },
  {
    icon: <MapPin className="w-6 h-6 text-primary" />,
    title: "Användning av platsdata",
    content: [
      "I Novafleetappen är det möjligt att göra individuella inställningar för dataskydd. Notera att din dator/surfplatta/smarttelefon också kan köra andra appar eller upprätta nätverksanslutningar som samlar in, överför eller lagrar information om dig eller din position.",
      "",
      "StjärnaFyrkant har uttryckligen inget inflytande över detta och hänvisar till respektive enhets tillverkare och mobiltelefonleverantörer.",
    ],
  },
  {
    icon: <Database className="w-6 h-6 text-primary" />,
    title: "Lagring",
    content: [
      "Dina uppgifter – såsom namn, e-postadress, adress, telefonnummer och org.nr finns tryggt förvarade i vårt ordersystem, och lagras där i upp till 5 år efter senast avslutade uppdrag/beställning eller så lång tid som lagen kräver, t ex bokföringslagen.",
      "",
      "Detta för att på smidigast möjliga sätt kunna fullfölja framtida beställningar och besvara eventuella frågor angående tidigare beställningar.",
    ],
  },
  {
    icon: <Lock className="w-6 h-6 text-primary" />,
    title: "E-handelssäkerhet",
    content: [
      "Vi är de enda som äger informationen som samlas in på den här webbplatsen. Din personligt identifierbara information kommer inte att säljas, utbytas, överföras eller delas vidare till något annat företag, i något syfte, utan ditt samtycke, förutom då så krävs för att uppfylla en begäran och/eller överföring, t.ex. för att skicka en beställning.",
    ],
  },
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: "Utlämnande till tredje part",
    content: [
      "Vi säljer, handlar, eller på annat sätt överför, inte personligt identifierbar information till utomstående parter. Detta inkluderar inte betrodd tredjepart som hjälper oss att driva vår webbplats eller vårt företag, med kravet att dessa parter godkänner att hålla informationen konfidentiell.",
      "",
      "Vi anser att det är nödvändigt att dela information i syfte att undersöka, förhindra eller vidta åtgärder mot illegala aktiviteter, misstänkt bedrägeri, situationer som medför en potentiell risk för en persons fysiska säkerhet, brott mot våra användarvillkor eller andra tillfällen då lagen kräver så.",
    ],
  },
  {
    icon: <Lock className="w-6 h-6 text-primary" />,
    title: "Informationsskydd",
    content: [
      "Vi vidtar en rad olika säkerhetsåtgärder för att skydda dina personliga uppgifter. Endast medarbetare som ska uträtta ett specifikt jobb (t.ex. fakturering eller kundservice), får tillgång till personligt identifierbar information.",
      "",
      "De datorer/servrar som används för att lagra personligt identifierbar information lagras i en säker miljö.",
    ],
  },
]

const userRights = [
  {
    title: "Avsluta prenumeration, ändra/radera dina uppgifter",
    content:
      "Vi använder den e-postadress du förser oss med för att skicka information och uppdateringar som angår din beställning, enstaka nyhetsbrev, relaterad produktinformation etc. Om du inte längre vill ta emot sådana meddelanden hittar du information om hur du avslutar prenumerationen i slutet av varje e-postmeddelande.",
  },
  {
    title: "Få utdrag av dina uppgifter",
    content:
      "Du kan be om ett utdrag av de uppgifter som vi har om dig en gång per år utan kostnad. Du måste vara tydlig med vilken information du vill ta del. Begäran ska vara skriftlig och undertecknad av den personuppgiftsansvarige. Så fort vi har bearbetat förfrågan skickas utdraget till din folkbokföringsadress.",
  },
  {
    title: "Radera dina uppgifter",
    content:
      "Om du inte vill förekomma i vårt register så kan du be oss om att radera all information om dig som är juridiskt möjlig att radera. För att vi ska kunna radera dina uppgifter krävs det också att du ska kunna identifiera dig.",
  },
  {
    title: "Rätta dina uppgifter",
    content:
      "Om du har anser att en uppgift är felaktig eller ofullständig kan du begära att vi ska rätta uppgiften snarast. I vår webbshop kan du själv rätta dina uppgifter.",
  },
]

export default function IntegritetspolicyPage() {
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
                  <Shield className="w-8 h-8 text-primary" />
                </div>
              </div>
              <AnimatedText text="Integritetspolicy" el="h1" className="text-4xl md:text-5xl font-bold mb-4" />
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                StjärnaFyrkant värnar om din integritet. Här förklarar vi hur vi samlar in, använder och skyddar dina
                personuppgifter.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Personuppgiftsansvarig */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-4xl">
            <SubtleCard className="p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">Personuppgiftsansvarig</h2>
              <p className="text-muted-foreground">
                Personuppgiftsansvarig är det juridiska bolag inom StjärnaFyrkant-kedjan som du tecknat avtal med.
              </p>
            </SubtleCard>
          </div>
        </section>

        {/* Main Content Sections */}
        <section className="py-16 md:py-24 bg-gray-100 dark:bg-card/20">
          <div className="container mx-auto max-w-4xl space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <SubtleCard className="p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-bold">{section.title}</h2>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    {section.content.map((paragraph, i) => (
                      <p key={i} className={paragraph === "" ? "h-2" : ""}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </SubtleCard>
              </motion.div>
            ))}

            {/* Cookies Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <SubtleCard className="p-6 md:p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Database className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Använder vi oss av cookies?</h2>
                </div>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    Ja. Våra cookies förbättrar tillgången till vår webbplats och identifierar återkommande besökare.
                    Dessutom förbättrar våra cookies användarupplevelsen genom att spåra och målanpassa användarens
                    intressen.
                  </p>
                  <p>
                    Vår användning av cookies kopplas över huvud taget inte till personligt identifierbar information på
                    vår webbplats.
                  </p>
                </div>
              </SubtleCard>
            </motion.div>
          </div>
        </section>

        {/* User Rights Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Dina rättigheter</h2>
            <div className="space-y-6">
              {userRights.map((right, index) => (
                <motion.div
                  key={right.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <SubtleCard className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{right.title}</h3>
                    <p className="text-muted-foreground">{right.content}</p>
                  </SubtleCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Samtycke Section */}
        <section className="py-16 md:py-24 bg-gray-100 dark:bg-card/20">
          <div className="container mx-auto max-w-4xl">
            <SubtleCard className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">Samtycke</h2>
              <p className="text-muted-foreground">
                Genom att fortsätta att använda vår webbplats godkänner du vår integritetspolicy.
              </p>
            </SubtleCard>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-4xl">
            <div className="grid md:grid-cols-2 gap-6">
              <SubtleCard className="p-6 md:p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Kontakta oss</h2>
                </div>
                <div className="space-y-3 text-muted-foreground">
                  <p className="font-semibold text-foreground">
                    L.T.S. Telekommunikation Aktiebolag
                  </p>
                  <p className="text-sm">
                    Org.nr 556224-5232
                  </p>
                  <p>
                    Ansvarig för den behandling som sker vid besök eller användande av tillgängliga tjänster på
                    stjarnafyrkant.se.
                  </p>
                  <div className="space-y-2 pt-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <p>Förrådsvägen 15, 901 32 Umeå</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                      <a href="mailto:umea@stjarnafyrkant.se" className="hover:text-primary transition-colors">
                        umea@stjarnafyrkant.se
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                      <a href="tel:+4690704470" className="hover:text-primary transition-colors">
                        090-70 44 70
                      </a>
                    </div>
                  </div>
                </div>
              </SubtleCard>

              <SubtleCard className="p-6 md:p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Klagomål</h2>
                </div>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Om du anser att vi har behandlat dina uppgifter felaktigt får du gärna kontakta oss på{" "}
                    <a href="mailto:umea@stjarnafyrkant.se" className="text-primary hover:underline">
                      umea@stjarnafyrkant.se
                    </a>
                    .
                  </p>
                  <p className="pt-2">
                    Du har enligt dataskyddsförordningen rätt att lämna in ett klagomål till
                    Integritetsskyddsmyndigheten (Datainspektionen).
                  </p>
                  <div className="space-y-2 pt-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                      <a
                        href="mailto:datainspektionen@datainspektionen.se"
                        className="hover:text-primary transition-colors"
                      >
                        datainspektionen@datainspektionen.se
                      </a>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <p>Box 8114, 104 20 Stockholm</p>
                    </div>
                  </div>
                </div>
              </SubtleCard>
            </div>
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
