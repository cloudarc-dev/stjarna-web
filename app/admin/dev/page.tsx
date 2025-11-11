"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminDevPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to main dev page
    router.push('/dev')
  }, [router])

  return (
    <div className="flex items-center justify-center p-12">
      <div className="text-center">
        <p className="text-muted-foreground">Omdirigerar till Developer Hub...</p>
      </div>
    </div>
  )
}
