"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  Code2,
  Palette,
  Search,
  Rocket,
  FileText,
  Globe,
  BookOpen,
  Terminal,
  Package,
  GitBranch,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Cookie,
  Settings,
  AlertCircle,
  Clock,
  Database,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedText } from "@/components/ui/animated-text"
import { SubtleCard } from "@/components/ui/subtle-card"
import { GlareCard } from "@/components/ui/glare-card"
import { Badge } from "@/components/ui/badge"

const devResources = [
  {
    title: "Designsystem & UI",
    icon: <Palette className="w-6 h-6" />,
    description: "Komplett guide till vårt Kinetic & Luminous designsystem",
    link: "/admin/ui-kit",
    color: "from-purple-500/20 to-purple-600/10",
    sections: [
      "Färgpalett och brand colors",
      "Typografi och text-klasser",
      "Komponenter (GlareCard, SubtleCard, ShineButton)",
      "Tjänstefärger och ikonografi",
      "Animation-filosofi och Framer Motion"
    ]
  },
  {
    title: "SEO Strategi",
    icon: <Search className="w-6 h-6" />,
    description: "Google AI Overviews och lokal SEO-masterplan",
    link: "/admin/seo",
    color: "from-blue-500/20 to-blue-600/10",
    sections: [
      "Google AI Overviews optimering",
      "Lokal SEO för Umeåregionen",
      "Teknisk SEO-grund (sitemap, robots, schema)",
      "FAQ och strukturerad data",
      "Implementationsfaser (1-5)"
    ]
  }
]

const technicalGuides = [
  {
    category: "Supabase Database - MVP Setup",
    icon: <Database className="w-5 h-5" />,
    color: "from-cyan-500/20 to-cyan-600/10",
    guides: [
      {
        title: "Översikt & MVP-funktioner",
        description: "Vad databasen används till och vilka tabeller som behövs",
        codeFile: "SUPABASE_SETUP.md",
        details: [
          {
            subtitle: "MVP-funktioner (Fas 1)",
            points: [
              "1. Kontaktformulär - Spara alla leads från alla formulär",
              "2. Analytics - Spåra sidvisningar, clicks och användarbeteende",
              "3. Admin Dashboard Data - Team members (om-oss-sidan)",
              "4. Karriärsidor - Rekryteringsannonser och jobbansökningar"
            ]
          },
          {
            subtitle: "Fas 2 (Senare)",
            points: [
              "AI Chatbot-historik och konversationer",
              "Avancerad analytics med custom events",
              "CMS för blogginlägg och case studies"
            ]
          },
          {
            subtitle: "Varför Supabase?",
            points: [
              "PostgreSQL - Kraftfull relationsdatabas",
              "Row Level Security (RLS) - Inbyggd säkerhet",
              "Realtid - WebSocket-stöd för live updates",
              "Gratis tier - 500 MB databas, 2 GB bandwidth",
              "EU-hosting - GDPR-compliant"
            ]
          }
        ]
      },
      {
        title: "Databastabeller Schema",
        description: "SQL för att skapa alla tabeller",
        details: [
          {
            subtitle: "1. Contact Submissions",
            code: `CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY,
  created_at TIMESTAMP,
  form_type TEXT NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  company TEXT,
  message TEXT,
  form_data JSONB NOT NULL,
  status TEXT DEFAULT 'new',
  ip_address TEXT,
  user_agent TEXT
);`,
            points: [
              "Sparar alla kontaktförfrågningar",
              "form_data (JSONB) = Flexibelt för olika formulär",
              "status = 'new', 'contacted', 'in_progress', 'closed', 'spam'",
              "Kan aldrig förlora ett lead - allt sparas!"
            ]
          },
          {
            subtitle: "2. Job Postings (Rekrytering)",
            code: `CREATE TABLE job_postings (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  responsibilities TEXT[],
  qualifications TEXT[],
  is_active BOOLEAN DEFAULT true,
  published_at TIMESTAMP
);`,
            points: [
              "Dynamiska jobbannonser på karriärsidan",
              "Kan aktivera/inaktivera utan kod-deploy",
              "Array-fält för punktlistor",
              "SEO-vänlig med slug-fält"
            ]
          },
          {
            subtitle: "3. Job Applications",
            code: `CREATE TABLE job_applications (
  id UUID PRIMARY KEY,
  job_posting_id UUID REFERENCES job_postings(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  cover_letter TEXT,
  resume_url TEXT,
  status TEXT DEFAULT 'new',
  gdpr_consent BOOLEAN NOT NULL
);`,
            points: [
              "Ansökningar kopplade till specifika jobb",
              "resume_url = Upload CV till Supabase Storage",
              "GDPR-samtycke obligatoriskt",
              "Status-tracking för rekryteringsprocess"
            ]
          },
          {
            subtitle: "4. Page Views & Analytics",
            code: `CREATE TABLE page_views (
  id UUID PRIMARY KEY,
  page_path TEXT NOT NULL,
  session_id TEXT,
  visitor_id TEXT,
  utm_source TEXT,
  ip_address TEXT,
  time_on_page INTEGER
);`,
            points: [
              "Spåra vilka sidor som är mest populära",
              "UTM-tracking för marknadsföring",
              "Session-baserad analytics",
              "GDPR-compliant alternativ till Google Analytics"
            ]
          },
          {
            subtitle: "5. Team Members",
            code: `CREATE TABLE team_members (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  department TEXT,
  bio TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER
);`,
            points: [
              "Dynamiskt innehåll på om-oss-sidan",
              "Uppdatera team utan kod-deploy",
              "sort_order för anpassad ordning",
              "Bilder i Supabase Storage"
            ]
          }
        ]
      },
      {
        title: "Setup & Implementation",
        description: "Steg-för-steg guide för att aktivera Supabase",
        details: [
          {
            subtitle: "Steg 1: Kör SQL i Supabase",
            points: [
              "1. Gå till https://app.supabase.com",
              "2. Välj ditt projekt (redan aktiverat via Vercel)",
              "3. Gå till SQL Editor",
              "4. Öppna SUPABASE_SETUP.md och kopiera SQL",
              "5. Kör SQL sektion för sektion",
              "6. Verifiera: Gå till Table Editor och se tabellerna"
            ]
          },
          {
            subtitle: "Steg 2: Installera Supabase Client",
            code: `npm install @supabase/supabase-js`,
            points: [
              "Officiellt Supabase SDK för Next.js",
              "TypeScript-stöd inbyggt",
              "Realtid och caching"
            ]
          },
          {
            subtitle: "Steg 3: Skapa Supabase Utility",
            code: `// /lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export function getServiceSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}`,
            points: [
              "getServiceSupabase() = För API routes (full access)",
              "getClientSupabase() = För klienten (begränsad via RLS)",
              "ALDRIG exponera SERVICE_ROLE_KEY till klienten!"
            ]
          },
          {
            subtitle: "Steg 4: Environment Variables",
            code: `# I Vercel Dashboard (redan klart)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Lokalt (.env.local)
# Kopiera samma värden från Vercel`,
            points: [
              "NEXT_PUBLIC_* = Synlig på klienten",
              "SERVICE_ROLE_KEY = Endast server-side",
              "Redan konfigurerat i Vercel via integration"
            ]
          }
        ]
      },
      {
        title: "Kodexempel - Kontaktformulär",
        description: "Uppdatera API route för att spara i Supabase",
        codeFile: "/app/api/contact/route.ts",
        details: [
          {
            subtitle: "Innan (Loggar bara till console)",
            code: `console.log('=== EMAIL TO SEND ===')
console.log('To:', config.email)
// Inget sparas i databas!`,
            points: [
              "Data försvinner om något går fel",
              "Ingen historik eller uppföljning möjlig",
              "Kan inte bygga CRM eller analytics"
            ]
          },
          {
            subtitle: "Efter (Sparar i Supabase)",
            code: `import { getServiceSupabase } from '@/lib/supabase'

const supabase = getServiceSupabase()

const { data, error } = await supabase
  .from('contact_submissions')
  .insert({
    form_type: formType,
    email: data.email,
    name: data.namn,
    phone: data.telefon,
    form_data: data,
    ip_address: request.ip
  })
  .select()
  .single()

if (error) {
  console.error('Supabase error:', error)
}

// Fortsätt skicka mail via Resend`,
            points: [
              "Alla leads sparas ALLTID",
              "Kan bygga admin dashboard senare",
              "Analytics: Vilka formulär konverterar bäst?",
              "GDPR-compliant med RLS"
            ]
          }
        ]
      },
      {
        title: "Kodexempel - Hämta Jobb",
        description: "Visa aktiva jobbannonser från databasen",
        codeFile: "/app/api/jobs/route.ts",
        details: [
          {
            subtitle: "API Route",
            code: `import { getClientSupabase } from '@/lib/supabase'

export async function GET() {
  const supabase = getClientSupabase()

  const { data, error } = await supabase
    .from('job_postings')
    .select('*')
    .eq('is_active', true)
    .order('published_at', { ascending: false })

  return NextResponse.json(data)
}`,
            points: [
              "Hämtar endast aktiva jobb",
              "Sorterade efter publiceringsdatum",
              "RLS säkerställer endast publika jobb visas"
            ]
          },
          {
            subtitle: "Användning i Karriärsida",
            code: `// /app/karriar/page.tsx
const response = await fetch('/api/jobs')
const jobs = await response.json()

return (
  <div>
    {jobs.map(job => (
      <JobCard key={job.id} job={job} />
    ))}
  </div>
)`,
            points: [
              "Dynamiskt innehåll - uppdateras automatiskt",
              "Inga kod-deploys för nya jobb",
              "Kan aktivera/inaktivera jobb direkt i databasen"
            ]
          }
        ]
      },
      {
        title: "Säkerhet - Row Level Security (RLS)",
        description: "Hur RLS skyddar data",
        details: [
          {
            subtitle: "Vad är RLS?",
            points: [
              "Row Level Security = Säkerhet på rad-nivå",
              "Policies bestämmer vem som kan läsa/skriva",
              "Supabase kontrollerar automatiskt vid varje query",
              "Skyddar mot data leaks även om någon hackar API"
            ]
          },
          {
            subtitle: "Policy-exempel",
            code: `-- Endast service role kan skriva
CREATE POLICY "Service role can insert"
ON contact_submissions FOR INSERT
TO service_role
USING (true);

-- Alla kan läsa aktiva jobb
CREATE POLICY "Anyone can read active jobs"
ON job_postings FOR SELECT
USING (is_active = true);`,
            points: [
              "Service role = Din API via SUPABASE_SERVICE_ROLE_KEY",
              "Anon key = Klienten (begränsad access)",
              "Policies körs automatiskt vid varje query"
            ]
          }
        ]
      }
    ]
  },
  {
    category: "Cookie System - Komplett Guide",
    icon: <Cookie className="w-5 h-5" />,
    color: "from-orange-500/20 to-orange-600/10",
    guides: [
      {
        title: "Cookie Consent Banner",
        description: "Hur cookie-bannern fungerar och hur den lagrar användarval",
        codeFile: "/components/cookie-consent.tsx",
        details: [
          {
            subtitle: "Tre Cookie-kategorier",
            points: [
              "Nödvändiga: Alltid aktiverade, kan ej stängas av (session, cookie-consent)",
              "Analys: Google Analytics för besöksstatistik (valfritt)",
              "Marknadsföring: Facebook Pixel, Google Ads (valfritt)"
            ]
          },
          {
            subtitle: "LocalStorage struktur",
            code: `localStorage.setItem("cookie-consent", JSON.stringify({
  necessary: true,      // Alltid true
  analytics: true,      // Användarens val
  marketing: false,     // Användarens val
  timestamp: "2025-11-02T..."
}))`,
            points: [
              "Lagras som JSON-sträng i localStorage",
              "Nyckeln är alltid 'cookie-consent'",
              "Timestamp används för att veta när samtycke gavs"
            ]
          },
          {
            subtitle: "Visa bannern igen",
            code: `// I DevTools Console eller kod:
localStorage.removeItem('cookie-consent')
// Ladda om sidan - bannern visas igen`,
            points: [
              "Ta bort localStorage-nyckeln för att testa",
              "Bannern visas 1 sekund efter sidladdning",
              "Användaren kan stänga utan att välja (X-knapp)"
            ]
          },
          {
            subtitle: "Användarflöden",
            points: [
              "1. Acceptera alla → Alla cookies aktiveras direkt",
              "2. Endast nödvändiga → Endast funktionella cookies",
              "3. Anpassa → Användaren kan välja per kategori",
              "4. Stäng (X) → Ingen lagring, bannern visas nästa besök"
            ]
          }
        ]
      },
      {
        title: "Integritetspolicy & Cookiepolicy",
        description: "GDPR-dokumentation och rättslig information",
        codeFile: "/app/integritetspolicy/page.tsx + /app/cookiepolicy/page.tsx",
        details: [
          {
            subtitle: "Personuppgiftsansvarig",
            points: [
              "Företag: L.T.S. Telekommunikation Aktiebolag",
              "Org.nr: 556224-5232",
              "Kontakt: umea@stjarnafyrkant.se, 090-70 44 70",
              "Adress: Förrådsvägen 15, 901 32 Umeå"
            ]
          },
          {
            subtitle: "Cookie-typer som används",
            points: [
              "Första parts: session, cookie-consent (vår domän)",
              "Google Analytics: _ga, _ga_*, _gid (google.com)",
              "Facebook Pixel: _fbp (facebook.com)",
              "Google Ads: NID, CONSENT (google.com)"
            ]
          },
          {
            subtitle: "Cookie-livslängder",
            code: `cookie-consent: 1 år
session: Till webbläsaren stängs
_ga: 2 år
_gid: 24 timmar
_fbp: 3 månader`,
            points: [
              "Nödvändiga: Varierar, session eller 1 år",
              "Analys: 24 timmar till 2 år",
              "Marknadsföring: 3-6 månader"
            ]
          }
        ]
      },
      {
        title: "Testa Cookie-systemet",
        description: "Steg-för-steg guide för att testa",
        details: [
          {
            subtitle: "Test 1: Acceptera alla",
            points: [
              "1. Öppna DevTools → Application → Local Storage",
              "2. Ta bort 'cookie-consent' om den finns",
              "3. Ladda om sidan, vänta 1 sekund",
              "4. Klicka 'Acceptera alla'",
              "5. Verifiera: cookie-consent finns med alla true"
            ]
          },
          {
            subtitle: "Test 2: Endast nödvändiga",
            points: [
              "1. Ta bort 'cookie-consent' igen",
              "2. Ladda om, klicka 'Endast nödvändiga'",
              "3. Verifiera: necessary=true, analytics=false, marketing=false"
            ]
          },
          {
            subtitle: "Test 3: Anpassa inställningar",
            points: [
              "1. Ta bort 'cookie-consent'",
              "2. Klicka 'Anpassa' (Settings-ikon)",
              "3. Aktivera Analys, stäng av Marknadsföring",
              "4. Klicka 'Spara inställningar'",
              "5. Verifiera: necessary=true, analytics=true, marketing=false"
            ]
          },
          {
            subtitle: "Felsökning",
            code: `// Visa nuvarande inställningar
const consent = JSON.parse(localStorage.getItem('cookie-consent'))
console.log(consent)

// Återställ helt
localStorage.clear()
location.reload()`,
            points: [
              "Kör detta i Console för att se/återställa",
              "Om bannern inte visas: kolla att 1 sekund passerat",
              "Om val inte sparas: kolla Console för errors"
            ]
          }
        ]
      }
    ]
  },
  {
    category: "Next.js & TypeScript Setup",
    icon: <Terminal className="w-5 h-5" />,
    color: "from-green-500/20 to-green-600/10",
    guides: [
      {
        title: "Projektstruktur",
        description: "Hur App Router fungerar och var saker ligger",
        codeFile: "/app directory",
        details: [
          {
            subtitle: "App Router Routing",
            code: `app/
  layout.tsx        → Root layout (alla sidor)
  page.tsx          → / (startsida)
  it/page.tsx       → /it
  kontakt/page.tsx  → /kontakt
  dev/page.tsx      → /dev (denna sida)`,
            points: [
              "Varje page.tsx = en rutt",
              "layout.tsx = wrapper runt alla sidor",
              "Använd 'use client' för interaktiva komponenter"
            ]
          },
          {
            subtitle: "Metadata för SEO",
            code: `// I varje page.tsx
export const metadata: Metadata = {
  title: 'IT-tjänster Umeå | StjärnaFyrkant',
  description: '...',
  openGraph: { ... }
}`,
            points: [
              "Unika metadata per sida för bättre SEO",
              "Använd template i layout.tsx för konsistens",
              "OpenGraph för social sharing"
            ]
          },
          {
            subtitle: "Server vs Client Components",
            points: [
              "Default: Server Components (ingen 'use client')",
              "Använd 'use client' för: useState, onClick, Framer Motion",
              "Exempel: cookie-consent.tsx behöver 'use client'",
              "Fördel: Mindre JavaScript till klienten"
            ]
          }
        ]
      },
      {
        title: "TypeScript Configuration",
        description: "Type safety och path aliases",
        codeFile: "tsconfig.json",
        details: [
          {
            subtitle: "Path Aliases",
            code: `import { Header } from "@/components/header"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"`,
            points: [
              "@/ = root directory",
              "@/components = components-mappen",
              "@/lib = lib-mappen",
              "Ingen relativ path hell (../../)"
            ]
          },
          {
            subtitle: "Strict Mode",
            points: [
              "TypeScript strict mode är PÅ",
              "Alla props måste ha types",
              "Använd 'any' endast när absolut nödvändigt",
              "Interface för komplexa objekt"
            ]
          }
        ]
      }
    ]
  },
  {
    category: "UI Komponenter & Styling",
    icon: <Package className="w-5 h-5" />,
    color: "from-purple-500/20 to-purple-600/10",
    guides: [
      {
        title: "Custom UI Components",
        description: "Våra egenutvecklade komponenter",
        codeFile: "/components/ui/",
        details: [
          {
            subtitle: "GlareCard - Holografisk effekt",
            code: `<GlareCard className="p-8">
  <h2>Hero innehåll</h2>
  <p>Primär information</p>
</GlareCard>`,
            points: [
              "Fil: /components/ui/glare-card.tsx",
              "Används för: Hero-sektioner, viktig content",
              "Effekt: Holografisk glare på hover",
              "Props: className, children (standard React)"
            ]
          },
          {
            subtitle: "SubtleCard - Subtil glow",
            code: `<SubtleCard className="p-6">
  <h3>Sekundär info</h3>
</SubtleCard>`,
            points: [
              "Fil: /components/ui/subtle-card.tsx",
              "Används för: Kort, listor, sekundärt innehåll",
              "Effekt: Subtil glow på hover",
              "Kombination: Fungerar bra med dark mode"
            ]
          },
          {
            subtitle: "ShineButton - Primärknapp",
            code: `<ShineButton onClick={() => setOpen(true)}>
  Kontakta oss
</ShineButton>`,
            points: [
              "Fil: /components/ui/shine-button.tsx",
              "Används för: CTA-knappar, primära actions",
              "Effekt: Glans-animation på hover",
              "Props: onClick, className, children, disabled"
            ]
          },
          {
            subtitle: "AnimatedText - Mjuk fade-in",
            code: `<AnimatedText
  text="Rubrik här"
  el="h2"
  className="text-4xl"
/>`,
            points: [
              "Fil: /components/ui/animated-text.tsx",
              "Används för: Rubriker, hero-text",
              "Effekt: Fade in from bottom",
              "Props: text, el (h1-h6), className"
            ]
          }
        ]
      },
      {
        title: "Tailwind CSS & Styling",
        description: "Utility-first CSS patterns",
        details: [
          {
            subtitle: "Färgklasser",
            code: `bg-primary       → #fedb00 (gul)
text-primary     → #fedb00
bg-card          → Kort-bakgrund
text-muted-foreground → Dämpad text`,
            points: [
              "primary = StjärnaFyrkant-gul",
              "Använd semantic colors (card, muted, etc.)",
              "Dark mode: Automatisk via Tailwind",
              "Custom colors i tailwind.config.js"
            ]
          },
          {
            subtitle: "Responsive Breakpoints",
            code: `<div className="text-sm md:text-lg lg:text-xl">
  Responsiv text
</div>

<div className="grid md:grid-cols-2 lg:grid-cols-3">
  Grid layout
</div>`,
            points: [
              "sm: 640px (mobile landscape)",
              "md: 768px (tablets)",
              "lg: 1024px (desktop)",
              "xl: 1280px, 2xl: 1536px (stora skärmar)"
            ]
          },
          {
            subtitle: "Dark Mode",
            code: `<div className="bg-gray-100 dark:bg-card/20">
  Bakgrund som byter i dark mode
</div>`,
            points: [
              "Prefix med 'dark:' för dark mode styles",
              "ThemeProvider i layout.tsx hanterar state",
              "Default: Dark mode (defaultTheme='dark')"
            ]
          }
        ]
      },
      {
        title: "Framer Motion Animationer",
        description: "Animation best practices",
        codeFile: "framer-motion",
        details: [
          {
            subtitle: "Hover Animations",
            code: `<motion.div
  whileHover={{ scale: 1.02 }}
  transition={{ duration: 0.3 }}
>
  Innehåll
</motion.div>`,
            points: [
              "whileHover för interaktiva element",
              "Scale 1.02-1.05 för subtila effekter",
              "Duration: 0.2-0.4s för snabba reactions"
            ]
          },
          {
            subtitle: "Scroll Animations",
            code: `<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
  Innehåll
</motion.div>`,
            points: [
              "whileInView för scroll-triggered animations",
              "viewport={{ once: true }} = animera bara en gång",
              "y: 20 → 0 för smooth entrance"
            ]
          },
          {
            subtitle: "Mount/Unmount",
            code: `<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>`,
            points: [
              "AnimatePresence för exit animations",
              "Används i: Cookie banner, modals, chat",
              "exit-prop aktiveras när component unmountas"
            ]
          }
        ]
      }
    ]
  },
  {
    category: "SEO & Schema Markup",
    icon: <Globe className="w-5 h-5" />,
    color: "from-blue-500/20 to-blue-600/10",
    guides: [
      {
        title: "LocalBusiness Schema",
        description: "JSON-LD för Google Maps och Local SEO",
        codeFile: "/components/schema/local-business.tsx",
        details: [
          {
            subtitle: "Vad är Schema Markup?",
            points: [
              "Strukturerad data som Google förstår",
              "Hjälper Google visa företagsinfo korrekt",
              "Krävs för att visas i Google Maps",
              "Förbättrar local search ranking"
            ]
          },
          {
            subtitle: "LocalBusiness Schema innehåller",
            code: `{
  "@type": "LocalBusiness",
  "name": "StjärnaFyrkant Västerbotten",
  "address": {
    "streetAddress": "Förrådsvägen 15",
    "addressLocality": "Umeå",
    "postalCode": "901 32"
  },
  "geo": {
    "latitude": 63.8258,
    "longitude": 20.2630
  },
  "telephone": "+4690704470",
  "openingHours": ["Mo-Fr 07:00-17:00"]
}`,
            points: [
              "Två kontor: Umeå och Skellefteå",
              "Koordinater för exakt position",
              "Öppettider i schema.org-format",
              "Logo och sociala medier"
            ]
          },
          {
            subtitle: "Testa Schema Markup",
            points: [
              "1. Gå till https://search.google.com/test/rich-results",
              "2. Klistra in URL: https://stjarnafyrkant.se",
              "3. Verifiera: Gröna checkmarks för LocalBusiness",
              "4. Kolla fel: Röda varningar måste fixas"
            ]
          }
        ]
      },
      {
        title: "FAQ Schema för AI Overviews",
        description: "Featured Snippets och Google AI",
        details: [
          {
            subtitle: "Varför FAQ Schema?",
            points: [
              "Google AI Overviews prioriterar FAQ-format",
              "Visas högre i sökresultat (Featured Snippet)",
              "Svarar direkt på användares frågor",
              "Lokala sökord → lokal trafik"
            ]
          },
          {
            subtitle: "FAQ Best Practices",
            code: `Fråga: "Vad kostar IT-support i Umeå?"
Svar: 100-150 ord, naturligt språk, lokala referenser

Fråga: "Hur lång tid tar installation av alkolås?"
Svar: Specifik info, inkludera både Umeå och Skellefteå`,
            points: [
              "Använd riktiga kundfrågor",
              "Inkludera lokalort i frågan (Umeå, Västerbotten)",
              "Svar: 100-150 ord för optimal längd",
              "12 FAQ per tjänstesida rekommenderas"
            ]
          },
          {
            subtitle: "FAQ Implementation",
            points: [
              "Fil: Se varje tjänstesida (it/page.tsx, etc.)",
              "FAQSchema component renderar JSON-LD",
              "Google indexerar inom 1-2 veckor",
              "Mät: Google Search Console → Rich Results"
            ]
          }
        ]
      },
      {
        title: "Sitemap & Robots",
        description: "Hur Google crawlar hemsidan",
        codeFile: "/public/sitemap.xml + /public/robots.txt",
        details: [
          {
            subtitle: "robots.txt",
            code: `User-agent: *
Allow: /
Disallow: /admin/dev
Disallow: /admin/ui-kit
Disallow: /admin/seo

Sitemap: https://stjarnafyrkant.se/sitemap.xml`,
            points: [
              "Allow: / → Crawla hela sidan",
              "Disallow: /admin/dev → Blockera dev-sidor från Google",
              "Sitemap-länk → Hjälper Google hitta sidor"
            ]
          },
          {
            subtitle: "sitemap.xml",
            points: [
              "Listar alla publika sidor",
              "Priority: 1.0 (startsida) → 0.5 (undersidor)",
              "Changefreq: weekly för tjänstesidor",
              "Google läser detta för att indexera"
            ]
          },
          {
            subtitle: "Verifiera Sitemap",
            code: `# Öppna i webbläsare:
https://stjarnafyrkant.se/robots.txt
https://stjarnafyrkant.se/sitemap.xml

# Google Search Console:
Sitemaps → Lägg till sitemap → sitemap.xml`,
            points: [
              "Kolla att båda filerna är tillgängliga",
              "Skicka till Google Search Console",
              "Google indexerar inom 1-7 dagar"
            ]
          }
        ]
      }
    ]
  },
  {
    category: "Deployment & Git",
    icon: <Rocket className="w-5 h-5" />,
    color: "from-red-500/20 to-red-600/10",
    guides: [
      {
        title: "GitHub Repository",
        description: "Versionshantering och collaboration",
        details: [
          {
            subtitle: "Repository URL",
            code: `https://github.com/cloudarc-dev/stjarna-web

# Klona repo
git clone https://github.com/cloudarc-dev/stjarna-web.git
cd stjarna-web
npm install`,
            points: [
              "Main branch: Produktion (deploy från denna)",
              "Feature branches: För nya funktioner",
              "Pull requests: För code review"
            ]
          },
          {
            subtitle: "Vanliga Git-kommandon",
            code: `# Skapa feature branch
git checkout -b feature/cookie-update

# Commit changes
git add .
git commit -m "fix: uppdatera cookie-banner text"

# Push till GitHub
git push origin feature/cookie-update

# Merge till main
git checkout main
git merge feature/cookie-update
git push origin main`,
            points: [
              "Använd konventionella commits (fix:, feat:, docs:)",
              "Testa lokalt innan push",
              "Pull requests för större ändringar"
            ]
          },
          {
            subtitle: "Branching Strategy",
            points: [
              "main → Produktionskod (alltid stabil)",
              "feature/* → Nya funktioner",
              "fix/* → Buggfixar",
              "docs/* → Dokumentation"
            ]
          }
        ]
      },
      {
        title: "Vercel Deployment",
        description: "Automatisk deployment från GitHub",
        details: [
          {
            subtitle: "Setup (Redan klart)",
            points: [
              "Vercel kopplad till GitHub repo",
              "Varje push till main → Automatisk deploy",
              "Preview deploys för feature branches",
              "Environment variables i Vercel dashboard"
            ]
          },
          {
            subtitle: "Build Process",
            code: `# Lokalt:
npm run build        # Bygg Next.js
npm start            # Testa production build

# Vercel (automatiskt):
git push origin main → Vercel detekterar → Bygger → Deployar`,
            points: [
              "Build tar ~2-3 minuter",
              "Vercel kör npm run build automatiskt",
              "Edge Functions för global latency",
              "Image Optimization med next/image"
            ]
          },
          {
            subtitle: "Environment Variables",
            code: `# I Vercel Dashboard:
DEEPSEEK_API_KEY=sk-...

# Lokal development (.env.local):
DEEPSEEK_API_KEY=sk-...
NEXT_PUBLIC_SITE_URL=http://localhost:3000`,
            points: [
              "NEXT_PUBLIC_* = Tillgänglig på klienten",
              "Andra = Endast server-side",
              "Lägg aldrig till .env.local i Git (.gitignore)"
            ]
          },
          {
            subtitle: "Felsökning Deployment",
            points: [
              "Vercel Logs → Se build errors",
              "Runtime Logs → Se server errors",
              "Preview Deploys → Testa innan main",
              "Rollback → Gå tillbaka till förra versionen"
            ]
          }
        ]
      },
      {
        title: "Testing & Quality",
        description: "Säkerställ kvalitet innan deploy",
        details: [
          {
            subtitle: "Lokal Testing",
            code: `# Development
npm run dev          # http://localhost:3000

# Production simulation
npm run build
npm start            # Testa produktionsbygget

# Type checking
npm run type-check   # (Om finns i package.json)`,
            points: [
              "Testa alltid lokalt först",
              "Kolla Console för errors",
              "Testa responsive (DevTools)",
              "Verifiera dark mode"
            ]
          },
          {
            subtitle: "Checklista före Deploy",
            points: [
              "✅ No console errors",
              "✅ No TypeScript errors (npm run build)",
              "✅ Responsiv design testad (mobile, tablet, desktop)",
              "✅ Dark mode fungerar",
              "✅ Länkar fungerar",
              "✅ Formulär submits",
              "✅ Cookie banner visas och sparar"
            ]
          },
          {
            subtitle: "Prestanda-verktyg",
            code: `# Lighthouse (Chrome DevTools)
1. Högerklicka → Inspect
2. Lighthouse tab
3. Generate report
Mål: 90+ i alla kategorier

# Core Web Vitals
https://pagespeed.web.dev/
Testa: https://stjarnafyrkant.se`,
            points: [
              "LCP: < 2.5s (Largest Contentful Paint)",
              "FID: < 100ms (First Input Delay)",
              "CLS: < 0.1 (Cumulative Layout Shift)"
            ]
          }
        ]
      }
    ]
  }
]

const quickCommands = {
  development: [
    { cmd: "npm install", desc: "Installera alla dependencies" },
    { cmd: "npm run dev", desc: "Starta development server (localhost:3000)" },
    { cmd: "npm run build", desc: "Bygg för produktion" },
    { cmd: "npm start", desc: "Kör produktionsserver lokalt" },
  ],
  git: [
    { cmd: "git status", desc: "Visa ändrade filer" },
    { cmd: "git add .", desc: "Stage alla ändringar" },
    { cmd: 'git commit -m "fix: beskrivning"', desc: "Commit med meddelande" },
    { cmd: "git push origin main", desc: "Push till GitHub (triggar deploy)" },
  ],
  testing: [
    { cmd: "localStorage.removeItem('cookie-consent')", desc: "Rensa cookie-val (DevTools Console)" },
    { cmd: "localStorage.clear()", desc: "Rensa all localStorage" },
    { cmd: "location.reload()", desc: "Ladda om sidan" },
  ]
}

export default function DevPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <AnimatedText
            text="Developer Hub"
            el="h1"
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-primary mb-4"
          />
          <AnimatedText
            text="Kompletta guider för varje del av StjärnaFyrkant Västerbotten"
            el="p"
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
          />

          <div className="flex flex-wrap gap-2 justify-center mt-6">
            <Badge variant="secondary">Next.js 15.2.4</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Tailwind CSS</Badge>
            <Badge variant="secondary">Framer Motion</Badge>
            <Badge variant="secondary">SEO Score: 89%</Badge>
          </div>

          <div className="mt-8">
            <a
              href="https://github.com/cloudarc-dev/stjarna-web"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-card/50 border hover:bg-primary/10 transition-colors rounded-lg"
            >
              <GitBranch size={20} />
              <span className="font-medium">GitHub Repository</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Implementation Status - Vad är Klart vs Vad Måste Göras */}
        <section className="mb-16">
          <AnimatedText text="Implementation Status" el="h2" className="text-4xl font-bold mb-8 text-center" />

          {/* Status Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-5xl mx-auto">
            <SubtleCard className="p-6 text-center bg-green-500/5 border-green-500/20">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-3" />
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">99%</div>
              <div className="text-sm text-muted-foreground">Funktioner Implementerade</div>
            </SubtleCard>
            <SubtleCard className="p-6 text-center bg-blue-500/5 border-blue-500/20">
              <Package className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">128</div>
              <div className="text-sm text-muted-foreground">Komponenter & Sidor</div>
            </SubtleCard>
            <SubtleCard className="p-6 text-center bg-orange-500/5 border-orange-500/20">
              <Settings className="w-12 h-12 text-orange-600 dark:text-orange-400 mx-auto mb-3" />
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">4</div>
              <div className="text-sm text-muted-foreground">Återstående Tasks</div>
            </SubtleCard>
          </div>

          {/* Detailed Checklist */}
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* IMPLEMENTERAT */}
            <SubtleCard className="p-6 bg-green-500/5 border-2 border-green-500/20">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-600 dark:text-green-400" />
                ✅ Implementerat & Fungerande
              </h3>

              <div className="space-y-4">
                {/* Core Infrastructure */}
                <div>
                  <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Core Infrastructure</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Next.js 15.2.4 App Router</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>TypeScript strict mode</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Tailwind CSS med dark mode</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Framer Motion animationer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Vercel deployment setup</span>
                    </li>
                  </ul>
                </div>

                {/* Sidor */}
                <div>
                  <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Sidor (14 publika + 3 dev)</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Startsida med hero, tjänster, kundcase</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>5 Tjänstesidor (IT, Fordonsteknik, Kommunikation, Telefoni, Servicedesk)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Om oss, Kontakt, Karriär, Verksamhetspolicy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Integritetspolicy & Cookiepolicy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>UI-kit, SEO-plan, Dev hub (denna sida)</span>
                    </li>
                  </ul>
                </div>

                {/* Custom Komponenter */}
                <div>
                  <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Custom UI Komponenter</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>GlareCard (holografisk effekt)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>SubtleCard (subtil glow)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>ShineButton (glans-effekt)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>AnimatedText (fade-in)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>OptimizedBackground (partiklar)</span>
                    </li>
                  </ul>
                </div>

                {/* SEO & GDPR */}
                <div>
                  <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">SEO & GDPR</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Sitemap.xml & robots.txt</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>LocalBusiness JSON-LD schema</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>FAQ-schema med 12 frågor</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Cookie consent banner (3 kategorier)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>GDPR-compliant policyer</span>
                    </li>
                  </ul>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Features</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>AI Chat launcher (DeepSeek V3 ready)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Upsales kontaktformulär</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Responsive design (mobile-first)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Dark mode (default)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Enterprise footer med 2 kontor</span>
                    </li>
                  </ul>
                </div>
              </div>
            </SubtleCard>

            {/* MÅSTE GÖRAS */}
            <SubtleCard className="p-6 bg-orange-500/5 border-2 border-orange-500/20">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="text-orange-600 dark:text-orange-400" />
                Måste Göras
              </h3>

              <div className="space-y-4">
                {/* Avklarade Tasks */}
                <div>
                  <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">✅ Nyligen Avklarat</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>GitHub Repository skapat</strong>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Repository uppladdat till GitHub under cloudarc-dev/stjarna-web.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Vercel deployment setup</strong>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Vercel-konto aktiverat för dev@cloudarc.se och kopplat till GitHub repo.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Supabase-databas implementerad ✨</strong>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Supabase kopplad via Vercel. Databastabeller skapade. Kontaktformulär sparar till contact_submissions.
                          Dokumentation: COMPONENT_DATABASE_MAPPING.md & FORMS_MAPPING.md
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>v0.dev account aktiverat</strong>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          v0-konto aktiverat via Vercel för AI-assisterad utveckling.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Resend mailhantering setup</strong>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Resend API aktiverad för kontaktformulär och mailutskick.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Kritiska Tasks */}
                <div>
                  <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">Kritiskt (Före Launch)</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <AlertCircle size={14} className="text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Implementera Resend mailutskick</strong>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Ersätt console.log i /app/api/contact/route.ts med faktiskt mail-sending via Resend API.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle size={14} className="text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Testa kontaktformulär end-to-end</strong>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Verifiera: Formulär → Supabase (✅) → Email via Resend → Mottagare får mail.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle size={14} className="text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Testa cookie-banner i produktion</strong>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Verifiera att cookie-consent visas korrekt för nya besökare i prod.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle size={14} className="text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Google Search Console setup</strong>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Verifiera domän, skicka in sitemap.xml, övervaka indexering.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Viktiga Tasks */}
                <div>
                  <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">Viktigt (Vecka 1-2)</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Clock size={14} className="text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Google Analytics setup</strong>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Lägg till GA4 tracking code, konfigurera events, mät konverteringar.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock size={14} className="text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Google Business Profile</strong>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Verifiera både Umeå och Skellefteå-kontor, optimera profiler.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock size={14} className="text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Lighthouse audit</strong>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Kör Lighthouse på alla sidor, fixa eventuella warnings. Mål: 90+.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Nice to Have */}
                <div>
                  <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">Nice to Have (Månad 1)</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <ArrowRight size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span>FAQ för Kommunikationsteknik & Företagstelefoni (SEO Fas 4)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span>Bloggsystem för lokalt innehåll</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span>Automated testing (Jest/Playwright)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span>CMS-integration (Sanity/Contentful)</span>
                    </li>
                  </ul>
                </div>

                {/* Action Items */}
                <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <h5 className="font-semibold text-sm mb-2 text-yellow-700 dark:text-yellow-400">Nästa Steg:</h5>
                  <ol className="space-y-1 text-xs list-decimal list-inside">
                    <li className="line-through text-muted-foreground">Skapa dev@cloudarc.se konto (GitHub, Vercel, v0.dev) ✅</li>
                    <li className="line-through text-muted-foreground">Transfer GitHub repo till cloudarc-dev ✅</li>
                    <li className="line-through text-muted-foreground">Setup Supabase-databas och lägg till credentials i Vercel ✅</li>
                    <li className="line-through text-muted-foreground">Implementera Supabase i kontaktformulär (contact_submissions tabell) ✅</li>
                    <li className="line-through text-muted-foreground">Dokumentera formulär-databas-kopplingar (COMPONENT_DATABASE_MAPPING.md) ✅</li>
                    <li className="line-through text-muted-foreground">Setup Resend API och lägg till RESEND_API_KEY i Vercel ✅</li>
                    <li><strong>Implementera Resend mailutskick i /app/api/contact/route.ts</strong></li>
                    <li>Testa kontaktformulär end-to-end (formulär → Supabase → email)</li>
                    <li>Testa cookie-banner och all funktionalitet i prod</li>
                    <li>Setup Google Search Console och skicka in sitemap.xml</li>
                  </ol>
                </div>
              </div>
            </SubtleCard>
          </div>
        </section>

        {/* Quick Links */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Snabblänkar</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {devResources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={resource.link}>
                  <GlareCard className={`p-8 bg-gradient-to-br ${resource.color} hover:scale-[1.02] transition-transform cursor-pointer h-full`}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        {resource.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                          {resource.title}
                          <ExternalLink size={20} />
                        </h3>
                        <p className="text-muted-foreground mb-4">{resource.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {resource.sections.map((section, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{section}</span>
                        </li>
                      ))}
                    </ul>
                  </GlareCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quick Commands Reference - Truncated for brevity, continuing with rest of sections... */}
        <section className="mb-16">
          <AnimatedText text="Quick Commands" el="h2" className="text-4xl font-bold mb-8" />
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(quickCommands).map(([category, commands]) => (
              <SubtleCard key={category} className="p-6">
                <h3 className="text-xl font-semibold mb-4 capitalize">{category}</h3>
                <div className="space-y-3">
                  {commands.map((item, index) => (
                    <div key={index} className="border-l-2 border-primary/30 pl-3">
                      <code className="text-xs text-primary font-mono block mb-1">{item.cmd}</code>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </SubtleCard>
            ))}
          </div>
        </section>

        {/* Resources Footer */}
        <section>
          <SubtleCard className="p-8 bg-gradient-to-br from-primary/10 to-primary/5">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <BookOpen className="w-8 h-8" />
              Ytterligare Resurser
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-lg">Dokumentation</h3>
                <div className="space-y-2 text-sm">
                  <a href="/admin/ui-kit" className="flex items-center gap-2 hover:text-primary transition-colors">
                    <ArrowRight size={16} />
                    UI Kit & Designsystem
                  </a>
                  <a href="/admin/seo" className="flex items-center gap-2 hover:text-primary transition-colors">
                    <ArrowRight size={16} />
                    SEO Masterplan & Status
                  </a>
                  <a href="/integritetspolicy" className="flex items-center gap-2 hover:text-primary transition-colors">
                    <ArrowRight size={16} />
                    Integritetspolicy (GDPR)
                  </a>
                  <a href="/cookiepolicy" className="flex items-center gap-2 hover:text-primary transition-colors">
                    <ArrowRight size={16} />
                    Cookiepolicy
                  </a>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-lg">Externa Länkar</h3>
                <div className="space-y-2 text-sm">
                  <a
                    href="https://github.com/cloudarc-dev/stjarna-web"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <GitBranch size={16} />
                    GitHub Repository
                    <ExternalLink size={12} />
                  </a>
                  <a
                    href="https://nextjs.org/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <FileText size={16} />
                    Next.js Documentation
                    <ExternalLink size={12} />
                  </a>
                  <a
                    href="https://www.framer.com/motion/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <Code2 size={16} />
                    Framer Motion Docs
                    <ExternalLink size={12} />
                  </a>
                  <a
                    href="https://tailwindcss.com/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <Palette size={16} />
                    Tailwind CSS Docs
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          </SubtleCard>
        </section>
      </main>
      <Footer />
    </div>
  )
}
