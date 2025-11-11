"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminUIKitPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to main ui-kit page
    router.push('/ui-kit')
  }, [router])

  return (
    <div className="flex items-center justify-center p-12">
      <div className="text-center">
        <p className="text-muted-foreground">Omdirigerar till UI Kit...</p>
      </div>
    </div>
  )
}
