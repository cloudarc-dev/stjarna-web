// Service Color System - Prisvinnande färgaccenter för varje tjänsteområde

export const serviceColors = {
  it: {
    primary: "from-blue-500 to-blue-600",
    light: "from-blue-100 to-blue-200",
    accent: "bg-blue-500",
    border: "border-blue-200",
    text: "text-blue-600",
    bg: "bg-blue-50",
    darkBg: "dark:bg-blue-950/20",
    darkBorder: "dark:border-blue-800/30",
    darkText: "dark:text-blue-400",
    glow: "shadow-blue-500/20",
    name: "IT-tjänster"
  },
  fordonsteknik: {
    primary: "from-green-500 to-green-600", 
    light: "from-green-100 to-green-200",
    accent: "bg-green-500",
    border: "border-green-200",
    text: "text-green-600",
    bg: "bg-green-50",
    darkBg: "dark:bg-green-950/20",
    darkBorder: "dark:border-green-800/30", 
    darkText: "dark:text-green-400",
    glow: "shadow-green-500/20",
    name: "Fordonsteknik"
  },
  kommunikationsteknik: {
    primary: "from-purple-500 to-purple-600",
    light: "from-purple-100 to-purple-200", 
    accent: "bg-purple-500",
    border: "border-purple-200",
    text: "text-purple-600",
    bg: "bg-purple-50",
    darkBg: "dark:bg-purple-950/20",
    darkBorder: "dark:border-purple-800/30",
    darkText: "dark:text-purple-400", 
    glow: "shadow-purple-500/20",
    name: "Kommunikationsteknik"
  },
  foretagstelefoni: {
    primary: "from-teal-500 to-teal-600",
    light: "from-teal-100 to-teal-200",
    accent: "bg-teal-500",
    border: "border-teal-200",
    text: "text-teal-600",
    bg: "bg-teal-50",
    darkBg: "dark:bg-teal-950/20",
    darkBorder: "dark:border-teal-800/30",
    darkText: "dark:text-teal-400",
    glow: "shadow-teal-500/20",
    name: "Företagstelefoni"
  },
  servicedesk: {
    primary: "from-orange-500 to-orange-600",
    light: "from-orange-100 to-orange-200",
    accent: "bg-orange-500",
    border: "border-orange-200",
    text: "text-orange-600",
    bg: "bg-orange-50",
    darkBg: "dark:bg-orange-950/20",
    darkBorder: "dark:border-orange-800/30",
    darkText: "dark:text-orange-400",
    glow: "shadow-orange-500/20",
    name: "Servicedesk"
  },
  general: {
    primary: "from-primary to-primary/90",
    light: "from-primary/10 to-primary/20",
    accent: "bg-primary",
    border: "border-primary/20", 
    text: "text-primary",
    bg: "bg-primary/5",
    darkBg: "dark:bg-primary/10",
    darkBorder: "dark:border-primary/30",
    darkText: "dark:text-primary",
    glow: "shadow-primary/20",
    name: "StjärnaFyrkant"
  }
} as const

export type ServiceType = keyof typeof serviceColors

// Helper function to get service colors
export function getServiceColors(service: ServiceType) {
  return serviceColors[service] || serviceColors.general
}

// Helper function to detect service from pathname
export function getServiceFromPath(pathname: string): ServiceType {
  if (pathname.includes('/it')) return 'it'
  if (pathname.includes('/fordonsteknik')) return 'fordonsteknik'
  if (pathname.includes('/kommunikationsteknik')) return 'kommunikationsteknik'
  if (pathname.includes('/foretagstelefoni')) return 'foretagstelefoni'
  if (pathname.includes('/servicedesk')) return 'servicedesk'
  return 'general'
}
