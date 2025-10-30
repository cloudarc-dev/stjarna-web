export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "StjärnaFyrkant Västerbotten",
    "image": "https://stjarnafyrkant.se/media/stjarnafyrkant-logo-original-rgb-1.svg",
    "@id": "https://stjarnafyrkant.se",
    "url": "https://stjarnafyrkant.se",
    "description": "StjärnaFyrkant erbjuder IT-tjänster, fordonsteknik, kommunikationslösningar och företagstelefoni i Västerbotten.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Umeå",
      "addressRegion": "Västerbotten",
      "addressCountry": "SE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 63.8258,
      "longitude": 20.2630
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Umeå"
      },
      {
        "@type": "City",
        "name": "Skellefteå"
      },
      {
        "@type": "State",
        "name": "Västerbotten"
      }
    ],
    "priceRange": "$$",
    "foundingDate": "2003",
    "knowsAbout": [
      "IT-tjänster",
      "Fordonsteknik",
      "Kommunikationslösningar",
      "Företagstelefoni",
      "Microsoft 365",
      "IT-infrastruktur",
      "Alkolås",
      "Komradio",
      "IT-support"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
