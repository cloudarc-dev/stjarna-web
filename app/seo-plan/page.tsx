"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { 
  Search,
  Globe,
  MapPin,
  Star,
  Target,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Eye,
  Users,
  Clock,
  Smartphone,
  Image,
  FileText,
  Settings,
  BarChart3,
  Lightbulb,
  ArrowRight,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedText } from "@/components/ui/animated-text"
import { SubtleCard } from "@/components/ui/subtle-card"
import { GlareCard } from "@/components/ui/glare-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const seoStrategies = [
  {
    category: "Google AI Overviews Optimering",
    icon: <Search size={24} />,
    color: "from-blue-500/20 to-blue-600/10",
    strategies: [
      {
        title: "Unikt, värdefullt innehåll",
        description: "Skapa innehåll som fokuserar på människors behov, inte bara sökmotorer",
        why: "Google AI prioriterar innehåll som ger verkligt värde till användare. AI Overviews visar innehåll som besvarar komplexa frågor.",
        implementation: [
          "FAQ-sektioner för vanliga IT- och fordonsfrågor",
          "Djupgående guider för varje tjänsteområde",
          "Kundsuccess stories och case studies",
          "Problemlösande artiklar för lokala företag"
        ],
        priority: "Hög"
      },
      {
        title: "Strukturerad data (Schema Markup)",
        description: "Hjälp Google förstå ditt innehåll genom maskinläsbar data",
        why: "Strukturerad data hjälper Google AI att förstå och presentera ditt innehåll korrekt i AI Overviews och Featured Snippets.",
        implementation: [
          "LocalBusiness schema för företagsinformation",
          "Service schema för IT, fordonsteknik, kommunikation",
          "Review schema för kundrecensioner",
          "FAQ schema för vanliga frågor"
        ],
        priority: "Hög"
      }
    ]
  },
  {
    category: "Lokal SEO för Umeåregionen",
    icon: <MapPin size={24} />,
    color: "from-green-500/20 to-green-600/10",
    strategies: [
      {
        title: "Google My Business Optimering",
        description: "Optimera din GMB-profil för lokal synlighet",
        why: "85% av konsumenter använder internet för att hitta lokala företag. GMB är kritiskt för lokala sökresultat.",
        implementation: [
          "Komplett företagsprofil med alla tjänster",
          "Regelbundna uppdateringar och inlägg",
          "Kundrecensioner management",
          "Lokala keywords i beskrivning"
        ],
        priority: "Hög"
      },
      {
        title: "Lokala sökord och innehåll",
        description: "Optimera för sökningar som 'IT-support Umeå' och 'alkolås installation Västerbotten'",
        why: "Lokala sökningar har 50% högre konverteringsgrad än generella sökningar.",
        implementation: [
          "Landningssidor för varje tjänst + Umeå/Västerbotten",
          "Lokala case studies och kundberättelser",
          "Innehåll om lokal marknad och behov",
          "Geografiska keywords i metadata"
        ],
        priority: "Hög"
      }
    ]
  },
  {
    category: "Teknisk SEO-grund",
    icon: <Settings size={24} />,
    color: "from-purple-500/20 to-purple-600/10",
    strategies: [
      {
        title: "Core Web Vitals & Performance",
        description: "Säkerställ snabb laddning och bra användarupplevelse",
        why: "Googles algoritm prioriterar snabba sidor. Dålig prestanda = lägre ranking och användare lämnar sidan.",
        implementation: [
          "Bildoptimering och next/image användning",
          "Lazy loading för bilder",
          "CSS och JS optimering",
          "CDN implementation för statiska assets"
        ],
        priority: "Medium"
      },
      {
        title: "Meta tags och metadata",
        description: "Unika title tags och descriptions för varje sida",
        why: "Meta descriptions påverkar CTR från sökresultat, vilket är en rankingfaktor.",
        implementation: [
          "Unika title tags för varje sida (50-60 tecken)",
          "Beskrivande meta descriptions (150-160 tecken)",
          "Open Graph tags för social sharing",
          "Canonical URLs för att undvika duplicate content"
        ],
        priority: "Hög"
      }
    ]
  },
  {
    category: "Innehållsstrategi för AI Search",
    icon: <FileText size={24} />,
    color: "from-orange-500/20 to-orange-600/10",
    strategies: [
      {
        title: "FAQ och Q&A innehåll",
        description: "Skapa innehåll som svarar på specifika frågor",
        why: "AI Overviews och Featured Snippets favoriserar innehåll som direkt besvarar användarfrågor.",
        implementation: [
          "'Vad kostar IT-support för småföretag i Umeå?'",
          "'Hur lång tid tar alkolås installation?'",
          "'Vilka kommunikationslösningar passar bäst för hantverkare?'",
          "Strukturerad FAQ-sektion på varje tjänstesida"
        ],
        priority: "Hög"
      },
      {
        title: "Multimodalt innehåll",
        description: "Kombinera text med bilder och video",
        why: "Googles AI kan nu analysera bilder och video, vilket ökar chanserna för multimodala sökresultat.",
        implementation: [
          "Före/efter bilder av fordonsinstallationer",
          "Video-guider för vanliga IT-problem",
          "Infografik om kommunikationslösningar",
          "Alt-text på svenska för alla bilder"
        ],
        priority: "Medium"
      }
    ]
  }
]

const competitors = [
  {
    name: "Konkurrenter i Umeå",
    analysis: [
      "De flesta lokala IT-företag har dålig SEO",
      "Få har optimerat för AI Overviews",
      "Möjlighet att dominera lokala sökningar"
    ]
  },
  {
    name: "Målsökord",
    analysis: [
      "IT-support Umeå (1,000 sökningar/månad)",
      "Alkolås installation Västerbotten (300 sökningar/månad)", 
      "Fordonsteknik Umeå (200 sökningar/månad)"
    ]
  }
]

const implementationPhases = [
  {
    phase: "Fas 1: Teknisk grund",
    tasks: [
      "Implementera strukturerad data",
      "Optimera meta tags",
      "Skapa robots.txt och sitemap",
      "Performance optimering"
    ],
    expected: "Grundläggande SEO-struktur på plats"
  },
  {
    phase: "Fas 2: Innehållsoptimering",
    tasks: [
      "Skapa FAQ-sektioner",
      "Optimera tjänstesidor",
      "Lokalt innehåll för Umeå/Västerbotten",
      "Kundcase studies"
    ],
    expected: "Innehåll optimerat för AI Overviews"
  },
  {
    phase: "Fas 3: Lokal dominans",
    tasks: [
      "Google My Business optimering",
      "Lokala landningssidor",
      "Review management strategi",
      "Löpande innehållsproduktion"
    ],
    expected: "Dominans i lokala sökresultat"
  }
]

export default function SEOPlanPage() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16">
          <div className="text-center my-16">
            <AnimatedText
              text="SEO Masterplan"
              el="h1"
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-primary"
            />
            <AnimatedText
              text="Komplett strategi för Google AI Overviews och lokal dominans"
              el="p"
              className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            />
            
            <div className="flex flex-wrap gap-2 justify-center mt-6">
              <Badge variant="secondary" className="text-sm">Google AI Overviews</Badge>
              <Badge variant="secondary" className="text-sm">Lokal SEO</Badge>
              <Badge variant="secondary" className="text-sm">Umeåregionen</Badge>
              <Badge variant="secondary" className="text-sm">B2B-fokus</Badge>
            </div>
          </div>

          {/* Varför SEO är kritiskt */}
          <section className="mb-16">
            <AnimatedText text="Varför denna SEO-strategi?" el="h2" className="text-4xl font-bold mb-8 text-center" />
            <div className="grid md:grid-cols-3 gap-6">
              <SubtleCard className="p-6 group">
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                  <TrendingUp className="w-12 h-12 text-primary mb-4" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">Google AI Overviews</h3>
                <p className="text-muted-foreground">Nya AI-baserade sökresultat visas högst upp för 15% av alla sökningar. Här vill ni synas.</p>
              </SubtleCard>
              <SubtleCard className="p-6 group">
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                  <MapPin className="w-12 h-12 text-primary mb-4" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">Lokal dominans</h3>
                <p className="text-muted-foreground">85% av konsumenter söker lokala företag online. Perfekt tillfälle att dominera Umeåregionen.</p>
              </SubtleCard>
              <SubtleCard className="p-6 group">
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                  <Target className="w-12 h-12 text-primary mb-4" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">B2B-fördelar</h3>
                <p className="text-muted-foreground">B2B-kunder gör djupare research. Bra SEO bygger trovärdighet och expertis.</p>
              </SubtleCard>
            </div>
          </section>

          {/* SEO-strategier */}
          <section className="mb-16">
            <AnimatedText text="SEO-strategier & Implementation" el="h2" className="text-4xl font-bold mb-8" />
            
            {seoStrategies.map((category, categoryIndex) => (
              <div key={category.category} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${category.color}`}>
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{category.category}</h3>
                </div>
                
                <div className="grid gap-6">
                  {category.strategies.map((strategy, strategyIndex) => (
                    <motion.div
                      key={strategy.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (categoryIndex * 0.1) + (strategyIndex * 0.05) }}
                    >
                      <SubtleCard className="p-8">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-semibold mb-2">{strategy.title}</h4>
                            <p className="text-muted-foreground">{strategy.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant={strategy.priority === 'Hög' ? 'destructive' : 'secondary'}>
                              {strategy.priority}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                          <h5 className="font-semibold mb-2 flex items-center gap-2">
                            <Lightbulb size={16} />
                            Varför detta är viktigt:
                          </h5>
                          <p className="text-sm text-muted-foreground">{strategy.why}</p>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold mb-3">Implementation:</h5>
                          <ul className="space-y-2">
                            {strategy.implementation.map((item, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </SubtleCard>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </section>



          {/* Implementation roadmap */}
          <section className="mb-16">
            <AnimatedText text="Implementation Roadmap" el="h2" className="text-4xl font-bold mb-8" />
            <div className="space-y-6">
              {implementationPhases.map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SubtleCard className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{phase.phase}</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Uppgifter:</h4>
                            <ul className="space-y-1">
                              {phase.tasks.map((task, taskIndex) => (
                                <li key={taskIndex} className="flex items-center gap-2 text-sm">
                                  <ArrowRight size={12} className="text-primary" />
                                  {task}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Förväntat resultat:</h4>
                            <p className="text-sm text-muted-foreground">{phase.expected}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SubtleCard>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Konkurrentanalys */}
          <section className="mb-16">
            <AnimatedText text="Marknadsanalys" el="h2" className="text-4xl font-bold mb-8" />
            <div className="grid md:grid-cols-2 gap-6">
              {competitors.map((comp, index) => (
                <SubtleCard key={comp.name} className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{comp.name}</h3>
                  <ul className="space-y-2">
                    {comp.analysis.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-2">
                        <BarChart3 size={16} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </SubtleCard>
              ))}
            </div>
          </section>

          {/* Call to action */}
          <section className="text-center">
            <SubtleCard className="p-8 bg-gradient-to-br from-primary/10 to-primary/5">
              <h2 className="text-3xl font-bold mb-4">Nästa steg</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Redo att dominera Google AI Overviews och lokala sökresultat i Umeåregionen?
              </p>
              <Link 
                href="/seo-implementation"
                className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-lg font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Starta SEO-implementation
                <ArrowRight size={20} className="ml-2" />
              </Link>
            </SubtleCard>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
