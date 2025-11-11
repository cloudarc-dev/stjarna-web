"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Edit2, Trash2, Plus, Save, X, Eye, EyeOff, Briefcase } from "lucide-react"
import { type JobPosting2 } from "@/lib/supabase"

export function JobManager() {
  const [jobs, setJobs] = useState<JobPosting2[]>([])
  const [editingJob, setEditingJob] = useState<JobPosting2 | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/admin/jobs')
      const data = await response.json()
      setJobs(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingJob({
      title: '',
      department: 'IT',
      location: 'Umeå',
      employment_type: 'Heltid',
      description: '',
      is_active: false,
      sort_order: 0,
    })
    setIsCreating(true)
  }

  const handleSave = async () => {
    if (!editingJob) return

    try {
      const response = await fetch('/api/admin/jobs', {
        method: isCreating ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingJob),
      })

      if (!response.ok) throw new Error('Failed to save')

      await fetchJobs()
      setEditingJob(null)
      setIsCreating(false)
    } catch (err) {
      alert('Misslyckades att spara: ' + err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Vill du verkligen ta bort denna jobannons?')) return

    try {
      await fetch(`/api/admin/jobs?id=${id}`, { method: 'DELETE' })
      await fetchJobs()
    } catch (err) {
      alert('Misslyckades att ta bort: ' + err)
    }
  }

  if (loading) return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Hantera Jobbannonser</h2>
          <p className="text-muted-foreground mt-1">
            {jobs.length} jobbannonser ({jobs.filter(j => j.is_active).length} publicerade)
          </p>
        </div>
        <button onClick={handleCreate} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Ny jobbannons
        </button>
      </div>

      {editingJob && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border rounded-xl p-6 space-y-4">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-bold">{isCreating ? 'Ny jobbannons' : 'Redigera jobbannons'}</h3>
            <div className="flex gap-2">
              <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 flex items-center gap-2">
                <Save className="w-4 h-4" /> Spara
              </button>
              <button onClick={() => { setEditingJob(null); setIsCreating(false) }} className="px-4 py-2 rounded-lg border hover:bg-accent flex items-center gap-2">
                <X className="w-4 h-4" /> Avbryt
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Titel *</label>
              <input
                type="text"
                value={editingJob.title}
                onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border bg-background"
                placeholder="IT-konsult sökes"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Avdelning</label>
              <select value={editingJob.department} onChange={(e) => setEditingJob({ ...editingJob, department: e.target.value })} className="w-full px-4 py-2 rounded-lg border bg-background">
                <option value="IT">IT</option>
                <option value="Fordonsteknik">Fordonsteknik</option>
                <option value="Företagstelefoni">Företagstelefoni</option>
                <option value="Kommunikationsteknik">Kommunikationsteknik</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Plats</label>
              <select value={editingJob.location} onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })} className="w-full px-4 py-2 rounded-lg border bg-background">
                <option value="Umeå">Umeå</option>
                <option value="Skellefteå">Skellefteå</option>
                <option value="Distans">Distans</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Anställningsform</label>
              <select value={editingJob.employment_type || ''} onChange={(e) => setEditingJob({ ...editingJob, employment_type: e.target.value })} className="w-full px-4 py-2 rounded-lg border bg-background">
                <option value="Heltid">Heltid</option>
                <option value="Deltid">Deltid</option>
                <option value="Timanställning">Timanställning</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Ansökningsdatum (sista dag)</label>
              <input type="date" value={editingJob.application_deadline || ''} onChange={(e) => setEditingJob({ ...editingJob, application_deadline: e.target.value })} className="w-full px-4 py-2 rounded-lg border bg-background" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Kontaktperson</label>
              <input type="text" value={editingJob.contact_person || ''} onChange={(e) => setEditingJob({ ...editingJob, contact_person: e.target.value })} className="w-full px-4 py-2 rounded-lg border bg-background" placeholder="Anna Andersson" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Kontakt-email</label>
              <input type="email" value={editingJob.contact_email || ''} onChange={(e) => setEditingJob({ ...editingJob, contact_email: e.target.value })} className="w-full px-4 py-2 rounded-lg border bg-background" placeholder="anna@stjarnafyrkant.se" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Lönespann</label>
              <input type="text" value={editingJob.salary_range || ''} onChange={(e) => setEditingJob({ ...editingJob, salary_range: e.target.value })} className="w-full px-4 py-2 rounded-lg border bg-background" placeholder="30 000 - 40 000 kr/mån" />
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" checked={editingJob.is_active || false} onChange={(e) => setEditingJob({ ...editingJob, is_active: e.target.checked })} />
              <label className="text-sm font-medium">Publicerad</label>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Beskrivning *</label>
              <textarea value={editingJob.description} onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })} className="w-full px-4 py-2 rounded-lg border bg-background" rows={4} placeholder="Beskriv jobbet..." />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Arbetsuppgifter</label>
              <textarea value={editingJob.responsibilities || ''} onChange={(e) => setEditingJob({ ...editingJob, responsibilities: e.target.value })} className="w-full px-4 py-2 rounded-lg border bg-background" rows={3} />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Krav</label>
              <textarea value={editingJob.requirements || ''} onChange={(e) => setEditingJob({ ...editingJob, requirements: e.target.value })} className="w-full px-4 py-2 rounded-lg border bg-background" rows={3} />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Meriterande</label>
              <textarea value={editingJob.qualifications || ''} onChange={(e) => setEditingJob({ ...editingJob, qualifications: e.target.value })} className="w-full px-4 py-2 rounded-lg border bg-background" rows={2} />
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid gap-4">
        {jobs.map((job) => (
          <motion.div key={job.id} className="bg-card border rounded-xl p-6">
            <div className="flex justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold">{job.title}</h3>
                  {job.is_active ? (
                    <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded flex items-center gap-1">
                      <Eye className="w-3 h-3" /> Publicerad
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded flex items-center gap-1">
                      <EyeOff className="w-3 h-3" /> Utkast
                    </span>
                  )}
                </div>
                <div className="flex gap-3 text-sm text-muted-foreground mb-2">
                  <span className="px-2 py-1 bg-accent rounded">{job.department}</span>
                  <span className="px-2 py-1 bg-accent rounded">{job.location}</span>
                  <span>{job.employment_type}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                {job.application_deadline && (
                  <p className="text-sm text-muted-foreground mt-2">Sök senast: {job.application_deadline}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setEditingJob({ ...job }); setIsCreating(false) }} className="p-2 rounded-lg border hover:bg-accent">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => job.id && handleDelete(job.id)} className="p-2 rounded-lg border hover:bg-red-500/10 hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {jobs.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Inga jobbannonser än. Klicka på "Ny jobbannons" för att komma igång.</p>
          </div>
        )}
      </div>
    </div>
  )
}
