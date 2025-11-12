"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Edit2, Trash2, Save, X, GripVertical, Eye, EyeOff } from "lucide-react"
import { type FAQ } from "@/lib/supabase"

const SERVICE_OPTIONS = [
  { value: 'it', label: 'IT-tjänster' },
  { value: 'servicedesk', label: 'Servicedesk' },
  { value: 'fordonsteknik', label: 'Fordonsteknik' },
  { value: 'kommunikationsteknik', label: 'Kommunikationsteknik' },
  { value: 'foretagstelefoni', label: 'Företagstelefoni' },
] as const

export function FAQManager() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [selectedService, setSelectedService] = useState<string>('all')

  const [formData, setFormData] = useState<Partial<FAQ>>({
    question: '',
    answer: '',
    service: 'it',
    order_index: 0,
    is_active: true,
  })

  useEffect(() => {
    fetchFAQs()
  }, [selectedService])

  const fetchFAQs = async () => {
    try {
      setLoading(true)
      const url = selectedService === 'all'
        ? '/api/admin/faqs'
        : `/api/admin/faqs?service=${selectedService}`

      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to fetch FAQs')
      const data = await response.json()
      setFaqs(data)
    } catch (error) {
      console.error('Failed to fetch FAQs:', error)
      alert('Kunde inte hämta FAQs')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setIsCreating(true)
    setEditingId(null)
    setFormData({
      question: '',
      answer: '',
      service: selectedService !== 'all' ? selectedService as FAQ['service'] : 'it',
      order_index: faqs.length,
      is_active: true,
    })
  }

  const handleEdit = (faq: FAQ) => {
    setEditingId(faq.id!)
    setIsCreating(false)
    setFormData(faq)
  }

  const handleSave = async () => {
    try {
      if (!formData.question || !formData.answer) {
        alert('Fråga och svar måste fyllas i')
        return
      }

      const url = isCreating ? '/api/admin/faqs' : '/api/admin/faqs'
      const method = isCreating ? 'POST' : 'PUT'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save FAQ')
      }

      await fetchFAQs()
      setIsCreating(false)
      setEditingId(null)
      setFormData({
        question: '',
        answer: '',
        service: 'it',
        order_index: 0,
        is_active: true,
      })
    } catch (error) {
      console.error('Failed to save FAQ:', error)
      alert(error instanceof Error ? error.message : 'Kunde inte spara FAQ')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Är du säker på att du vill ta bort denna FAQ?')) return

    try {
      const response = await fetch(`/api/admin/faqs?id=${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete FAQ')

      await fetchFAQs()
    } catch (error) {
      console.error('Failed to delete FAQ:', error)
      alert('Kunde inte ta bort FAQ')
    }
  }

  const handleToggleActive = async (faq: FAQ) => {
    try {
      const response = await fetch('/api/admin/faqs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...faq, is_active: !faq.is_active }),
      })

      if (!response.ok) throw new Error('Failed to toggle FAQ')

      await fetchFAQs()
    } catch (error) {
      console.error('Failed to toggle FAQ:', error)
      alert('Kunde inte uppdatera FAQ')
    }
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingId(null)
    setFormData({
      question: '',
      answer: '',
      service: 'it',
      order_index: 0,
      is_active: true,
    })
  }

  const filteredFAQs = faqs

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">FAQ-hantering</h2>
            <p className="text-muted-foreground mt-1">
              Hantera vanliga frågor för olika tjänster
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Ny FAQ
          </button>
        </div>

        {/* Service Filter */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedService('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedService === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border hover:bg-accent'
            }`}
          >
            Alla tjänster
          </button>
          {SERVICE_OPTIONS.map((service) => (
            <button
              key={service.value}
              onClick={() => setSelectedService(service.value)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedService === service.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border hover:bg-accent'
              }`}
            >
              {service.label}
            </button>
          ))}
        </div>

        {/* Create/Edit Form */}
        <AnimatePresence>
          {(isCreating || editingId) && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold mb-4">
                {isCreating ? 'Skapa ny FAQ' : 'Redigera FAQ'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tjänst</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value as FAQ['service'] })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  >
                    {SERVICE_OPTIONS.map((service) => (
                      <option key={service.value} value={service.value}>
                        {service.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Fråga</label>
                  <input
                    type="text"
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                    placeholder="Hur snabbt kan ni hjälpa till vid IT-problem?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Svar</label>
                  <textarea
                    value={formData.answer}
                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                    rows={4}
                    placeholder="Vi erbjuder snabb fjärrsupport och akuta insatser..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Sorteringsordning</label>
                    <input
                      type="number"
                      value={formData.order_index}
                      onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                      min={0}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <div className="flex items-center gap-2 h-[42px]">
                      <input
                        type="checkbox"
                        id="is_active"
                        checked={formData.is_active}
                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <label htmlFor="is_active" className="text-sm">Aktiv</label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Spara
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 rounded-lg bg-card border border-border hover:bg-accent transition-colors flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Avbryt
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAQ List */}
        <div className="space-y-3">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Inga FAQs hittades. Klicka på "Ny FAQ" för att skapa en.
            </div>
          ) : (
            filteredFAQs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`bg-card border border-border rounded-lg p-4 ${
                  !faq.is_active ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <GripVertical className="w-5 h-5 text-muted-foreground" />
                  </div>

                  <div className="flex-grow min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs px-2 py-1 rounded bg-accent">
                            {SERVICE_OPTIONS.find((s) => s.value === faq.service)?.label}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            #{faq.order_index}
                          </span>
                        </div>
                        <h4 className="font-semibold text-lg">{faq.question}</h4>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleToggleActive(faq)}
                          className="p-2 rounded-lg hover:bg-accent transition-colors"
                          title={faq.is_active ? 'Inaktivera' : 'Aktivera'}
                        >
                          {faq.is_active ? (
                            <Eye className="w-4 h-4 text-green-600" />
                          ) : (
                            <EyeOff className="w-4 h-4 text-muted-foreground" />
                          )}
                        </button>
                        <button
                          onClick={() => handleEdit(faq)}
                          className="p-2 rounded-lg hover:bg-accent transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(faq.id!)}
                          className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
