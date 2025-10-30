import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Support & Servicedesk Västerbotten | IT-support & Företagstelefoni',
  description: 'Professionell IT-support och servicedesk i Västerbotten. Snabb hjälp med IT-problem, företagstelefoni och teknisk support. Lokal expertis i Umeå och Skellefteå.',
  keywords: ['IT-support', 'Servicedesk', 'Teknisk support', 'Västerbotten', 'Umeå', 'Skellefteå', 'Helpdesk', 'IT-hjälp', 'Support företag'],
  openGraph: {
    title: 'Support & Servicedesk Västerbotten | StjärnaFyrkant',
    description: 'Professionell IT-support och servicedesk i Västerbotten. Snabb hjälp med IT-problem och teknisk support.',
    url: 'https://stjarnafyrkant.se/servicedesk',
    siteName: 'StjärnaFyrkant Västerbotten',
    locale: 'sv_SE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Support & Servicedesk Västerbotten | StjärnaFyrkant',
    description: 'Professionell IT-support och servicedesk i Västerbotten.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ServicedeskLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
