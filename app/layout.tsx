import type React from "react"
import type { Metadata } from "next"
import { Open_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { GlobalChat } from "@/components/global-chat"
import { LocalBusinessSchema } from "@/components/schema/local-business"

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://stjarnafyrkant.se'),
  title: {
    default: 'StjärnaFyrkant Västerbotten | IT-tjänster, Fordonsteknik & Kommunikation',
    template: '%s | StjärnaFyrkant Västerbotten'
  },
  description: 'StjärnaFyrkant erbjuder IT-tjänster, fordonsteknik, kommunikationslösningar och företagstelefoni i Västerbotten. Lokal närvaro i Umeå och Skellefteå sedan 2003.',
  keywords: ['IT-tjänster Västerbotten', 'Fordonsteknik Umeå', 'Kommunikationslösningar', 'Företagstelefoni', 'IT-support', 'Microsoft 365', 'Fordonsinredning', 'Komradio', 'Servicedesk'],
  authors: [{ name: 'StjärnaFyrkant Västerbotten' }],
  creator: 'StjärnaFyrkant Västerbotten',
  publisher: 'StjärnaFyrkant Västerbotten',
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    url: 'https://stjarnafyrkant.se',
    siteName: 'StjärnaFyrkant Västerbotten',
    title: 'StjärnaFyrkant Västerbotten | IT-tjänster, Fordonsteknik & Kommunikation',
    description: 'StjärnaFyrkant erbjuder IT-tjänster, fordonsteknik, kommunikationslösningar och företagstelefoni i Västerbotten. Lokal närvaro i Umeå och Skellefteå sedan 2003.',
    images: [
      {
        url: '/stjarnafyrkant-icon-original-rgb-200x200.webp',
        width: 200,
        height: 200,
        alt: 'StjärnaFyrkant Västerbotten Logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StjärnaFyrkant Västerbotten | IT-tjänster, Fordonsteknik & Kommunikation',
    description: 'StjärnaFyrkant erbjuder IT-tjänster, fordonsteknik, kommunikationslösningar och företagstelefoni i Västerbotten.',
    images: ['/stjarnafyrkant-icon-original-rgb-200x200.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <head>
        <LocalBusinessSchema />
      </head>
      <body className={cn(openSans.className, "antialiased")}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
          <GlobalChat />
        </ThemeProvider>
      </body>
    </html>
  )
}
