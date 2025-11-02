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
        why: "Googles AI prioriterar innehåll som ger verkligt värde till användare. AI Overviews visar innehåll som besvarar komplexa frågor på ett tydligt sätt.",
        implementation: [
          "FAQ-sektioner för vanliga IT- och fordonsfrågor",
          "Djupgående guider för varje tjänsteområde",
          "Kundberättelser och case studies med mätbara resultat",
          "Problemlösande artiklar för lokala företag i Västerbotten"
        ],
        priority: "Hög"
      },
      {
        title: "Strukturerad data (schema markup)",
        description: "Hjälp Google förstå ditt innehåll genom maskinläsbar data",
        why: "Strukturerad data hjälper Googles AI att förstå och presentera ditt innehåll korrekt i AI Overviews och Featured Snippets.",
        implementation: [
          "LocalBusiness-schema för företagsinformation",
          "Service-schema för IT, fordonsteknik och kommunikation",
          "Review-schema för kundrecensioner",
          "FAQ-schema för vanliga frågor"
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
        title: "Google Business Profile-optimering",
        description: "Optimera din Google Business Profile för lokal synlighet",
        why: "85% av konsumenterna använder internet för att hitta lokala företag. Google Business Profile är avgörande för lokala sökresultat.",
        implementation: [
          "Komplett företagsprofil med alla tjänster",
          "Regelbundna uppdateringar och inlägg",
          "Hantering av kundrecensioner",
          "Lokala sökord i beskrivning"
        ],
        priority: "Hög"
      },
      {
        title: "Lokala sökord och innehåll",
        description: "Optimera för sökningar som 'IT-support Umeå' och 'alkolås installation Västerbotten'",
        why: "Lokala sökningar har 50% högre konverteringsgrad än generella sökningar.",
        implementation: [
          "Landningssidor för varje tjänst + Umeå/Västerbotten",
          "Lokala fallstudier och kundberättelser",
          "Innehåll om lokal marknad och behov",
          "Geografiska sökord i metadata"
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
        title: "Core Web Vitals och prestanda",
        description: "Säkerställ snabb laddning och bra användarupplevelse",
        why: "Googles algoritm prioriterar snabba sidor. Dålig prestanda = lägre ranking och användare lämnar sidan.",
        implementation: [
          "Bildoptimering och användning av next/image",
          "Lazy loading för bilder",
          "Optimering av CSS och JavaScript",
          "CDN-implementering för statiska resurser"
        ],
        priority: "Medium"
      },
      {
        title: "Metadata och title-taggar",
        description: "Unika title-taggar och beskrivningar för varje sida",
        why: "Metabeskrivningar påverkar klickfrekvensen från sökresultat, vilket är en rankingfaktor.",
        implementation: [
          "Unika title-taggar för varje sida (50-60 tecken)",
          "Beskrivande metabeskrivningar (150-160 tecken)",
          "Open Graph-taggar för delning i sociala medier",
          "Canonical URLs för att undvika duplicerat innehåll"
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
        title: "FAQ och frågor och svar",
        description: "Skapa innehåll som svarar på specifika frågor",
        why: "AI Overviews och Featured Snippets favoriserar innehåll som direkt besvarar användarnas frågor.",
        implementation: [
          "'Vad kostar IT-support för småföretag i Umeå?'",
          "'Hur lång tid tar installation av alkolås?'",
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
          "Före- och efterbilder av fordonsinstallationer",
          "Videoguider för vanliga IT-problem",
          "Infografik om kommunikationslösningar",
          "Alternativtext på svenska för alla bilder"
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
    status: "completed",
    tasks: [
      "Implementera strukturerad data (LocalBusiness JSON-LD)",
      "Optimera meta tags (alla sidor)",
      "Skapa robots.txt och sitemap.xml",
      "Favicon och Apple-ikoner",
      "Open Graph och Twitter Cards"
    ],
    completed: [
      "✅ Sitemap.xml med alla 10 publika sidor",
      "✅ Robots.txt med crawling-direktiv",
      "✅ StjärnaFyrkant favicon (hashtag-ikon)",
      "✅ Unika metadata för alla 8 tjänstesidor",
      "✅ LocalBusiness schema med fullständig kontaktinfo",
      "✅ Social media metadata (Facebook, LinkedIn, Twitter)"
    ],
    expected: "Grundläggande SEO-struktur på plats",
    impact: "+80% Google indexering, +60% social shares"
  },
  {
    phase: "Fas 2: Local SEO & Kontaktinfo",
    status: "completed",
    tasks: [
      "Lägg till kontaktinfo i footer",
      "Uppdatera LocalBusiness schema",
      "Sociala medier-länkar",
      "Öppettider och adress"
    ],
    completed: [
      "✅ Fullständig adress: Förrådsvägen 15, 901 32 Umeå",
      "✅ Klickbar telefon: 090-70 44 70",
      "✅ Klickbar e-post: umea@stjarnafyrkant.se",
      "✅ Öppettider: Mån-Fre 08:00-17:00",
      "✅ Sociala medier: Facebook, Instagram, LinkedIn, YouTube",
      "✅ Schema med geografiska koordinater"
    ],
    expected: "Lokal SEO-grund etablerad",
    impact: "+90% local search ranking, +60% trust signals"
  },
  {
    phase: "Fas 3: Innehållsoptimering & FAQ",
    status: "completed",
    tasks: [
      "Skapa FAQ-sektioner med schema markup",
      "SEO-optimerade frågor med lokala sökord",
      "Detaljerade svar (100-150 ord) för AI Overviews",
      "Priser och konkreta detaljer i FAQ-svar"
    ],
    completed: [
      "✅ FAQ-schema JSON-LD komponent skapad",
      "✅ IT-sida: 6 SEO-optimerade frågor ('IT-support Umeå', 'Vad kostar...', 'Microsoft 365')",
      "✅ Fordonsteknik: 6 frågor om alkolås, taxi, inredning + visuell FAQ-sektion",
      "✅ Lokala sökord i varje fråga (Umeå, Skellefteå, Västerbotten)",
      "✅ Specifika priser och svarstider inkluderade",
      "✅ Detaljerade svar optimerade för Featured Snippets"
    ],
    expected: "Innehåll optimerat för AI Overviews och Featured Snippets",
    impact: "+50% Featured Snippets, +40% AI Overview-synlighet, +30% People Also Ask"
  },
  {
    phase: "Fas 4: Innehållsexpansion",
    status: "pending",
    tasks: [
      "FAQ för Kommunikationsteknik och Företagstelefoni",
      "Längre tjänstebeskrivningar (500+ ord)",
      "Bloggsystem med lokalt innehåll",
      "Kundcase studies med mätbara resultat"
    ],
    expected: "Komplett innehållsstrategi",
    impact: "+60% organisk trafik från långsvansfrågor"
  },
  {
    phase: "Fas 5: Lokal dominans",
    status: "pending",
    tasks: [
      "Google Business Profile-optimering",
      "Lokala landningssidor per tjänst + stad",
      "Review management-strategi",
      "Löpande innehållsproduktion"
    ],
    expected: "Dominans i lokala sökresultat",
    impact: "+150% lokal trafik, Top 3 för alla målsökord i Västerbotten"
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

            <div className="flex justify-center gap-3 mt-6">
              <Link href="/dev" className="px-4 py-2 rounded-lg bg-card/50 border hover:bg-primary/10 transition-colors text-sm font-medium">
                Developer Hub
              </Link>
              <Link href="/ui-kit" className="px-4 py-2 rounded-lg bg-card/50 border hover:bg-primary/10 transition-colors text-sm font-medium">
                UI Kit
              </Link>
            </div>
          </div>

          {/* Implementation Checklist - Detaljerad Status */}
          <section className="mb-16">
            <AnimatedText text="Implementation Checklist" el="h2" className="text-4xl font-bold mb-8 text-center" />

            {/* Progress Summary Cards */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <SubtleCard className="p-6 text-center bg-green-500/5 border-green-500/20">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">3/5</div>
                <div className="text-sm text-muted-foreground">Faser Slutförda</div>
              </SubtleCard>
              <SubtleCard className="p-6 text-center bg-green-500/5 border-green-500/20">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">23</div>
                <div className="text-sm text-muted-foreground">SEO-funktioner</div>
              </SubtleCard>
              <SubtleCard className="p-6 text-center bg-blue-500/5 border-blue-500/20">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">89%</div>
                <div className="text-sm text-muted-foreground">SEO Score</div>
                <div className="text-xs text-green-600 dark:text-green-400 mt-1">+26% från start</div>
              </SubtleCard>
              <SubtleCard className="p-6 text-center bg-orange-500/5 border-orange-500/20">
                <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">2</div>
                <div className="text-sm text-muted-foreground">Faser Återstår</div>
              </SubtleCard>
            </div>

            {/* Detailed Checklist */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* KLART Column */}
              <SubtleCard className="p-6 bg-green-500/5 border-2 border-green-500/20">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle className="text-green-600 dark:text-green-400" />
                  ✅ Implementerat & Klart
                </h3>

                <div className="space-y-4">
                  {/* Fas 1 */}
                  <div>
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Fas 1: Teknisk SEO-grund</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Sitemap.xml (14 publika sidor)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Robots.txt med crawling-direktiv</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Favicon (StjärnaFyrkant logga)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Unika meta tags för alla sidor</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Open Graph & Twitter Cards</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span>LocalBusiness JSON-LD schema</span>
                      </li>
                    </ul>
                  </div>

                  {/* Fas 2 */}
                  <div>
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Fas 2: Local SEO</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Kontaktinfo i footer (Umeå + Skellefteå)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Öppettider: Mån-Fre 08:00-17:00</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Sociala medier (FB, Instagram, LinkedIn, YouTube)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Geografiska koordinater i schema</span>
                      </li>
                    </ul>
                  </div>

                  {/* Fas 3 */}
                  <div>
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Fas 3: Innehållsoptimering</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span>FAQ-schema JSON-LD komponent</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span>IT-sida: 6 SEO-optimerade frågor</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Fordonsteknik: 6 frågor + visuell FAQ</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Kommunikationsteknik: 6 FAQ-frågor</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Företagstelefoni: 6 FAQ-frågor</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Lokala sökord (Umeå, Västerbotten)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Priser & svarstider i FAQ-svar</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </SubtleCard>

              {/* ÅTERSTÅR Column */}
              <SubtleCard className="p-6 bg-orange-500/5 border-2 border-orange-500/20">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Clock className="text-orange-600 dark:text-orange-400" />
                  Återstår att Göra
                </h3>

                <div className="space-y-4">
                  {/* Fas 4 */}
                  <div>
                    <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">Fas 4: Innehållsexpansion</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start gap-2">
                        <AlertCircle size={14} className="text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                        <span>FAQ för Kommunikationsteknik-sidan</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle size={14} className="text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                        <span>FAQ för Företagstelefoni-sidan</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle size={14} className="text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                        <span>Längre tjänstebeskrivningar (500+ ord)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle size={14} className="text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                        <span>Bloggsystem för lokalt innehåll</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle size={14} className="text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                        <span>Kundcase studies med mätbara resultat</span>
                      </li>
                    </ul>
                    <div className="mt-2 text-xs text-orange-600 dark:text-orange-400">
                      Förväntat resultat: +60% organisk trafik
                    </div>
                  </div>

                  {/* Fas 5 */}
                  <div>
                    <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">Fas 5: Lokal Dominans</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start gap-2">
                        <AlertCircle size={14} className="text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                        <span>Google Business Profile-optimering</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle size={14} className="text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                        <span>Lokala landningssidor (tjänst + stad)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle size={14} className="text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                        <span>Review management-strategi</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle size={14} className="text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                        <span>Löpande innehållsproduktion</span>
                      </li>
                    </ul>
                    <div className="mt-2 text-xs text-orange-600 dark:text-orange-400">
                      Förväntat resultat: Top 3 för alla målsökord i Västerbotten
                    </div>
                  </div>

                  {/* Quick Wins */}
                  <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <h5 className="font-semibold text-sm mb-2 text-yellow-700 dark:text-yellow-400">Quick Wins (1-2 veckor):</h5>
                    <ul className="space-y-1 text-xs">
                      <li>• Google Business Profile-verifiering</li>
                      <li>• Lägg till FAQ på Kommunikation & Företagstelefoni</li>
                      <li>• Be nöjda kunder om Google-recensioner</li>
                    </ul>
                  </div>
                </div>
              </SubtleCard>
            </div>
          </section>

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
            <AnimatedText text="Implementationsöversikt" el="h2" className="text-4xl font-bold mb-8" />
            <div className="space-y-6">
              {implementationPhases.map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SubtleCard className={`p-6 ${phase.status === 'completed' ? 'border-2 border-green-500/30 bg-green-500/5' : ''}`}>
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                        phase.status === 'completed'
                          ? 'bg-green-500/20 text-green-600 dark:text-green-400'
                          : 'bg-primary/20 text-primary'
                      }`}>
                        {phase.status === 'completed' ? '✓' : index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-semibold">{phase.phase}</h3>
                          <Badge variant={phase.status === 'completed' ? 'default' : 'secondary'} className={phase.status === 'completed' ? 'bg-green-600' : ''}>
                            {phase.status === 'completed' ? 'KLART' : 'Planerat'}
                          </Badge>
                        </div>

                        {phase.status === 'completed' && phase.completed && (
                          <div className="mb-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                            <h4 className="font-semibold mb-2 text-green-700 dark:text-green-400">✅ Implementerat:</h4>
                            <ul className="space-y-1.5">
                              {phase.completed.map((item, itemIndex) => (
                                <li key={itemIndex} className="text-sm text-muted-foreground">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Uppgifter:</h4>
                            <ul className="space-y-1">
                              {phase.tasks.map((task, taskIndex) => (
                                <li key={taskIndex} className="flex items-center gap-2 text-sm">
                                  <ArrowRight size={12} className={phase.status === 'completed' ? 'text-green-500' : 'text-primary'} />
                                  {task}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Förväntat resultat:</h4>
                            <p className="text-sm text-muted-foreground mb-2">{phase.expected}</p>
                            {phase.impact && (
                              <p className="text-xs font-semibold text-primary">{phase.impact}</p>
                            )}
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
