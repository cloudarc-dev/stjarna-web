import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Om Oss | StjärnaFyrkant Västerbotten – Lokal Teknisk Partner Sedan 2003',
  description: 'StjärnaFyrkant Västerbotten erbjuder personligt partnerskap med lokal närvaro i Umeå och Skellefteå. IT, fordonsteknik och kommunikation sedan 2003.',
  keywords: ['StjärnaFyrkant', 'Om oss', 'Västerbotten', 'Umeå', 'Skellefteå', 'Franchise', 'Teknisk partner', 'IT-företag Västerbotten'],
  openGraph: {
    title: 'Om Oss | StjärnaFyrkant Västerbotten',
    description: 'StjärnaFyrkant Västerbotten erbjuder personligt partnerskap med lokal närvaro i Umeå och Skellefteå. IT, fordonsteknik och kommunikation sedan 2003.',
    url: 'https://stjarnafyrkant.se/om-oss',
    siteName: 'StjärnaFyrkant Västerbotten',
    locale: 'sv_SE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Om Oss | StjärnaFyrkant Västerbotten',
    description: 'StjärnaFyrkant Västerbotten – Lokal teknisk partner sedan 2003.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function OmOssLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
