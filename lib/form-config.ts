// Form Configuration System - Centraliserad hantering av alla formulär

export type FormType =
  | 'it-support'
  | 'telefoni-support'
  | 'alkolaas'
  | 'fordon'
  | 'komradio'
  | 'service-reparation'
  | 'order'
  | 'foretagstelefoni'
  | 'projekt'
  | 'jobbansoekan'
  | 'general'

export interface FormConfig {
  type: FormType
  email: string
  subject: string
  title: string
  description: string
  fields: FormField[]
}

export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  required: boolean
  placeholder?: string
  options?: string[]
}

// Centraliserad formulärkonfiguration
export const formConfigs: Record<FormType, FormConfig> = {
  'it-support': {
    type: 'it-support',
    email: 'servicedesk@stjarnafyrkant.se',
    subject: 'IT-support förfrågan',
    title: 'IT-support',
    description: 'Beskriv ditt IT-problem så återkommer vi så snart som möjligt.',
    fields: [
      { name: 'name', label: 'Namn', type: 'text', required: true, placeholder: 'Ditt namn' },
      { name: 'company', label: 'Företag', type: 'text', required: true, placeholder: 'Företagsnamn' },
      { name: 'email', label: 'E-post', type: 'email', required: true, placeholder: 'din.epost@företag.se' },
      { name: 'phone', label: 'Telefon', type: 'tel', required: true, placeholder: '070-123 45 67' },
      { name: 'message', label: 'Beskriv problemet', type: 'textarea', required: true, placeholder: 'Beskriv ditt IT-problem så detaljerat som möjligt...' },
    ],
  },
  'telefoni-support': {
    type: 'telefoni-support',
    email: 'servicedesk@stjarnafyrkant.se',
    subject: 'Telefonisupport förfrågan',
    title: 'Telefonisupport',
    description: 'Beskriv ditt telefoniproblem så hjälper vi dig.',
    fields: [
      { name: 'name', label: 'Namn', type: 'text', required: true, placeholder: 'Ditt namn' },
      { name: 'company', label: 'Företag', type: 'text', required: true, placeholder: 'Företagsnamn' },
      { name: 'email', label: 'E-post', type: 'email', required: true, placeholder: 'din.epost@företag.se' },
      { name: 'phone', label: 'Telefon', type: 'tel', required: true, placeholder: '070-123 45 67' },
      { name: 'message', label: 'Beskriv problemet', type: 'textarea', required: true, placeholder: 'Beskriv ditt telefoniproblem...' },
    ],
  },
  'alkolaas': {
    type: 'alkolaas',
    email: 'verkstad.umea@stjarnafyrkant.se',
    subject: 'Alkolås förfrågan',
    title: 'Alkolås',
    description: 'Kontakta oss för installation och service av alkolås.',
    fields: [
      { name: 'name', label: 'Namn', type: 'text', required: true, placeholder: 'Ditt namn' },
      { name: 'company', label: 'Företag', type: 'text', required: false, placeholder: 'Företagsnamn (valfritt)' },
      { name: 'email', label: 'E-post', type: 'email', required: true, placeholder: 'din.epost@exempel.se' },
      { name: 'phone', label: 'Telefon', type: 'tel', required: true, placeholder: '070-123 45 67' },
      { name: 'vehicle', label: 'Fordon', type: 'text', required: true, placeholder: 'Märke och modell' },
      { name: 'message', label: 'Meddelande', type: 'textarea', required: true, placeholder: 'Beskriv din förfrågan...' },
    ],
  },
  'fordon': {
    type: 'fordon',
    email: 'verkstad.umea@stjarnafyrkant.se',
    subject: 'Fordonsutrustning förfrågan',
    title: 'Fordonsutrustning',
    description: 'Vi hjälper dig med inredning, taxi-utrustning och specialanpassningar.',
    fields: [
      { name: 'name', label: 'Namn', type: 'text', required: true, placeholder: 'Ditt namn' },
      { name: 'company', label: 'Företag', type: 'text', required: true, placeholder: 'Företagsnamn' },
      { name: 'email', label: 'E-post', type: 'email', required: true, placeholder: 'din.epost@företag.se' },
      { name: 'phone', label: 'Telefon', type: 'tel', required: true, placeholder: '070-123 45 67' },
      { name: 'vehicle', label: 'Fordon', type: 'text', required: true, placeholder: 'Märke och modell' },
      { name: 'service', label: 'Typ av tjänst', type: 'select', required: true, options: ['Inredning', 'Taxi-utrustning', 'Komradio', 'Annan specialanpassning'] },
      { name: 'message', label: 'Beskriv din förfrågan', type: 'textarea', required: true, placeholder: 'Beskriv vad du behöver hjälp med...' },
    ],
  },
  'komradio': {
    type: 'komradio',
    email: 'verkstad.umea@stjarnafyrkant.se',
    subject: 'Komradio förfrågan',
    title: 'Komradio & Kommunikation',
    description: 'Installation och service av komradio, GroupTalk och täckningsförstärkning.',
    fields: [
      { name: 'name', label: 'Namn', type: 'text', required: true, placeholder: 'Ditt namn' },
      { name: 'company', label: 'Företag', type: 'text', required: true, placeholder: 'Företagsnamn' },
      { name: 'email', label: 'E-post', type: 'email', required: true, placeholder: 'din.epost@företag.se' },
      { name: 'phone', label: 'Telefon', type: 'tel', required: true, placeholder: '070-123 45 67' },
      { name: 'service', label: 'Typ av tjänst', type: 'select', required: true, options: ['Komradio', 'GroupTalk', 'Täckningsförstärkning', 'Övrigt'] },
      { name: 'message', label: 'Beskriv din förfrågan', type: 'textarea', required: true, placeholder: 'Beskriv dina kommunikationsbehov...' },
    ],
  },
  'service-reparation': {
    type: 'service-reparation',
    email: 'service.umea@stjarnafyrkant.se',
    subject: 'Service & reparation förfrågan',
    title: 'Service & Reparation',
    description: 'Boka service eller reparation av din utrustning.',
    fields: [
      { name: 'name', label: 'Namn', type: 'text', required: true, placeholder: 'Ditt namn' },
      { name: 'company', label: 'Företag', type: 'text', required: true, placeholder: 'Företagsnamn' },
      { name: 'email', label: 'E-post', type: 'email', required: true, placeholder: 'din.epost@företag.se' },
      { name: 'phone', label: 'Telefon', type: 'tel', required: true, placeholder: '070-123 45 67' },
      { name: 'equipment', label: 'Utrustning', type: 'text', required: true, placeholder: 'Vilken utrustning behöver service?' },
      { name: 'message', label: 'Beskriv problemet', type: 'textarea', required: true, placeholder: 'Beskriv felet eller servicebehov...' },
    ],
  },
  'order': {
    type: 'order',
    email: 'order.vb@stjarnafyrkant.se',
    subject: 'Orderförfrågan',
    title: 'Orderförfrågan',
    description: 'Skicka din orderförfrågan så återkommer vi med offert.',
    fields: [
      { name: 'name', label: 'Namn', type: 'text', required: true, placeholder: 'Ditt namn' },
      { name: 'company', label: 'Företag', type: 'text', required: true, placeholder: 'Företagsnamn' },
      { name: 'email', label: 'E-post', type: 'email', required: true, placeholder: 'din.epost@företag.se' },
      { name: 'phone', label: 'Telefon', type: 'tel', required: true, placeholder: '070-123 45 67' },
      { name: 'products', label: 'Produkter', type: 'textarea', required: true, placeholder: 'Lista produkter och kvantitet...' },
      { name: 'message', label: 'Övrig information', type: 'textarea', required: false, placeholder: 'Leveransadress, önskemål etc...' },
    ],
  },
  'foretagstelefoni': {
    type: 'foretagstelefoni',
    email: 'sebastian.bjuhr@stjarnafyrkant.se',
    subject: 'Företagstelefoni förfrågan',
    title: 'Företagstelefoni',
    description: 'Vi hjälper er med VoIP, växel, abonnemang och konferenssystem.',
    fields: [
      { name: 'name', label: 'Namn', type: 'text', required: true, placeholder: 'Ditt namn' },
      { name: 'company', label: 'Företag', type: 'text', required: true, placeholder: 'Företagsnamn' },
      { name: 'email', label: 'E-post', type: 'email', required: true, placeholder: 'din.epost@företag.se' },
      { name: 'phone', label: 'Telefon', type: 'tel', required: true, placeholder: '070-123 45 67' },
      { name: 'employees', label: 'Antal anställda', type: 'text', required: false, placeholder: 'Ungefärligt antal' },
      { name: 'service', label: 'Intresse för', type: 'select', required: true, options: ['VoIP & Växel', 'Mobilabonnemang', 'Konferenssystem', 'Komplett lösning'] },
      { name: 'message', label: 'Beskriv era behov', type: 'textarea', required: true, placeholder: 'Beskriv era telefoni-behov...' },
    ],
  },
  'projekt': {
    type: 'projekt',
    email: 'sebastian.bjuhr@stjarnafyrkant.se',
    subject: 'Projektförfrågan',
    title: 'Starta ett projekt',
    description: 'Berätta om ert projekt så hjälper vi er att hitta rätt lösning.',
    fields: [
      { name: 'name', label: 'Namn', type: 'text', required: true, placeholder: 'Ditt namn' },
      { name: 'company', label: 'Företag', type: 'text', required: true, placeholder: 'Företagsnamn' },
      { name: 'email', label: 'E-post', type: 'email', required: true, placeholder: 'din.epost@företag.se' },
      { name: 'phone', label: 'Telefon', type: 'tel', required: true, placeholder: '070-123 45 67' },
      { name: 'category', label: 'Projektområde', type: 'select', required: true, options: ['IT-infrastruktur', 'Fordonsteknik', 'Företagstelefoni', 'Kommunikation', 'Flera områden'] },
      { name: 'budget', label: 'Budget', type: 'select', required: false, options: ['< 100 000 kr', '100 000 - 500 000 kr', '500 000 - 1 miljon kr', '> 1 miljon kr', 'Vet ej'] },
      { name: 'message', label: 'Projektbeskrivning', type: 'textarea', required: true, placeholder: 'Beskriv projektet, mål och tidsplan...' },
    ],
  },
  'jobbansoekan': {
    type: 'jobbansoekan',
    email: 'ansokan.vb@stjarnafyrkant.se',
    subject: 'Jobbansökan',
    title: 'Ansök till StjärnaFyrkant',
    description: 'Skicka din ansökan så hör vi av oss!',
    fields: [
      { name: 'name', label: 'Namn', type: 'text', required: true, placeholder: 'Ditt namn' },
      { name: 'email', label: 'E-post', type: 'email', required: true, placeholder: 'din.epost@exempel.se' },
      { name: 'phone', label: 'Telefon', type: 'tel', required: true, placeholder: '070-123 45 67' },
      { name: 'position', label: 'Tjänst du söker', type: 'text', required: true, placeholder: 'T.ex. IT-konsult, Fordonstekniker...' },
      { name: 'message', label: 'Personligt brev', type: 'textarea', required: true, placeholder: 'Berätta om dig själv och varför du vill jobba hos oss...' },
    ],
  },
  'general': {
    type: 'general',
    email: 'info@stjarnafyrkant.se',
    subject: 'Allmän förfrågan',
    title: 'Hör av dig',
    description: 'Välj vilken avdelning du vill kontakta så hjälper vi dig gärna!',
    fields: [
      { name: 'department', label: 'Jag vill prata med', type: 'select', required: true, options: ['IT & Servicedesk', 'Fordonsteknik', 'Företagstelefoni', 'Kommunikationsteknik', 'Försäljning', 'Ekonomi', 'Karriär'] },
      { name: 'name', label: 'Namn', type: 'text', required: true, placeholder: 'Ditt namn' },
      { name: 'company', label: 'Företag', type: 'text', required: false, placeholder: 'Företagsnamn (valfritt)' },
      { name: 'email', label: 'E-post', type: 'email', required: true, placeholder: 'din.epost@exempel.se' },
      { name: 'phone', label: 'Telefon', type: 'tel', required: false, placeholder: '070-123 45 67 (valfritt)' },
      { name: 'message', label: 'Meddelande', type: 'textarea', required: true, placeholder: 'Skriv ditt meddelande här...' },
    ],
  },
}

// Helper function för att hämta formulärkonfiguration
export function getFormConfig(type: FormType): FormConfig {
  return formConfigs[type] || formConfigs.general
}

// Helper function för att matcha formtyp baserat på sida/kontext
export function getFormTypeFromPath(pathname: string): FormType {
  if (pathname.includes('/it')) return 'it-support'
  if (pathname.includes('/fordonsteknik')) return 'fordon'
  if (pathname.includes('/kommunikationsteknik')) return 'komradio'
  if (pathname.includes('/foretagstelefoni')) return 'foretagstelefoni'
  if (pathname.includes('/servicedesk')) return 'it-support'
  if (pathname.includes('/karriar')) return 'jobbansoekan'
  return 'general'
}
