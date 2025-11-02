// FAQ Chatbot - Ingen AI, fördefinierade svar baserat på intents

export interface FAQResponse {
  text: string
  links?: Array<{
    label: string
    href: string
  }>
}

interface Intent {
  keywords: string[]
  response: FAQResponse
}

const intents: Intent[] = [
  // IT-Support
  {
    keywords: ['it-support', 'it support', 'it problem', 'datorer', 'nätverk', 'microsoft', 'it-hjälp', 'teknisk support'],
    response: {
      text: 'Vi erbjuder professionell IT-support för företag i Västerbotten. Snabb fjärrsupport och besök på plats vid behov. Support kostar från ca 500 kr/användare/månad.',
      links: [
        { label: 'Läs mer om IT-tjänster', href: '/it' },
        { label: 'Kontakta oss', href: '/kontakt' },
      ]
    }
  },

  // Pris IT
  {
    keywords: ['vad kostar', 'pris it', 'kostnad it', 'it-support pris', 'månadsavgift'],
    response: {
      text: 'IT-support kostar från ca 500 kr/användare/månad för löpande supportavtal. Vi erbjuder även timdebitering för enstaka uppdrag. Kontakta oss för en kostnadsfri behovsanalys!',
      links: [
        { label: 'Boka konsultation', href: '/kontakt' },
        { label: 'Se alla IT-tjänster', href: '/it' },
      ]
    }
  },

  // Alkolås
  {
    keywords: ['alkolås', 'alkotest', 'alcolock', 'alkolas installation', 'alkolås installation'],
    response: {
      text: 'Installation av alkolås tar 1-2 timmar. Vi har drop-in-tider vardagar 08:00-15:00 i Umeå och Skellefteå. Vi är godkända för alla ledande märken.',
      links: [
        { label: 'Läs mer om fordonsteknik', href: '/fordonsteknik' },
        { label: 'Boka tid', href: '/kontakt' },
      ]
    }
  },

  // Taxi
  {
    keywords: ['taxi', 'taxameter', 'taxiutrustning', 'taxi installation', 'taxameter pris'],
    response: {
      text: 'Komplett taxiinstallation med taxameter, takljus och betalningssystem kostar från ca 25 000 kr exkl. moms. Vi hjälper med ansökan till Transportstyrelsen.',
      links: [
        { label: 'Se alla fordonsteknik-tjänster', href: '/fordonsteknik' },
        { label: 'Begär offert', href: '/kontakt' },
      ]
    }
  },

  // Fordonsinredning
  {
    keywords: ['fordonsinredning', 'bil inredning', 'inredning fordon', 'verktyg bil', 'lastutrymme'],
    response: {
      text: 'Vi designar och installerar skräddarsydda fordonsinredningar för hantverkare, service och transport. Effektiv förvaring och arbetsbelysning tillverkat i Sverige.',
      links: [
        { label: 'Se exempel på inredningar', href: '/fordonsteknik' },
        { label: 'Boka konsultation', href: '/kontakt' },
      ]
    }
  },

  // Kommunikation / Komradio
  {
    keywords: ['komradio', 'radio', 'kommunikation', 'gps', 'spårning', 'grouptalk', 'dect'],
    response: {
      text: 'Vi erbjuder traditionell och modern gruppkommunikation: komradio (PMR/DMR), GPS-spårning, inomhustäckning och DECT-telefoner. Perfekt för krävande arbete.',
      links: [
        { label: 'Läs mer om kommunikation', href: '/kommunikationsteknik' },
        { label: 'Boka konsultation', href: '/kontakt' },
      ]
    }
  },

  // Företagstelefoni
  {
    keywords: ['företagstelefoni', 'mobiltelefoner', 'växel', 'teams', 'telefoni', 'voip', 'pbx'],
    response: {
      text: 'Vi erbjuder paketerade mobiltelefoner, skräddarsydda abonnemang, moderna företagsväxlar med AI, Microsoft Teams-integration och headset. Från 5 till 500+ användare.',
      links: [
        { label: 'Se telefoni-lösningar', href: '/foretagstelefoni' },
        { label: 'Boka demo', href: '/kontakt' },
      ]
    }
  },

  // Kontakt
  {
    keywords: ['kontakt', 'telefonnummer', 'ring', 'maila', 'adress', 'öppettider', 'besök'],
    response: {
      text: 'Ring oss på 090-70 44 70 eller maila umea@stjarnafyrkant.se. Vi finns på Förrådsvägen 15 i Umeå. Öppettider: Mån-Fre 08:00-17:00.',
      links: [
        { label: 'Kontaktsida', href: '/kontakt' },
        { label: 'Hitta hit', href: 'https://maps.google.com/?q=Förrådsvägen+15+Umeå' },
      ]
    }
  },

  // Offert / Pris
  {
    keywords: ['offert', 'anbud', 'pris', 'kostnad', 'prisförfrågan', 'vad kostar det'],
    response: {
      text: 'Vi erbjuder kostnadsfri behovsanalys och offert för alla våra tjänster. Kontakta oss så hjälper vi dig hitta rätt lösning för ditt företag!',
      links: [
        { label: 'Begär offert', href: '/kontakt' },
        { label: 'Ring 090-70 44 70', href: 'tel:+4690704470' },
      ]
    }
  },

  // Om företaget
  {
    keywords: ['om oss', 'om stjärnafyrkant', 'företaget', 'historia', 'om er', 'vilka är ni'],
    response: {
      text: 'StjärnaFyrkant Västerbotten har arbetat lokalt i över 40 år och är en del av StjärnaFyrkant-franchisen sedan 2003. Vi erbjuder IT, fordonsteknik och kommunikation.',
      links: [
        { label: 'Läs mer om oss', href: '/om-oss' },
        { label: 'Se våra tjänster', href: '/' },
      ]
    }
  },

  // Karriär / Jobb
  {
    keywords: ['jobb', 'karriär', 'lediga tjänster', 'anställning', 'jobba hos er', 'rekrytering'],
    response: {
      text: 'Vi söker regelbundet IT-konsulter, fordonstekniker och servicepersonal. Välkommen att skicka en spontanansökan!',
      links: [
        { label: 'Se lediga tjänster', href: '/karriar' },
        { label: 'Kontakta HR', href: '/kontakt' },
      ]
    }
  },
]

// Fallback responses för när ingen intent matchar
const fallbackResponses: FAQResponse[] = [
  {
    text: 'Tack för din fråga! Jag är en enkel FAQ-bot och kan hjälpa dig med grundläggande frågor om IT, fordonsteknik och kommunikation. För mer komplexa frågor, ring oss på 090-70 44 70.',
    links: [
      { label: 'Ring oss', href: 'tel:+4690704470' },
      { label: 'Alla tjänster', href: '/' },
    ]
  },
  {
    text: 'Jag förstår inte riktigt din fråga. Vill du veta mer om IT-support, fordonsteknik eller kommunikationslösningar? Du kan också ringa oss direkt på 090-70 44 70.',
    links: [
      { label: 'IT-tjänster', href: '/it' },
      { label: 'Fordonsteknik', href: '/fordonsteknik' },
      { label: 'Kontakt', href: '/kontakt' },
    ]
  },
]

export function getFAQResponse(userMessage: string): FAQResponse {
  const lowercaseMessage = userMessage.toLowerCase()

  // Försök matcha mot intents
  for (const intent of intents) {
    for (const keyword of intent.keywords) {
      if (lowercaseMessage.includes(keyword)) {
        return intent.response
      }
    }
  }

  // Ingen matchning - returnera fallback
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
}

// Välkomstmeddelande
export function getWelcomeMessage(): string {
  return 'Hej! Jag kan hjälpa dig med frågor om IT-support, fordonsteknik och kommunikationslösningar. Vad undrar du över?'
}

// Snabba frågor (quick actions)
export const quickQuestions = [
  { label: 'Vad kostar IT-support?', query: 'Vad kostar IT-support för småföretag?' },
  { label: 'Alkolås installation', query: 'Hur lång tid tar installation av alkolås?' },
  { label: 'Företagstelefoni', query: 'Berätta om företagstelefoni' },
  { label: 'Kontaktuppgifter', query: 'Hur kontaktar jag er?' },
]
