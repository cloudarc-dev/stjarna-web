"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Edit2, Trash2, Plus, Save, X, Eye, EyeOff, FileText, Star } from "lucide-react"
import { type CaseStudy } from "@/lib/supabase"

export function CaseManager() {
  const [cases, setCases] = useState<CaseStudy[]>([])
  const [editingCase, setEditingCase] = useState<CaseStudy | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCases()
  }, [])

  const fetchCases = async () => {
    try {
      const response = await fetch('/api/admin/cases')
      const data = await response.json()
      setCases(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingCase({
      client_name: '',
      project_title: '',
      summary: '',
      services: [],
      is_published: false,
      is_featured: false,
      display_order: 0,
    })
    setIsCreating(true)
  }

  const handleSave = async () => {
    if (!editingCase) return

    try {
      const response = await fetch('/api/admin/cases', {
        method: isCreating ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCase),
      })

      if (!response.ok) throw new Error('Failed to save')

      await fetchCases()
      setEditingCase(null)
      setIsCreating(false)
    } catch (err) {
      alert('Misslyckades att spara: ' + err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Vill du verkligen ta bort detta kundcase?')) return

    try {
      await fetch(`/api/admin/cases?id=${id}`, { method: 'DELETE' })
      await fetchCases()
    } catch (err) {
      alert('Misslyckades att ta bort: ' + err)
    }
  }

  if (loading) return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Hantera Kundcase</h2>
          <p className="text-muted-foreground mt-1">
            {cases.length} kundcase ({cases.filter(c => c.is_published).length} publicerade, {cases.filter(c => c.is_featured).length} utvalda)
          </p>
        </div>
        <button onClick={handleCreate} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nytt kundcase
        </button>
      </div>

      {editingCase && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border rounded-xl p-6 space-y-4">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-bold">{isCreating ? 'Nytt kundcase' : 'Redigera kundcase'}</h3>
            <div className="flex gap-2">
              <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 flex items-center gap-2">
                <Save className="w-4 h-4" /> Spara
              </button>
              <button onClick={() => { setEditingCase(null); setIsCreating(false) }} className="px-4 py-2 rounded-lg border hover:bg-accent flex items-center gap-2">
                <X className="w-4 h-4" /> Avbryt
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Kundnamn *</label>
              <input type="text" value={editingCase.client_name} onChange={(e) => setEditingCase({ ...editingCase, client_name: e.target.value })} className="w-full px-4 py-2 rounded-lg border bg-background" placeholder="Acme AB" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Projekttitel *</label>
              <input type="text" value={editingCase.project_title} onChange={(e) => setEditingCase({ ...editingCase, project_title: e.target.value })} className="w-full px-4 py-2 rounded-lg border bg-background" placeholder="IT-modernisering" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Bransch</label>
              <input type="text" value={editingCase.industry || ''} onChange={(e) => setEditingCase({ ...editingCase, industry: e.target.value })} className="w-full px-4 py-2 rounded-lg border bg-background" placeholder="Bygg" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Projektdatum</label>
              <input type="date" value={editingCase.project_date || ''} onChange={(e) => setEditingCase({ ...editingCase, project_date: e.target.value })} className="w-full px-4 py-2 rounded-lg border bg-background" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Projektlängd</label>
              <input type="text" value={editingCase.project_duration || ''} onChange={(e) => setEditingCase({ ...editingCase, project_duration: e.target.value })} className="w-full px-4 py-2 rounded-lg border bg-background" placeholder="3 månader" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Bild från Media Library</label>
              <input type="url" value={editingCase.client_logo_url || ''} onChange={(e) => setEditingCase({ ...editingCase, client_logo_url: e.target.value })} className="w-full px-4 py-2 rounded-lg border bg-background" placeholder="Välj bild från media library" />
              <p className="text-xs text-muted-foreground mt-1">Ange URL till uppladdad bild (t.ex. logotyp)</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Publicera på *</label>
              <select
                value={editingCase.publish_on || ''}
                onChange={(e) => setEditingCase({ ...editingCase, publish_on: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border bg-background"
              >
                <option value="">Välj tjänstesida</option>
                <option value="it-tjanster">IT-tjänster</option>
                <option value="fordonsteknik">Fordonsteknik</option>
                <option value="kommunikation">Kommunikation</option>
                <option value="servicedesk">Servicedesk</option>
              </select>
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={editingCase.is_published || false} onChange={(e) => setEditingCase({ ...editingCase, is_published: e.target.checked })} />
                <span className="text-sm font-medium">Publicerad</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={editingCase.is_featured || false} onChange={(e) => setEditingCase({ ...editingCase, is_featured: e.target.checked })} />
                <span className="text-sm font-medium">Utvald (startsida)</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tjänster (kommaseparerade) *</label>
              <input
                type="text"
                value={editingCase.services?.join(', ') || ''}
                onChange={(e) => setEditingCase({ ...editingCase, services: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                className="w-full px-4 py-2 rounded-lg border bg-background"
                placeholder="IT-support, Molnlösningar"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Sammanfattning</label>
              <textarea value={editingCase.summary || ''} onChange={(e) => setEditingCase({ ...editingCase, summary: e.target.value })} className="w-full px-4 py-2 rounded-lg border bg-background" rows={2} placeholder="Kort sammanfattning (1-2 meningar)" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Kundcitat</label>
              <textarea value={editingCase.testimonial || ''} onChange={(e) => setEditingCase({ ...editingCase, testimonial: e.target.value })} className="w-full px-4 py-2 rounded-lg border bg-background" rows={2} placeholder="Citat från kund..." />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Citatets författare</label>
              <input type="text" value={editingCase.testimonial_author || ''} onChange={(e) => setEditingCase({ ...editingCase, testimonial_author: e.target.value })} className="w-full px-4 py-2 rounded-lg border bg-background" placeholder="Anna Andersson" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Författarens titel</label>
              <input type="text" value={editingCase.testimonial_title || ''} onChange={(e) => setEditingCase({ ...editingCase, testimonial_title: e.target.value })} className="w-full px-4 py-2 rounded-lg border bg-background" placeholder="VD, Acme AB" />
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid gap-4">
        {cases.map((caseStudy) => (
          <motion.div key={caseStudy.id} className="bg-card border rounded-xl p-6">
            <div className="flex justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold">{caseStudy.client_name}: {caseStudy.project_title}</h3>
                  {caseStudy.is_featured && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                  {caseStudy.is_published ? (
                    <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded flex items-center gap-1">
                      <Eye className="w-3 h-3" /> Publicerad
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded flex items-center gap-1">
                      <EyeOff className="w-3 h-3" /> Utkast
                    </span>
                  )}
                </div>
                <div className="flex gap-2 mb-2">
                  {caseStudy.services?.map((service, idx) => (
                    <span key={idx} className="px-2 py-1 text-xs bg-accent rounded">{service}</span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{caseStudy.summary}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setEditingCase({ ...caseStudy }); setIsCreating(false) }} className="p-2 rounded-lg border hover:bg-accent">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => caseStudy.id && handleDelete(caseStudy.id)} className="p-2 rounded-lg border hover:bg-red-500/10 hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {cases.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Inga kundcase än. Klicka på "Nytt kundcase" för att komma igång.</p>
          </div>
        )}
      </div>
    </div>
  )
}
