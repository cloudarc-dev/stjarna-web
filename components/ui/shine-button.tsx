import { cn } from "@/lib/utils"
import React from "react"

const ShineButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group relative inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-lg font-bold text-primary-foreground transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
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
      </button>
    )
  },
)

ShineButton.displayName = "ShineButton"

export { ShineButton }
