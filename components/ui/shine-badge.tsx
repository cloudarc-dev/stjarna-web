import { cn } from "@/lib/utils"
import React from "react"

const ShineBadge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative inline-flex items-center justify-center rounded-full bg-primary/10 p-4 transition-all duration-300",
          "hover:shadow-lg hover:shadow-primary/20 hover:scale-105",
          className,
        )}
        {...props}
      >
        {children}
        {/* Shine effect */}
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-full" aria-hidden="true">
          <div className="absolute inset-0 h-full w-full -translate-x-full transform-gpu bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
        </div>
      </div>
    )
  },
)

ShineBadge.displayName = "ShineBadge"

export { ShineBadge }
