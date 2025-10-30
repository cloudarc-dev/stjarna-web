import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Karriär | Jobba hos StjärnaFyrkant Västerbotten',
  description: 'Lediga tjänster hos StjärnaFyrkant Västerbotten. Sök jobb inom IT, fordonsteknik, kommunikation och support i Umeå och Skellefteå.',
  keywords: ['Karriär', 'Lediga jobb', 'StjärnaFyrkant', 'IT-jobb Västerbotten', 'Fordonstekniker jobb', 'Umeå', 'Skellefteå', 'Jobbansökan'],
  openGraph: {
    title: 'Karriär | Jobba hos StjärnaFyrkant Västerbotten',
    description: 'Lediga tjänster hos StjärnaFyrkant Västerbotten. Sök jobb inom IT, fordonsteknik och kommunikation.',
    url: 'https://stjarnafyrkant.se/karriar',
    siteName: 'StjärnaFyrkant Västerbotten',
    locale: 'sv_SE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karriär | Jobba hos StjärnaFyrkant Västerbotten',
    description: 'Lediga tjänster hos StjärnaFyrkant Västerbotten.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function KarriarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
