"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { type SiteSettings } from "@/lib/supabase"

export function Footer() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)

  useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await fetch('/api/settings')
        if (response.ok) {
          const data = await response.json()
          setSettings(data)
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error)
      }
    }
    fetchSettings()
  }, [])

  // Fallback values if API fails
  const companyName = settings?.company_name || 'StjärnaFyrkant Västerbotten'
  const companyDescription = settings?.company_description || 'StjärnaFyrkant Västerbotten är en ledande partner inom IT, fordonsteknik, kommunikationsteknik och företagstelefoni. Vi erbjuder skalbara helhetslösningar till företag och organisationer i hela Sverige. Genom nära samarbete, lokal närvaro och ett starkt hållbarhetsansvar har vi hjälpt våra kunder att växa säkert med rätt teknik i över 40 år.'

  const umeaAddress = settings?.umea_address || 'Förrådsvägen 15'
  const umeaPostalCode = settings?.umea_postal_code || '901 32'
  const umeaCity = settings?.umea_city || 'Umeå'

  const skellefteaAddress = settings?.skelleftea_address || 'Företagsvägen 1'
  const skellefteaPostalCode = settings?.skelleftea_postal_code || '931 57'
  const skellefteaCity = settings?.skelleftea_city || 'Skellefteå'

  const facebookUrl = settings?.facebook_url || 'https://www.facebook.com/stjarnafyrkantvb/'
  const instagramUrl = settings?.instagram_url || 'https://www.instagram.com/stjarnafyrkantvb/'
  const linkedinUrl = settings?.linkedin_url || 'https://www.linkedin.com/company/stjarnafyrkant-lts/'
  const youtubeUrl = settings?.youtube_url || 'https://www.youtube.com/@stjarnafyrkant6026'

  return (
    <footer className="border-t bg-gray-100 dark:bg-card/20">
      {/* Main footer content */}
      <div className="container max-w-screen-2xl py-16">
        {/* Company description section */}
        <div className="mb-12">
          <div className="mb-6">
            <Image
              src="/stjarnafyrkant-logo-original-rgb-1.svg"
              alt={companyName}
              width={240}
              height={53}
              className="h-12 w-auto dark:hidden"
            />
            <Image
              src="/media/stjarnafyrkant-logo-inverterad-rgb-300x66.png"
              alt={companyName}
              width={240}
              height={53}
              className="h-12 w-auto hidden dark:block"
            />
          </div>
          <p className="text-muted-foreground max-w-4xl leading-relaxed">
            {companyDescription}
          </p>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Kontakt column */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Kontakt</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/kontakt" className="hover:text-primary transition-colors">
                  Kontakta oss
                </Link>
              </li>
              <li>
                <a
                  href={`https://www.google.com/maps/place/${encodeURIComponent(`${umeaAddress}, ${umeaPostalCode} ${umeaCity}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#fedb00] transition-colors"
                >
                  {umeaCity}: {umeaAddress}, {umeaPostalCode} {umeaCity}
                </a>
              </li>
              <li>
                <a
                  href={`https://www.google.com/maps/place/${encodeURIComponent(`${skellefteaAddress}, ${skellefteaPostalCode} ${skellefteaCity}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#fedb00] transition-colors"
                >
                  {skellefteaCity}: {skellefteaAddress}, {skellefteaPostalCode} {skellefteaCity}
                </a>
              </li>
            </ul>
          </div>

          {/* Vårt erbjudande column */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Vårt erbjudande</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/it" className="hover:text-primary transition-colors">
                  IT-tjänster
                </Link>
              </li>
              <li>
                <Link href="/fordonsteknik" className="hover:text-primary transition-colors">
                  Fordonsteknik
                </Link>
              </li>
              <li>
                <Link href="/kommunikationsteknik" className="hover:text-primary transition-colors">
                  Kommunikationsteknik
                </Link>
              </li>
              <li>
                <Link href="/foretagstelefoni" className="hover:text-primary transition-colors">
                  Företagstelefoni
                </Link>
              </li>
              <li>
                <Link href="/servicedesk" className="hover:text-primary transition-colors">
                  Support & servicedesk
                </Link>
              </li>
              <li>
                <a href="https://stjarna.shop/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Shop
                </a>
              </li>
            </ul>
          </div>

          {/* Om StjärnaFyrkant column */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Om StjärnaFyrkant</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/om-oss" className="hover:text-primary transition-colors">
                  Om oss
                </Link>
              </li>
              <li>
                <Link href="/karriar" className="hover:text-primary transition-colors">
                  Karriär
                </Link>
              </li>
              <li>
                <Link href="/verksamhetspolicy" className="hover:text-primary transition-colors">
                  Verksamhetspolicy (KMA)
                </Link>
              </li>
              <li className="text-muted-foreground/60">
                Press & nyheter
              </li>
            </ul>
          </div>

          {/* Social & Legal column */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Följ oss</h4>
            <div className="flex items-center gap-3 mb-6">
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
              {youtubeUrl && (
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-3">Policyer</p>
              <li className="list-none">
                <Link href="/integritetspolicy" className="hover:text-primary transition-colors">
                  Integritetspolicy
                </Link>
              </li>
              <li className="list-none">
                <Link href="/cookiepolicy" className="hover:text-primary transition-colors">
                  Cookiepolicy
                </Link>
              </li>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t">
        <div className="container max-w-screen-2xl py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} {companyName}. Alla rättigheter förbehållna.</p>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <p className="text-xs">
                Del av StjärnaFyrkant-franchisen sedan 2003 | Lokalt ägd och driven
              </p>
              <span className="hidden md:inline text-muted-foreground/40">•</span>
              <p className="text-xs text-muted-foreground/60">
                Producerad av Cloudarc
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
