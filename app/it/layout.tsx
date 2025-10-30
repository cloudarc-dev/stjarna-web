import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IT-tjänster Västerbotten | Säker IT-infrastruktur & Microsoft 365',
  description: 'Professionella IT-tjänster i Västerbotten. IT-infrastruktur, nätverk, molntjänster, Microsoft 365, IT-säkerhet och support. Lokal expertis i Umeå och Skellefteå.',
  keywords: ['IT-tjänster', 'Västerbotten', 'IT-infrastruktur', 'nätverk', 'molntjänster', 'Microsoft 365', 'IT-säkerhet', 'IT-support', 'Umeå', 'Skellefteå'],
  openGraph: {
    title: 'IT-tjänster Västerbotten | StjärnaFyrkant',
    description: 'Professionella IT-tjänster i Västerbotten. Säker IT-infrastruktur, nätverk, molntjänster och Microsoft 365-expertis.',
    url: 'https://stjarnafyrkant.se/it',
    siteName: 'StjärnaFyrkant Västerbotten',
    locale: 'sv_SE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IT-tjänster Västerbotten | StjärnaFyrkant',
    description: 'Professionella IT-tjänster i Västerbotten. Säker IT-infrastruktur och molntjänster.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ITLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
