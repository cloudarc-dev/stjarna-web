import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fordonsteknik Västerbotten | Alkolås, Taxi & Fordonsinredning',
  description: 'Fordonsteknik i Västerbotten. Alkolås, taxiutrustning, fordonsinredning, kommunikation och digital uppkoppling för företagsfordon. Verkstäder i Umeå och Skellefteå.',
  keywords: ['Fordonsteknik', 'Alkolås', 'Taxi', 'Fordonsinredning', 'Komradio', 'GPS-spårning', 'Västerbotten', 'Umeå', 'Skellefteå', 'Kamerasystem fordon'],
  openGraph: {
    title: 'Fordonsteknik Västerbotten | StjärnaFyrkant',
    description: 'Fordonsteknik i Västerbotten. Alkolås, taxiutrustning, fordonsinredning och kommunikation för företagsfordon.',
    url: 'https://stjarnafyrkant.se/fordonsteknik',
    siteName: 'StjärnaFyrkant Västerbotten',
    locale: 'sv_SE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fordonsteknik Västerbotten | StjärnaFyrkant',
    description: 'Fordonsteknik i Västerbotten. Alkolås, taxiutrustning, fordonsinredning och kommunikation.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function FordonsteknikLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
