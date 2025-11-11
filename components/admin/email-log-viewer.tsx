"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Mail, Phone, Building2, Calendar, Eye, MessageSquare, Filter } from "lucide-react"
import { type ContactSubmission } from "@/lib/supabase"

export function EmailLogViewer() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterFormType, setFilterFormType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)

  useEffect(() => {
    fetchSubmissions()
  }, [filterFormType, filterStatus])

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filterFormType !== 'all') params.append('form_type', filterFormType)
      if (filterStatus !== 'all') params.append('status', filterStatus)
      if (searchQuery) params.append('search', searchQuery)

      const response = await fetch(`/api/admin/email-logs?${params}`)
      if (!response.ok) throw new Error('Failed to fetch submissions')
      const data = await response.json()
      setSubmissions(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch('/api/admin/email-logs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })

      if (!response.ok) throw new Error('Failed to update status')

      await fetchSubmissions()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update')
    }
  }

  const stats = {
    total: submissions.length,
    new: submissions.filter(s => s.status === 'new').length,
    contacted: submissions.filter(s => s.status === 'contacted').length,
    closed: submissions.filter(s => s.status === 'closed').length,
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
      case 'contacted': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
      case 'in_progress': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
      case 'closed': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
      case 'spam': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
    }
  }

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case 'new': return 'Ny'
      case 'contacted': return 'Kontaktad'
      case 'in_progress': return 'Pågående'
      case 'closed': return 'Avslutad'
      case 'spam': return 'Spam'
      default: return 'Okänd'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold">Kontaktförfrågningar</h2>
          <p className="text-muted-foreground mt-1">
            Hantera alla inkomna förfrågningar från hemsidan
          </p>
        </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground mb-1">Totalt</p>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground mb-1">Nya</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.new}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground mb-1">Kontaktade</p>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.contacted}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground mb-1">Avslutade</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.closed}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchSubmissions()}
            placeholder="Sök namn eller email..."
            className="w-full pl-10 pr-10 py-2 rounded-lg border border-border bg-background"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('')
                fetchSubmissions()
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
        <select
          value={filterFormType}
          onChange={(e) => setFilterFormType(e.target.value)}
          className="px-4 py-2 rounded-lg border border-border bg-background"
        >
          <option value="all">Alla formulär</option>
          <option value="contact">Kontaktformulär</option>
          <option value="quote">Offertförfrågan</option>
          <option value="support">Support</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 rounded-lg border border-border bg-background"
        >
          <option value="all">Alla status</option>
          <option value="new">Nya</option>
          <option value="contacted">Kontaktade</option>
          <option value="in_progress">Pågående</option>
          <option value="closed">Avslutade</option>
        </select>
      </div>

      {/* Submissions List */}
      <div className="space-y-3">
        {submissions.map((submission) => (
          <motion.div
            key={submission.id}
            layout
            className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => setSelectedSubmission(submission)}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold truncate">{submission.name || 'Ingen namn'}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(submission.status)}`}>
                    {getStatusLabel(submission.status)}
                  </span>
                  {submission.form_type && (
                    <span className="px-2 py-1 text-xs bg-accent rounded">
                      {submission.form_type}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-2">
                  {submission.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {submission.email}
                    </span>
                  )}
                  {submission.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {submission.phone}
                    </span>
                  )}
                  {submission.company && (
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {submission.company}
                    </span>
                  )}
                </div>
                {submission.message && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{submission.message}</p>
                )}
              </div>
              <div className="flex flex-col items-end gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(submission.created_at || '').toLocaleDateString('sv-SE')}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedSubmission(submission)
                  }}
                  className="px-2 py-1 rounded border border-border hover:bg-accent transition-colors flex items-center gap-1"
                >
                  <Eye className="w-3 h-3" />
                  Visa
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {submissions.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Inga förfrågningar hittades.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedSubmission && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setSelectedSubmission(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl max-h-[90vh] bg-card border border-border rounded-xl p-6 z-50 overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{selectedSubmission.name || 'Ingen namn'}</h3>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(selectedSubmission.status)}`}>
                    {getStatusLabel(selectedSubmission.status)}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="p-2 rounded-lg hover:bg-accent transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedSubmission.email && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <p className="font-medium">{selectedSubmission.email}</p>
                    </div>
                  )}
                  {selectedSubmission.phone && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Telefon</p>
                      <p className="font-medium">{selectedSubmission.phone}</p>
                    </div>
                  )}
                  {selectedSubmission.company && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Företag</p>
                      <p className="font-medium">{selectedSubmission.company}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Formulärtyp</p>
                    <p className="font-medium">{selectedSubmission.form_type || 'Okänd'}</p>
                  </div>
                </div>

                {selectedSubmission.message && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Meddelande</p>
                    <p className="p-3 rounded-lg bg-accent">{selectedSubmission.message}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Formulärdata</p>
                  <pre className="p-3 rounded-lg bg-accent text-xs overflow-x-auto">
                    {JSON.stringify(selectedSubmission.form_data, null, 2)}
                  </pre>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Skapad</p>
                    <p>{new Date(selectedSubmission.created_at || '').toLocaleString('sv-SE')}</p>
                  </div>
                  {selectedSubmission.contacted_at && (
                    <div>
                      <p className="text-muted-foreground mb-1">Kontaktad</p>
                      <p>{new Date(selectedSubmission.contacted_at).toLocaleString('sv-SE')}</p>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Ändra status</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => selectedSubmission.id && updateStatus(selectedSubmission.id, 'new')}
                      className="px-3 py-1.5 rounded-lg text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:opacity-80 transition-opacity"
                    >
                      Ny
                    </button>
                    <button
                      onClick={() => selectedSubmission.id && updateStatus(selectedSubmission.id, 'contacted')}
                      className="px-3 py-1.5 rounded-lg text-sm bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 hover:opacity-80 transition-opacity"
                    >
                      Kontaktad
                    </button>
                    <button
                      onClick={() => selectedSubmission.id && updateStatus(selectedSubmission.id, 'in_progress')}
                      className="px-3 py-1.5 rounded-lg text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 hover:opacity-80 transition-opacity"
                    >
                      Pågående
                    </button>
                    <button
                      onClick={() => selectedSubmission.id && updateStatus(selectedSubmission.id, 'closed')}
                      className="px-3 py-1.5 rounded-lg text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:opacity-80 transition-opacity"
                    >
                      Avslutad
                    </button>
                    <button
                      onClick={() => selectedSubmission.id && updateStatus(selectedSubmission.id, 'spam')}
                      className="px-3 py-1.5 rounded-lg text-sm bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:opacity-80 transition-opacity"
                    >
                      Spam
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      </div>
    </div>
  )
}
