"use client"

import { motion } from "framer-motion"
import { getServiceColors, ServiceType } from "@/lib/service-colors"
import { cn } from "@/lib/utils"

interface ServiceAccentProps {
  service: ServiceType
  variant?: "dot" | "line" | "glow" | "corner" | "badge"
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center"
  size?: "sm" | "md" | "lg"
  className?: string
  animate?: boolean
}

export function ServiceAccent({ 
  service, 
  variant = "dot", 
  position = "top-right",
  size = "md",
  className = "",
  animate = true
}: ServiceAccentProps) {
  const colors = getServiceColors(service)
  
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3", 
    lg: "w-4 h-4"
  }
  
  const positionClasses = {
    "top-left": "top-2 left-2",
    "top-right": "top-2 right-2", 
    "bottom-left": "bottom-2 left-2",
    "bottom-right": "bottom-2 right-2",
    "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  }

  const baseMotion = animate ? {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.3, delay: 0.5 }
  } : {}

  if (variant === "dot") {
    return (
      <motion.div
        {...baseMotion}
        className={cn(
          "absolute rounded-full",
          `bg-gradient-to-br ${colors.primary}`,
          sizeClasses[size],
          positionClasses[position],
          colors.glow,
          animate && "animate-pulse",
          className
        )}
      />
    )
  }

  if (variant === "line") {
    return (
      <motion.div
        {...baseMotion}
        className={cn(
          "absolute w-8 h-0.5 rounded-full",
          `bg-gradient-to-r ${colors.primary}`,
          positionClasses[position],
          colors.glow,
          className
        )}
      />
    )
  }

  if (variant === "glow") {
    return (
      <motion.div
        {...baseMotion}
        className={cn(
          "absolute inset-0 rounded-xl opacity-20",
          `bg-gradient-to-br ${colors.light}`,
          colors.darkBg,
          className
        )}
      />
    )
  }

  if (variant === "corner") {
    return (
      <motion.div
        {...baseMotion}
        className={cn(
          "absolute top-0 right-0 w-6 h-6 rounded-bl-xl",
          `bg-gradient-to-br ${colors.primary}`,
          className
        )}
      />
    )
  }

  if (variant === "badge") {
    return (
      <motion.div
        {...baseMotion}
        className={cn(
          "absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-medium",
          `bg-gradient-to-r ${colors.primary}`,
          "text-white shadow-sm",
          className
        )}
      >
        {colors.name}
      </motion.div>
    )
  }

  return null
}

// Wrapper component that automatically detects service from pathname
export function AutoServiceAccent(props: Omit<ServiceAccentProps, 'service'>) {
  if (typeof window === 'undefined') return null
  
  const pathname = window.location.pathname
  let service: ServiceType = 'general'
  
  if (pathname.includes('/it')) service = 'it'
  else if (pathname.includes('/fordonsteknik')) service = 'fordonsteknik'
  else if (pathname.includes('/kommunikationsteknik')) service = 'kommunikationsteknik'
  else if (pathname.includes('/servicedesk')) service = 'servicedesk'
  
  return <ServiceAccent service={service} {...props} />
}
