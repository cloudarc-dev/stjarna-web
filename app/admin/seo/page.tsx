"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminSEOPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to main seo-plan page
    router.push('/seo-plan')
  }, [router])

  return (
    <div className="flex items-center justify-center p-12">
      <div className="text-center">
        <p className="text-muted-foreground">Omdirigerar till SEO Plan...</p>
      </div>
    </div>
  )
}
