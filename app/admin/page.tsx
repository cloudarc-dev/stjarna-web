"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, Briefcase, FileText, Mail, TrendingUp, Activity, CheckCircle2, Clock } from "lucide-react"
import Link from "next/link"

interface Stats {
  employees: { total: number; visible: number }
  jobs: { total: number; active: number }
  cases: { total: number; published: number }
  submissions: { total: number; new: number }
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    employees: { total: 0, visible: 0 },
    jobs: { total: 0, active: 0 },
    cases: { total: 0, published: 0 },
    submissions: { total: 0, new: 0 }
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const [employeesRes, jobsRes, casesRes, emailLogsRes] = await Promise.all([
        fetch('/api/admin/employees'),
        fetch('/api/admin/jobs'),
        fetch('/api/admin/cases'),
        fetch('/api/admin/email-logs')
      ])

      const [employees, jobs, cases, emailLogs] = await Promise.all([
        employeesRes.json(),
        jobsRes.json(),
        casesRes.json(),
        emailLogsRes.json()
      ])

      setStats({
        employees: {
          total: employees.length || 0,
          visible: employees.filter((e: any) => e.is_visible).length || 0
        },
        jobs: {
          total: jobs.length || 0,
          active: jobs.filter((j: any) => j.is_active).length || 0
        },
        cases: {
          total: cases.length || 0,
          published: cases.filter((c: any) => c.is_published).length || 0
        },
        submissions: {
          total: emailLogs.length || 0,
          new: emailLogs.filter((s: any) => s.status === 'new').length || 0
        }
      })
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      label: "Medarbetare",
      value: stats.employees.total,
      subValue: `${stats.employees.visible} synliga`,
      href: "/admin/medarbetare",
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "hover:border-blue-500/50"
    },
    {
      label: "Jobbannonser",
      value: stats.jobs.total,
      subValue: `${stats.jobs.active} aktiva`,
      href: "/admin/jobb",
      icon: Briefcase,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "hover:border-green-500/50"
    },
    {
      label: "Kundcase",
      value: stats.cases.total,
      subValue: `${stats.cases.published} publicerade`,
      href: "/admin/kundcase",
      icon: FileText,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "hover:border-purple-500/50"
    },
    {
      label: "Formulär",
      value: stats.submissions.total,
      subValue: `${stats.submissions.new} nya`,
      href: "/admin/email-log",
      icon: Mail,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "hover:border-orange-500/50"
    }
  ]

  const quickActions = [
    {
      label: "Media Library",
      description: "Hantera bilder och filer",
      href: "/admin/media",
      icon: "🖼️"
    },
    {
      label: "Site Settings",
      description: "Företagsinformation",
      href: "/admin/settings",
      icon: "⚙️"
    },
    {
      label: "Developer Hub",
      description: "Progress & utveckling",
      href: "/admin/dev",
      icon: "🚀"
    }
  ]

  // Mock upcoming tasks from SEO Plan, Implementation, and Dev Hub
  const upcomingTasks = [
    { task: "Implementera strukturerad data för jobbannonser", category: "SEO Implementation", priority: "hög" },
    { task: "Optimera meta descriptions för alla tjänstesidor", category: "SEO Plan", priority: "medel" },
    { task: "Testa admin panel i produktion", category: "Developer Hub", priority: "hög" },
    { task: "Konfigurera Google Search Console", category: "SEO Plan", priority: "medel" },
    { task: "Implementera bildoptimering", category: "Developer Hub", priority: "låg" }
  ]

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Välkommen tillbaka! Här är en översikt av ditt innehåll.</p>
      </div>

      {/* Statistics Cards */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Statistik</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => (
            <Link href={stat.href} key={stat.label}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-card border border-border rounded-xl p-6 hover:shadow-lg ${stat.borderColor} transition-all group cursor-pointer`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <TrendingUp className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  {loading ? (
                    <div className="h-8 w-16 bg-accent animate-pulse rounded"></div>
                  ) : (
                    <p className="text-3xl font-bold">{stat.value}</p>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.subValue}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Snabbåtgärder</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action, index) => (
            <Link href={action.href} key={action.label}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/50 transition-all group cursor-pointer"
              >
                <div className="text-4xl mb-3">{action.icon}</div>
                <h3 className="text-lg font-semibold mb-1">{action.label}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Nästa steg - SEO & Utveckling
        </h2>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="space-y-3">
            {upcomingTasks.slice(0, 5).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <div className="mt-1">
                  {item.priority === "hög" ? (
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  ) : item.priority === "medel" ? (
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  ) : (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.task}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.category} • Prioritet: {item.priority}
                  </p>
                </div>
                <Clock className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border flex gap-3">
            <Link href="/admin/seo" className="text-sm text-primary hover:underline">
              Se SEO Plan →
            </Link>
            <Link href="/admin/seo-implementation" className="text-sm text-primary hover:underline">
              SEO Implementation →
            </Link>
            <Link href="/admin/dev" className="text-sm text-primary hover:underline">
              Developer Hub →
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity Section (Placeholder) */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Senaste aktivitet</h2>
        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground">Aktivitetslogg kommer snart...</p>
          <p className="text-sm text-muted-foreground mt-2">Här visas senaste ändringar i systemet</p>
        </div>
      </div>
    </div>
  )
}
