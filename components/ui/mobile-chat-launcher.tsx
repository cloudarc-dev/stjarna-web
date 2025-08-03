"use client"

import { Bot } from "lucide-react"

export function MobileChatLauncher() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event("toggleChat"))}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 md:hidden z-50 px-6 py-3 rounded-full bg-gradient-to-br from-primary to-primary/70 text-background font-semibold shadow-lg shadow-primary/30 backdrop-blur hover:shadow-xl active:scale-95 transition"
      aria-label="Öppna chatt"
    >
      <div className="flex items-center gap-2">
        <Bot className="w-5 h-5" />
        <span>Chatta</span>
      </div>
    </button>
  )
}
