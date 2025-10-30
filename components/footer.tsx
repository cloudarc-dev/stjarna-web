import Link from "next/link"
import Image from "next/image"
import { AnimatedText } from "./ui/animated-text"
import { ShineButton } from "./ui/shine-button"

export function Footer() {
  return (
    <footer className="border-t py-16 bg-gray-100 dark:bg-card/20">
      <div className="container max-w-screen-2xl grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="mb-4">
            <Image
              src="/stjarnafyrkant-logo-original-rgb-1.svg"
              alt="StjärnaFyrkant Västerbotten"
              width={200}
              height={44}
              className="h-11 w-auto dark:hidden"
            />
            <Image
              src="/media/stjarnafyrkant-logo-inverterad-rgb-300x66.png"
              alt="StjärnaFyrkant Västerbotten"
              width={200}
              height={44}
              className="h-11 w-auto hidden dark:block"
            />
          </div>
          <p className="text-muted-foreground">Lokal närvaro, hållbart ansvar.</p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold mb-4">Tjänster</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/it" className="hover:text-primary">
                  IT
                </Link>
              </li>
              <li>
                <Link href="/fordonsteknik" className="hover:text-primary">
                  Fordonsteknik
                </Link>
              </li>
              <li>
                <Link href="/kommunikationsteknik" className="hover:text-primary">
                  Kommunikationsteknik
                </Link>
              </li>
              <li>
                <Link href="/foretagstelefoni" className="hover:text-primary">
                  Företagstelefoni
                </Link>
              </li>
              <li>
                <Link href="/servicedesk" className="hover:text-primary">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Företaget</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/om-oss" className="hover:text-primary">
                  Om Oss
                </Link>
              </li>
              <li>
                <Link href="/karriar" className="hover:text-primary">
                  Karriär
                </Link>
              </li>
              <li>
                <Link href="/verksamhetspolicy" className="hover:text-primary">
                  Verksamhetspolicy
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-primary">
                  Shop
                </Link>
              </li>
              <li>Press</li>
            </ul>
          </div>
        </div>
        <div className="md:text-right">
          <h4 className="font-semibold mb-4">Har du ett projekt?</h4>
          <Link href="/#kontakt">
            <ShineButton>Starta Konversationen</ShineButton>
          </Link>
        </div>
      </div>
      <div className="container max-w-screen-2xl mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} StjärnaFyrkant Västerbotten. Alla rättigheter förbehållna.</p>
        <div className="mt-4 md:mt-0 flex items-center gap-4">
          <Link href="/seo-plan" className="hover:text-primary text-xs opacity-60">
            SEO Plan
          </Link>
          <Link href="/ui-kit" className="hover:text-primary text-xs opacity-60">
            UI-Kit
          </Link>
        </div>
      </div>
    </footer>
  )
}
