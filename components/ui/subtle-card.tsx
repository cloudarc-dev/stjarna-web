"use client"
import { cn } from "@/lib/utils"
import React from "react"

export const SubtleCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    return (
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        className={cn(
          "group relative p-8 rounded-xl border border-border bg-card/60 backdrop-blur-sm transition-all duration-300 ease-in-out hover:border-primary/30",
          className,
        )}
        style={
          {
            "--mouse-x": `${mousePosition.x}px`,
            "--mouse-y": `${mousePosition.y}px`,
          } as React.CSSProperties
        }
        {...props}
      >
        {/* Glow effect */}
        <div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), hsl(var(--primary) / 0.1), transparent 80%)`,
          }}
        />
        {children}
      </div>
    )
  },
)

SubtleCard.displayName = "SubtleCard"
