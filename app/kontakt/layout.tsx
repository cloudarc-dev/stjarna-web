import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt | StjärnaFyrkant Västerbotten – Umeå & Skellefteå',
  description: 'Kontakta StjärnaFyrkant Västerbotten för IT-tjänster, fordonsteknik och kommunikation. Verksamheter i Umeå och Skellefteå. Boka kostnadsfri konsultation.',
  keywords: ['Kontakt', 'StjärnaFyrkant', 'Umeå', 'Skellefteå', 'Västerbotten', 'IT-konsultation', 'Offert', 'Telefon', 'E-post'],
  openGraph: {
    title: 'Kontakt | StjärnaFyrkant Västerbotten',
    description: 'Kontakta StjärnaFyrkant Västerbotten för IT-tjänster, fordonsteknik och kommunikation. Boka kostnadsfri konsultation.',
    url: 'https://stjarnafyrkant.se/kontakt',
    siteName: 'StjärnaFyrkant Västerbotten',
    locale: 'sv_SE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kontakt | StjärnaFyrkant Västerbotten',
    description: 'Kontakta oss för IT-tjänster, fordonsteknik och kommunikation.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
