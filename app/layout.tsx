import type React from "react"
import type { Metadata } from "next"
import { Open_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { GlobalChat } from "@/components/global-chat"

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

export const metadata: Metadata = {
  title: "StjärnaFyrkant | Framtidens Digitala Närvaro",
  description: "Vi bygger prisvinnande digitala upplevelser med banbrytande teknik och design.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <body className={cn(openSans.className, "antialiased")}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
          <GlobalChat />
        </ThemeProvider>
      </body>
    </html>
  )
}
