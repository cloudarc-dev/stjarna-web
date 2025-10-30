import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kommunikationsteknik Västerbotten | Komradio & Gruppkommunikation',
  description: 'Kommunikationslösningar i Västerbotten. Komradio, gruppkommunikation, inomhustäckning, DECT-telefoner och säker kommunikation för krävande arbete.',
  keywords: ['Kommunikationsteknik', 'Komradio', 'Gruppkommunikation', 'Inomhustäckning', 'DECT', 'Västerbotten', 'Umeå', 'Skellefteå', 'GroupTalk', 'Hörselskydd'],
  openGraph: {
    title: 'Kommunikationsteknik Västerbotten | StjärnaFyrkant',
    description: 'Kommunikationslösningar i Västerbotten. Komradio, gruppkommunikation och inomhustäckning för säker kommunikation.',
    url: 'https://stjarnafyrkant.se/kommunikationsteknik',
    siteName: 'StjärnaFyrkant Västerbotten',
    locale: 'sv_SE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kommunikationsteknik Västerbotten | StjärnaFyrkant',
    description: 'Kommunikationslösningar i Västerbotten. Komradio och gruppkommunikation.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function KommunikationsteknikLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
