"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Edit2, Trash2, Plus, Mail, Save, X } from "lucide-react"
import { formConfigs, FormConfig, FormType, FormField } from "@/lib/form-config"

export function FormManager() {
  const [forms, setForms] = useState<Record<string, FormConfig>>(formConfigs)
  const [editingForm, setEditingForm] = useState<string | null>(null)
  const [editedConfig, setEditedConfig] = useState<FormConfig | null>(null)

  const handleEdit = (formType: string) => {
    setEditingForm(formType)
    setEditedConfig(JSON.parse(JSON.stringify(forms[formType])))
  }

  const handleSave = () => {
    if (editingForm && editedConfig) {
      setForms(prev => ({
        ...prev,
        [editingForm]: editedConfig
      }))
      setEditingForm(null)
      setEditedConfig(null)
      // TODO: Save to backend/file
      alert('Ändringar sparade! (TODO: Implementera backend-spara)')
    }
  }

  const handleCancel = () => {
    setEditingForm(null)
    setEditedConfig(null)
  }

  const handleFieldChange = (fieldIndex: number, key: keyof FormField, value: any) => {
    if (!editedConfig) return
    const newFields = [...editedConfig.fields]
    newFields[fieldIndex] = { ...newFields[fieldIndex], [key]: value }
    setEditedConfig({ ...editedConfig, fields: newFields })
  }

  const handleAddField = () => {
    if (!editedConfig) return
    const newField: FormField = {
      name: 'new_field',
      label: 'Nytt fält',
      type: 'text',
      required: false,
      placeholder: ''
    }
    setEditedConfig({
      ...editedConfig,
      fields: [...editedConfig.fields, newField]
    })
  }

  const handleRemoveField = (fieldIndex: number) => {
    if (!editedConfig) return
    const newFields = editedConfig.fields.filter((_, i) => i !== fieldIndex)
    setEditedConfig({ ...editedConfig, fields: newFields })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Hantera Formulär</h2>
          <p className="text-muted-foreground mt-1">
            Redigera befintliga formulär eller skapa nya ({Object.keys(forms).length} formulär)
          </p>
        </div>
        <button
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2"
          onClick={() => alert('Skapa nytt formulär (TODO)')}
        >
          <Plus className="w-4 h-4" />
          Nytt formulär
        </button>
      </div>

      <div className="grid gap-4">
        {Object.entries(forms).map(([formType, config]) => (
          <motion.div
            key={formType}
            layout
            className="bg-card border border-border rounded-xl overflow-hidden"
          >
            {editingForm === formType && editedConfig ? (
              // Edit Mode
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">Redigera: {config.title}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Spara
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Avbryt
                    </button>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Titel</label>
                    <input
                      type="text"
                      value={editedConfig.title}
                      onChange={(e) => setEditedConfig({ ...editedConfig, title: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={editedConfig.email}
                      onChange={(e) => setEditedConfig({ ...editedConfig, email: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Beskrivning</label>
                    <textarea
                      value={editedConfig.description}
                      onChange={(e) => setEditedConfig({ ...editedConfig, description: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                      rows={2}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Ämnesrad</label>
                    <input
                      type="text"
                      value={editedConfig.subject}
                      onChange={(e) => setEditedConfig({ ...editedConfig, subject: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                    />
                  </div>
                </div>

                {/* Fields */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">Formulärfält ({editedConfig.fields.length})</h4>
                    <button
                      onClick={handleAddField}
                      className="px-3 py-1 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Lägg till fält
                    </button>
                  </div>
                  <div className="space-y-3">
                    {editedConfig.fields.map((field, index) => (
                      <div key={index} className="p-4 bg-accent/50 rounded-lg border border-border">
                        <div className="grid md:grid-cols-4 gap-3">
                          <div>
                            <label className="block text-xs font-medium mb-1">Fältnamn</label>
                            <input
                              type="text"
                              value={field.name}
                              onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                              className="w-full px-2 py-1 text-sm rounded border border-border bg-background"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium mb-1">Label</label>
                            <input
                              type="text"
                              value={field.label}
                              onChange={(e) => handleFieldChange(index, 'label', e.target.value)}
                              className="w-full px-2 py-1 text-sm rounded border border-border bg-background"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium mb-1">Typ</label>
                            <select
                              value={field.type}
                              onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
                              className="w-full px-2 py-1 text-sm rounded border border-border bg-background"
                            >
                              <option value="text">Text</option>
                              <option value="email">Email</option>
                              <option value="tel">Telefon</option>
                              <option value="textarea">Textarea</option>
                              <option value="select">Select</option>
                            </select>
                          </div>
                          <div className="flex items-end gap-2">
                            <label className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                checked={field.required}
                                onChange={(e) => handleFieldChange(index, 'required', e.target.checked)}
                                className="rounded"
                              />
                              Obligatorisk
                            </label>
                            <button
                              onClick={() => handleRemoveField(index)}
                              className="p-1 hover:bg-red-500/10 hover:text-red-500 rounded transition-colors"
                              title="Ta bort fält"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="md:col-span-4">
                            <label className="block text-xs font-medium mb-1">Placeholder</label>
                            <input
                              type="text"
                              value={field.placeholder || ''}
                              onChange={(e) => handleFieldChange(index, 'placeholder', e.target.value)}
                              className="w-full px-2 py-1 text-sm rounded border border-border bg-background"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // View Mode
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{config.title}</h3>
                      <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                        {formType}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{config.description}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">→</span>
                      <code className="px-2 py-1 bg-accent rounded text-xs">{config.email}</code>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(formType)}
                      className="p-2 rounded-lg border border-border hover:bg-accent transition-colors"
                      title="Redigera"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Vill du verkligen ta bort formuläret "${config.title}"?`)) {
                          alert('Ta bort formulär (TODO)')
                        }
                      }}
                      className="p-2 rounded-lg border border-border hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-colors"
                      title="Ta bort"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-medium mb-2">{config.fields.length} fält:</p>
                  <div className="flex flex-wrap gap-2">
                    {config.fields.map((field) => (
                      <span
                        key={field.name}
                        className="px-3 py-1 bg-accent rounded-full text-xs flex items-center gap-1"
                      >
                        {field.label}
                        {field.required && <span className="text-red-500">*</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
