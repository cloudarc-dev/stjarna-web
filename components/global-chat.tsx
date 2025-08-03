"use client"

import { useState, useEffect } from "react"
import { ChatLauncher } from "@/components/chat-launcher"

export function GlobalChat() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return <ChatLauncher />
}
