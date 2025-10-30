export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "StjärnaFyrkant Västerbotten",
    "image": "https://stjarnafyrkant.se/media/stjarnafyrkant-logo-original-rgb-1.svg",
    "@id": "https://stjarnafyrkant.se",
    "url": "https://stjarnafyrkant.se",
    "telephone": "+4690704470",
    "email": "umea@stjarnafyrkant.se",
    "description": "StjärnaFyrkant erbjuder IT-tjänster, fordonsteknik, kommunikationslösningar och företagstelefoni i Västerbotten.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Förrådsvägen 15",
      "postalCode": "901 32",
      "addressLocality": "Umeå",
      "addressRegion": "Västerbotten",
      "addressCountry": "SE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 63.8258,
      "longitude": 20.2630
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "17:00"
    },
    "sameAs": [
      "https://www.facebook.com/stjarnafyrkantvb/",
      "https://www.instagram.com/stjarnafyrkantvb/",
      "https://www.linkedin.com/company/stjarnafyrkant-lts/",
      "https://www.youtube.com/@stjarnafyrkant6026"
    ],
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
