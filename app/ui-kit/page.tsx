"use client"
import { motion } from "framer-motion"
import {
  Computer,
  Signal,
  Rocket,
  ArrowRight,
  Palette,
  Type,
  MousePointerClick,
  Layers,
  Grid,
  MessageSquare,
  Smartphone,
  UserPlusIcon as UniversalAccess,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GlareCard } from "@/components/ui/glare-card"
import { SubtleCard } from "@/components/ui/subtle-card"
import { InteractiveGridBackground } from "@/components/ui/interactive-grid-background"
import { AnimatedText } from "@/components/ui/animated-text"
import { MysticalBackground } from "@/components/ui/mystical-background"
// ChatWidget removed - to be replaced with UI-kit based chat interface
import { ShineButton } from "@/components/ui/shine-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const colors = [
  { name: "Brand Yellow", value: "#fedb00", variable: "hsl(var(--primary))" },
  { name: "Brand Black", value: "#000000", variable: "hsl(var(--background)) (dark)" },
  { name: "White", value: "#ffffff", variable: "hsl(var(--background)) (light)" },
  { name: "Card", value: "hsl(var(--card))", variable: "hsl(var(--card))" },
  { name: "Foreground", value: "hsl(var(--foreground))", variable: "hsl(var(--foreground))" },
  { name: "Muted Fg", value: "hsl(var(--muted-foreground))", variable: "hsl(var(--muted-foreground))" },
]

export default function UiKitPage() {
  return (
    <>
      {/* ChatWidget placeholder - to be replaced with UI-kit based chat interface */}
      <div className="relative z-10 flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16">
          <MysticalBackground variant="hero" className="absolute inset-0 z-0" />
          <div className="text-center my-16">
            <AnimatedText
              text="Kinetic & Luminous"
              el="h1"
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-primary"
            />
            <AnimatedText
              text="Ett levande designsystem byggt för framtiden."
              el="p"
              className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            />
          </div>

          <div className="space-y-24">
            {/* Philosophy Section */}
            <section>
              <AnimatedText text="Filosofi" el="h2" className="text-4xl font-bold mb-8 text-center" />
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <SubtleCard className="p-8">
                  <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                    <motion.div
                      animate={{
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 1,
                      }}
                    >
                      <Layers />
                    </motion.div>
                    Kinetic
                  </h3>
                  <p className="text-muted-foreground">
                    Varje interaktion är designad för att kännas levande och responsiv. Vi använder meningsfull rörelse
                    för att guida användaren, ge feedback och skapa en känsla av flyt och dynamik som förbättrar
                    upplevelsen.
                  </p>
                </SubtleCard>
                <SubtleCard className="p-8">
                  <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2.5,
                        ease: "easeInOut",
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <Grid />
                    </motion.div>
                    Luminous
                  </h3>
                  <p className="text-muted-foreground">
                    Ljus är centralt i vårt visuella språk. Från subtil glöd till djärv glans, använder vi ljus för att
                    dra uppmärksamhet, skapa djup och framkalla en känsla av innovation och premiumkvalitet.
                  </p>
                </SubtleCard>
              </div>
            </section>

            {/* Colors Section */}
            <section>
              <AnimatedText text="Färgpalett" el="h2" className="text-4xl font-bold mb-8 flex items-center gap-4">
                <Palette /> Färger
              </AnimatedText>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {colors.map((color) => (
                  <div key={color.name} className="p-4 rounded-lg border bg-card">
                    <div className="w-full h-20 rounded" style={{ backgroundColor: color.value }} />
                    <h3 className="font-semibold mt-2">{color.name}</h3>
                    <p className="text-sm text-muted-foreground">{color.variable}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Typography Section */}
            <section>
              <AnimatedText text="Typografi" el="h2" className="text-4xl font-bold mb-8 flex items-center gap-4">
                <Type /> Typografi
              </AnimatedText>
              <div className="space-y-6 bg-card/50 p-8 rounded-lg border">
                <p className="text-sm text-muted-foreground">Font: Manrope</p>
                <AnimatedText text="H1: Kinetic & Luminous" el="h1" className="text-5xl font-extrabold" />
                <AnimatedText text="H2: Ett levande designsystem" el="h2" className="text-4xl font-bold" />
                <AnimatedText text="H3: Byggt för framtiden" el="h3" className="text-3xl font-semibold" />
                <p className="text-lg max-w-prose">
                  Detta är brödtext (18px). Genom banbrytande teknik och prisvinnande design bygger vi upplevelser som
                  engagerar, konverterar och består. Varje interaktion är genomtänkt.
                </p>
                <p className="max-w-prose">
                  Detta är normal brödtext (16px). Med rätt teknik, en lokal närvaro och ett stort, hållbart ansvar
                  hjälper vi till att skapa framtidens, starkare företagsmarknad.
                </p>
              </div>
            </section>

            {/* Buttons Section */}
            <section>
              <AnimatedText text="Knappar" el="h2" className="text-4xl font-bold mb-8 flex items-center gap-4">
                <MousePointerClick /> Knappar
              </AnimatedText>
              <div className="space-y-10">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Call to Action (Shine)</h3>
                  <div className="bg-card/50 p-8 rounded-lg border flex items-center justify-center">
                    <ShineButton>Starta ditt projekt</ShineButton>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Standardknappar</h3>
                  <div className="flex flex-wrap items-center gap-6 bg-card/50 p-8 rounded-lg border">
                    <Button size="lg">Default</Button>
                    <Button variant="secondary" size="lg">
                      Secondary
                    </Button>
                    <Button variant="outline" size="lg">
                      Outline
                    </Button>
                    <Button variant="ghost" size="lg">
                      Ghost
                    </Button>
                    <Button variant="link" size="lg">
                      Link
                    </Button>
                    <Button size="lg" disabled>
                      Disabled
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Iconography Section */}
            <section>
              <AnimatedText text="Ikonografi" el="h2" className="text-4xl font-bold mb-8 text-center" />
              <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Prisvinnande kinetic ikoner som lever och andas med användaren. Varje ikon berättar en historia och skapar engagemang genom subtil rörelse.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                {/* Processing/Loading Icons - have functional idle animations */}
                <motion.div 
                  className="flex flex-col items-center p-6 rounded-lg bg-card/30 hover:bg-card/60 transition-colors group cursor-pointer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 3,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                    className="mb-3"
                  >
                    <Computer size={32} className="text-primary" />
                  </motion.div>
                  <span className="text-xs font-medium text-center">Processing</span>
                </motion.div>

                <motion.div 
                  className="flex flex-col items-center p-6 rounded-lg bg-card/30 hover:bg-card/60 transition-colors group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                    className="mb-3"
                  >
                    <Signal size={32} className="text-primary" />
                  </motion.div>
                  <span className="text-xs font-medium text-center">Live Status</span>
                </motion.div>

                {/* Static icons with hover-only animations */}
                <motion.div 
                  className="flex flex-col items-center p-6 rounded-lg bg-card/30 hover:bg-card/60 transition-colors group cursor-pointer"
                  whileHover={{ scale: 1.1, y: -8 }}
                >
                  <motion.div className="mb-3">
                    <Rocket size={32} className="text-primary" />
                  </motion.div>
                  <span className="text-xs font-medium text-center">Launch</span>
                </motion.div>

                <motion.div 
                  className="flex flex-col items-center p-6 rounded-lg bg-card/30 hover:bg-card/60 transition-colors group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div 
                    className="mb-3"
                    whileHover={{ x: 8 }}
                  >
                    <ArrowRight size={32} className="text-primary" />
                  </motion.div>
                  <span className="text-xs font-medium text-center">Navigate</span>
                </motion.div>

                <motion.div 
                  className="flex flex-col items-center p-6 rounded-lg bg-card/30 hover:bg-card/60 transition-colors group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div 
                    className="mb-3"
                    whileHover={{ rotate: 180, scale: 1.2 }}
                  >
                    <Palette size={32} className="text-primary" />
                  </motion.div>
                  <span className="text-xs font-medium text-center">Design</span>
                </motion.div>

                <motion.div 
                  className="flex flex-col items-center p-6 rounded-lg bg-card/30 hover:bg-card/60 transition-colors group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div 
                    className="mb-3"
                    whileHover={{ x: [-2, 2, -2, 0], transition: { duration: 0.3 } }}
                  >
                    <Type size={32} className="text-primary" />
                  </motion.div>
                  <span className="text-xs font-medium text-center">Typography</span>
                </motion.div>

                <motion.div 
                  className="flex flex-col items-center p-6 rounded-lg bg-card/30 hover:bg-card/60 transition-colors group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div 
                    className="mb-3"
                    whileHover={{ scale: [1, 0.9, 1.1, 1], transition: { duration: 0.3 } }}
                  >
                    <MousePointerClick size={32} className="text-primary" />
                  </motion.div>
                  <span className="text-xs font-medium text-center">Interactive</span>
                </motion.div>

                <motion.div 
                  className="flex flex-col items-center p-6 rounded-lg bg-card/30 hover:bg-card/60 transition-colors group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div 
                    className="mb-3"
                    whileHover={{ rotate: [0, 10, -10, 0], transition: { duration: 0.4 } }}
                  >
                    <Layers size={32} className="text-primary" />
                  </motion.div>
                  <span className="text-xs font-medium text-center">Structure</span>
                </motion.div>

                <motion.div 
                  className="flex flex-col items-center p-6 rounded-lg bg-card/30 hover:bg-card/60 transition-colors group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div 
                    className="mb-3"
                    whileHover={{ rotate: 90 }}
                  >
                    <Grid size={32} className="text-primary" />
                  </motion.div>
                  <span className="text-xs font-medium text-center">Layout</span>
                </motion.div>

                {/* Notification/Active state - functional pulse */}
                <motion.div 
                  className="flex flex-col items-center p-6 rounded-lg bg-card/30 hover:bg-card/60 transition-colors group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                    className="mb-3"
                  >
                    <MessageSquare size={32} className="text-primary" />
                  </motion.div>
                  <span className="text-xs font-medium text-center">Active Chat</span>
                </motion.div>

                <motion.div 
                  className="flex flex-col items-center p-6 rounded-lg bg-card/30 hover:bg-card/60 transition-colors group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div 
                    className="mb-3"
                    whileHover={{ y: [-2, -6, -2, 0], transition: { duration: 0.4 } }}
                  >
                    <Smartphone size={32} className="text-primary" />
                  </motion.div>
                  <span className="text-xs font-medium text-center">Responsive</span>
                </motion.div>

                <motion.div 
                  className="flex flex-col items-center p-6 rounded-lg bg-card/30 hover:bg-card/60 transition-colors group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div 
                    className="mb-3"
                    whileHover={{ scale: 1.3, transition: { duration: 0.2 } }}
                  >
                    <UniversalAccess size={32} className="text-primary" />
                  </motion.div>
                  <span className="text-xs font-medium text-center">Accessible</span>
                </motion.div>
              </div>
              
              <div className="mt-12">
                <h3 className="text-2xl font-semibold mb-6 text-center">Animation Philosophy</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <SubtleCard className="p-6">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                      >
                        🎯
                      </motion.div>
                      Hover-First
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Huvudfokus på hover-animationer. De ger direkt feedback när användaren interagerar.
                    </p>
                  </SubtleCard>
                  
                  <SubtleCard className="p-6">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      >
                        ⚙️
                      </motion.div>
                      Functional Only
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Idle-animationer endast för funktionella syften: loading, live status, notifikationer.
                    </p>
                  </SubtleCard>
                  
                  <SubtleCard className="p-6">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <motion.div
                        whileHover={{ y: -3 }}
                      >
                        💫
                      </motion.div>
                      Meaningful Motion
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Varje rörelse berättar en historia eller förmedlar information. Ingen animation bara för animations skull.
                    </p>
                  </SubtleCard>
                </div>
              </div>
            </section>

            {/* Cards Section */}
            <section>
              <AnimatedText text="Kort" el="h2" className="text-4xl font-bold mb-8 flex items-center gap-4">
                <Layers /> Kort
              </AnimatedText>
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Primary Card (Glare)</h3>
                  <GlareCard className="bg-card/80 backdrop-blur-sm p-8 flex flex-col justify-center items-center text-center h-80">
                    <Computer size={48} className="text-primary mb-4" />
                    <h3 className="text-2xl font-semibold">Holografisk Effekt</h3>
                    <p className="text-muted-foreground mt-2">För maximal visuell impact.</p>
                  </GlareCard>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Secondary Card (Subtle)</h3>
                  <SubtleCard className="flex flex-col justify-center items-center text-center h-80">
                    <Signal size={48} className="text-primary mb-4" />
                    <h3 className="text-2xl font-semibold">Subtil Interaktion</h3>
                    <p className="text-muted-foreground mt-2">Elegant och avskalad med en interaktiv glow.</p>
                  </SubtleCard>
                </div>
              </div>
            </section>

            {/* Forms Section */}
            <section>
              <AnimatedText text="Formulär" el="h2" className="text-4xl font-bold mb-8 flex items-center gap-4">
                <MessageSquare /> Formulär
              </AnimatedText>
              <SubtleCard className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Namn</Label>
                    <Input id="name" placeholder="Anna Andersson" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-post (Fokuserad)</Label>
                    <Input id="email" type="email" placeholder="anna@exempel.se" className="focus:ring-2" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Företag (Inaktiv)</Label>
                    <Input id="company" placeholder="Företag AB" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input id="phone" placeholder="070-123 45 67" />
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <ShineButton>Skicka meddelande</ShineButton>
                  </div>
                </div>
              </SubtleCard>
            </section>

            {/* Backgrounds Section */}
            <section>
              <AnimatedText
                text="Dynamiska Bakgrunder"
                el="h2"
                className="text-4xl font-bold mb-8 flex items-center gap-4"
              >
                <Grid /> Bakgrunder
              </AnimatedText>
              <div className="max-w-2xl mx-auto">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Interactive Grid</h3>
                  <div className="h-80 rounded-lg border relative overflow-hidden">
                    <InteractiveGridBackground />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <p className="text-muted-foreground bg-background/50 px-4 py-2 rounded-full backdrop-blur-sm">
                        Rör musen över ytan
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Responsive Section */}
            <section>
              <AnimatedText text="Responsiv Design" el="h2" className="text-4xl font-bold mb-8 flex items-center gap-4">
                <Smartphone /> Mobil Vy
              </AnimatedText>
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="text-muted-foreground">
                  <p className="text-lg">
                    Alla komponenter och layouter är byggda med en "mobile-first"-strategi. Detta säkerställer en
                    perfekt upplevelse oavsett enhet, från den minsta mobilskärmen till den största datorskärmen.
                    Flexibilitet och tillgänglighet är kärnan i vår design.
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="w-[375px] h-[667px] bg-card rounded-3xl border-8 border-secondary p-4 shadow-2xl">
                    <div className="h-full w-full overflow-y-auto rounded-xl">
                      <SubtleCard className="p-6 flex flex-col h-full">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="bg-primary/10 p-3 rounded-lg">
                            <Computer size={24} />
                          </div>
                          <h3 className="text-xl font-semibold">IT-tjänster</h3>
                        </div>
                        <p className="text-muted-foreground mb-6 flex-grow text-sm">
                          Säker, skalbar IT för företag. Vi hanterar allt från nätverk och säkerhet till molntjänster
                          och support.
                        </p>
                        <Button variant="outline" className="mt-auto bg-transparent w-full">
                          Läs mer <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </SubtleCard>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Accessibility Section */}
            <section>
              <AnimatedText text="Tillgänglighet" el="h2" className="text-4xl font-bold mb-8 flex items-center gap-4">
                <UniversalAccess /> Tillgänglighet (a11y)
              </AnimatedText>
              <SubtleCard className="p-8">
                <p className="text-lg text-muted-foreground max-w-prose">
                  En prisvinnande design är en design för alla. Vi följer WCAG-riktlinjerna och ser till att vår kod är
                  semantiskt korrekt, att kontraster är tillräckliga och att alla interaktiva element kan navigeras med
                  tangentbord.
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <Button>Synlig text</Button>
                  <Button>
                    <Rocket className="mr-2 h-4 w-4" />
                    Ikon & text
                  </Button>
                  <Button size="icon" aria-label="Starta raket">
                    <Rocket className="h-4 w-4" />
                  </Button>
                  <p className="text-muted-foreground">(Knappen till höger har en `aria-label` för skärmläsare)</p>
                </div>
              </SubtleCard>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
