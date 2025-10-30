import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Företagstelefoni Västerbotten | Mobiltelefoner, Växel & Microsoft Teams',
  description: 'Modern företagstelefoni i Västerbotten. Mobiltelefoner, abonnemang, företagsväxel, AI, Microsoft Teams och headset. Paketerade lösningar för företag.',
  keywords: ['Företagstelefoni', 'Mobiltelefoner företag', 'Företagsväxel', 'Microsoft Teams', 'Abonnemang', 'AI växel', 'Västerbotten', 'Umeå', 'Skellefteå', 'VoIP'],
  openGraph: {
    title: 'Företagstelefoni Västerbotten | StjärnaFyrkant',
    description: 'Modern företagstelefoni i Västerbotten. Mobiltelefoner, växel, AI och Microsoft Teams för företag.',
    url: 'https://stjarnafyrkant.se/foretagstelefoni',
    siteName: 'StjärnaFyrkant Västerbotten',
    locale: 'sv_SE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Företagstelefoni Västerbotten | StjärnaFyrkant',
    description: 'Modern företagstelefoni i Västerbotten. Mobiltelefoner, växel och Microsoft Teams.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ForetagstelefoniLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
