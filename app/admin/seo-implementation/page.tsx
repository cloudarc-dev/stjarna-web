"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminSEOImplementationPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to main seo-implementation page
    router.push('/seo-implementation')
  }, [router])

  return (
    <div className="flex items-center justify-center p-12">
      <div className="text-center">
        <p className="text-muted-foreground">Omdirigerar till SEO Implementation Lab...</p>
      </div>
    </div>
  )
}
