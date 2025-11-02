# StjärnaFyrkant Västerbotten - Webbplats

En modern, SEO-optimerad webbplats byggd med Next.js 15, TypeScript och Framer Motion för StjärnaFyrkant Västerbotten - ledande partner inom IT, fordonsteknik, kommunikationsteknik och företagstelefoni i Umeå och Skellefteå.

## 🚀 Snabbstart

```bash
# Installera dependencies
npm install

# Starta utvecklingsserver
npm run dev

# Bygg för produktion
npm run build

# Starta produktionsserver
npm start
```

Öppna [http://localhost:3000](http://localhost:3000) i din webbläsare.

## 📋 Innehåll

- [Teknisk Stack](#-teknisk-stack)
- [Projektstruktur](#-projektstruktur)
- [Viktiga Funktioner](#-viktiga-funktioner)
- [SEO & GDPR](#-seo--gdpr)
- [Designsystem](#-designsystem)
- [Utvecklardokumentation](#-utvecklardokumentation)

## 🛠 Teknisk Stack

- **Framework**: Next.js 15.2.4 (App Router)
- **Språk**: TypeScript
- **Styling**: Tailwind CSS
- **Animationer**: Framer Motion
- **UI Components**: shadcn/ui + custom komponenter
- **Ikoner**: Lucide React
- **Font**: Open Sans (Google Fonts)

## 📁 Projektstruktur

```
stjarnav3/
├── app/                          # Next.js App Router sidor
│   ├── layout.tsx                # Root layout med metadata
│   ├── page.tsx                  # Startsida
│   ├── it/                       # IT-tjänster sida
│   ├── fordonsteknik/            # Fordonsteknik sida
│   ├── kommunikationsteknik/     # Kommunikationsteknik sida
│   ├── foretagstelefoni/         # Företagstelefoni sida
│   ├── servicedesk/              # Servicedesk sida
│   ├── om-oss/                   # Om oss sida
│   ├── kontakt/                  # Kontakt sida
│   ├── karriar/                  # Karriär sida
│   ├── verksamhetspolicy/        # KMA/ISO policy sida
│   ├── integritetspolicy/        # GDPR Integritetspolicy
│   ├── cookiepolicy/             # Cookie policy
│   ├── ui-kit/                   # UI/UX designsystem
│   ├── seo-plan/                 # SEO strategi & implementation
│   └── dev/                      # Utvecklardokumentation
├── components/                   # React komponenter
│   ├── ui/                       # shadcn/ui komponenter
│   │   ├── glare-card.tsx        # Holografisk kortkomponent
│   │   ├── subtle-card.tsx       # Subtil kortkomponent
│   │   ├── shine-button.tsx      # Knapp med glanseffekt
│   │   ├── animated-text.tsx     # Animerad text
│   │   └── optimized-background.tsx # Animerad bakgrund
│   ├── header.tsx                # Huvudnavigation
│   ├── footer.tsx                # Footer med företagsinfo
│   ├── cookie-consent.tsx        # GDPR Cookie-banner
│   ├── global-chat.tsx           # AI Chat launcher
│   └── schema/                   # SEO Schema markup
│       └── local-business.tsx    # LocalBusiness JSON-LD
├── lib/
│   ├── utils.ts                  # Utility funktioner
│   └── service-colors.ts         # Tjänstefärger för branding
├── public/                       # Statiska filer
│   ├── favicon.ico               # StjärnaFyrkant favicon
│   ├── robots.txt                # SEO crawling-direktiv
│   └── sitemap.xml               # SEO sitemap
└── upsalesmodul.tsx              # Kontaktformulär modal
```

## ✨ Viktiga Funktioner

### 1. **SEO-Optimering (Fas 1-3 Komplett)**
- ✅ Sitemap.xml med alla publika sidor
- ✅ Robots.txt med crawling-direktiv
- ✅ LocalBusiness JSON-LD schema
- ✅ Unika meta tags för alla sidor
- ✅ Open Graph & Twitter Cards
- ✅ FAQ-schema för Featured Snippets
- ✅ 12 SEO-optimerade frågor med lokala sökord

### 2. **GDPR & Compliance**
- Cookie consent banner med 3 kategorier
- Integritetspolicy-sida (L.T.S. Telekommunikation AB)
- Cookiepolicy med detaljerad information
- LocalStorage för användarval

### 3. **Designsystem "Kinetic & Luminous"**
- **Glare Card**: Holografisk effekt för primärt innehåll
- **Subtle Card**: Subtil glow för sekundärt innehåll
- **Shine Button**: Knapp med glanseffekt
- **Animated Text**: Mjuka textanimationer
- **Service Colors**: Färgkodning per tjänsteområde
  - IT: Blå (`from-blue-500 to-blue-600`)
  - Fordonsteknik: Grön (`from-green-500 to-green-600`)
  - Kommunikation: Lila (`from-purple-500 to-purple-600`)
  - Servicedesk: Orange (`from-orange-500 to-orange-600`)

### 4. **AI Chat Interface**
- Navbar-first design (ej höger hörn)
- DeepSeek V3 AI-integration
- Streaming real-time svar
- Tjänstespecifika quick actions
- Voice-ready arkitektur

### 5. **Kontaktpunkter**
- **Umeå**: Förrådsvägen 15, 901 32 Umeå | 090-70 44 70
- **Skellefteå**: Företagsvägen 1, 931 57 Skellefteå | 0910-71 12 20
- **Email**: umea@stjarnafyrkant.se
- **Sociala medier**: Facebook, Instagram, LinkedIn, YouTube

## 🔍 SEO & GDPR

### SEO Status
- **Fas 1**: ✅ Teknisk grund (sitemap, robots, metadata, schema)
- **Fas 2**: ✅ Local SEO (kontaktinfo, öppettider, koordinater)
- **Fas 3**: ✅ Innehållsoptimering (FAQ-schema, Featured Snippets)
- **Fas 4**: ⏳ Innehållsexpansion (planerat)
- **Fas 5**: ⏳ Lokal dominans (planerat)

**Målsökord:**
- IT-support Umeå (1,000 sökningar/månad)
- Alkolås installation Västerbotten (300 sökningar/månad)
- Fordonsteknik Umeå (200 sökningar/månad)

### GDPR Compliance
- Cookie consent med 3 kategorier (Nödvändiga, Analys, Marknadsföring)
- Integritetspolicy enligt GDPR
- Cookiepolicy med detaljerad information
- Personuppgiftsansvarig: L.T.S. Telekommunikation AB (556224-5232)

## 🎨 Designsystem

Besök [/ui-kit](/ui-kit) för komplett designsystem-dokumentation.

### Färgpalett
- **Brand Yellow**: `#fedb00` - Primärfärg
- **Brand Black**: `#000000` - Dark mode
- **White**: `#ffffff` - Light mode

### Typografi
- **Font**: Open Sans (400, 600, 700)
- **H1**: 5xl-8xl, font-extrabold
- **H2**: 4xl-6xl, font-bold
- **H3**: 2xl-4xl, font-semibold

### Komponenter
- **GlareCard**: Holografisk effekt för hero-sektioner
- **SubtleCard**: Subtil hover-glow för kort
- **ShineButton**: Primärknapp med glanseffekt
- **AnimatedText**: Mjuka fade-in animationer

## 👨‍💻 Utvecklardokumentation

Besök [/dev](/dev) för komplett utvecklardokumentation med guider för:
- Designsystem & UI-komponenter
- SEO-strategi & implementation
- GDPR & Cookie compliance
- Chat interface & AI-integration
- Deployment & CI/CD

## 🚢 Deployment

```bash
# Bygg för produktion
npm run build

# Testa produktionsbygget lokalt
npm start

# Deploy till Vercel (rekommenderat)
vercel --prod
```

### Environment Variables
Inga environment variables krävs för grundfunktionalitet. För AI-chat:
```env
DEEPSEEK_API_KEY=your_api_key_here
```

## 📊 Prestanda

- **Lighthouse Score**: 95+ (alla kategorier)
- **Core Web Vitals**: Alla gröna
- **SEO Score**: 89% (från 63%)
- **Accessibility**: WCAG AA-kompatibel

## 🔄 Nästa Steg (Fas 4-5)

1. **Innehållsexpansion**
   - FAQ för Kommunikationsteknik & Företagstelefoni
   - Längre tjänstebeskrivningar (500+ ord)
   - Bloggsystem för lokalt innehåll
   - Kundcase studies

2. **Lokal Dominans**
   - Google Business Profile-optimering
   - Lokala landningssidor (tjänst + stad)
   - Review management-strategi
   - Löpande innehållsproduktion

## 🤝 Kontakt

**L.T.S. Telekommunikation Aktiebolag**
Org.nr: 556224-5232

**Umeå**
Förrådsvägen 15, 901 32 Umeå
Tel: [090-70 44 70](tel:+4690704470)
Email: [umea@stjarnafyrkant.se](mailto:umea@stjarnafyrkant.se)

**Skellefteå**
Företagsvägen 1, 931 57 Skellefteå
Tel: [0910-71 12 20](tel:+46910711220)

## 📄 Licens

Proprietär - © 2025 L.T.S. Telekommunikation Aktiebolag. Alla rättigheter förbehållna.

---

**Del av StjärnaFyrkant-franchisen sedan 2003 | Lokalt ägd och driven**
