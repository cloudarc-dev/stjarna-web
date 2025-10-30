import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/ui-kit/', '/seo-plan/', '/seo-implementation/'],
    },
    sitemap: 'https://stjarnafyrkant.se/sitemap.xml',
  }
}
