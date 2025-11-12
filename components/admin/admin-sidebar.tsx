"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  FileInput,
  Image,
  Mail,
  Code,
  Palette,
  Search,
  Wrench,
  Settings,
  ChevronDown,
  ChevronRight,
  HelpCircle
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

interface NavSection {
  title: string
  items: NavItem[]
}

const navSections: NavSection[] = [
  {
    title: "Innehåll",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: <LayoutDashboard className="w-4 h-4" />,
      },
      {
        label: "Medarbetare",
        href: "/admin/medarbetare",
        icon: <Users className="w-4 h-4" />,
      },
      {
        label: "Jobbannonser",
        href: "/admin/jobb",
        icon: <Briefcase className="w-4 h-4" />,
      },
      {
        label: "Kundcase",
        href: "/admin/kundcase",
        icon: <FileText className="w-4 h-4" />,
      },
      {
        label: "Formulär",
        href: "/admin/formular",
        icon: <FileInput className="w-4 h-4" />,
      },
      {
        label: "FAQs",
        href: "/admin/faqs",
        icon: <HelpCircle className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "Media & Data",
    items: [
      {
        label: "Media Library",
        href: "/admin/media",
        icon: <Image className="w-4 h-4" />,
      },
      {
        label: "Email Log",
        href: "/admin/email-log",
        icon: <Mail className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "Utveckling",
    items: [
      {
        label: "Developer Hub",
        href: "/admin/dev",
        icon: <Code className="w-4 h-4" />,
      },
      {
        label: "UI Kit",
        href: "/admin/ui-kit",
        icon: <Palette className="w-4 h-4" />,
      },
      {
        label: "SEO Plan",
        href: "/admin/seo",
        icon: <Search className="w-4 h-4" />,
      },
      {
        label: "SEO Implementation",
        href: "/admin/seo-implementation",
        icon: <Wrench className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "Inställningar",
    items: [
      {
        label: "Site Settings",
        href: "/admin/settings",
        icon: <Settings className="w-4 h-4" />,
      },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "Innehåll": true,
    "Media & Data": true,
    "Utveckling": false,
    "Inställningar": false,
  })

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  return (
    <aside className="w-64 bg-card border-r border-border h-screen sticky top-0 overflow-y-auto">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold text-foreground">Admin Panel</h2>
        <p className="text-sm text-muted-foreground mt-1">
          StjärnaFyrkant Västerbotten
        </p>
      </div>

      <nav className="p-4 space-y-6">
        {navSections.map((section) => (
          <div key={section.title}>
            <button
              onClick={() => toggleSection(section.title)}
              className="flex items-center justify-between w-full text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 hover:text-foreground transition-colors"
            >
              <span>{section.title}</span>
              {openSections[section.title] ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </button>

            {openSections[section.title] && (
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (pathname.startsWith(item.href) && item.href !== "/admin")
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        )}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}
