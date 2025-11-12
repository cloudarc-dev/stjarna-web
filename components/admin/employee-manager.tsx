"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Edit2, Trash2, Plus, Save, X, Eye, EyeOff, User } from "lucide-react"
import { getServiceSupabase, type Employee } from "@/lib/supabase"

export function EmployeeManager() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch employees from Supabase
  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/employees')
      if (!response.ok) throw new Error('Failed to fetch employees')
      const data = await response.json()
      setEmployees(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingEmployee({
      name: '',
      title: '',
      email: '',
      phone: '',
      linkedin_url: '',
      department: 'IT',
      office: 'Umeå',
      display_order: 0,
      is_visible: true,
    })
    setIsCreating(true)
  }

  const handleEdit = (employee: Employee) => {
    setEditingEmployee({ ...employee })
    setIsCreating(false)
  }

  const handleSave = async () => {
    if (!editingEmployee) return

    try {
      const method = isCreating ? 'POST' : 'PUT'
      const response = await fetch('/api/admin/employees', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingEmployee),
      })

      if (!response.ok) throw new Error('Failed to save employee')

      await fetchEmployees()
      setEditingEmployee(null)
      setIsCreating(false)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Är du säker på att du vill ta bort denna medarbetare?')) return

    try {
      const response = await fetch(`/api/admin/employees?id=${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete employee')

      await fetchEmployees()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete')
    }
  }

  const handleCancel = () => {
    setEditingEmployee(null)
    setIsCreating(false)
  }

  if (loading) {
    return <div className="flex items-center justify-center p-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  }

  if (error) {
    return <div className="p-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
      Error: {error}
    </div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Hantera Medarbetare</h2>
          <p className="text-muted-foreground mt-1">
            Lägg till, redigera eller ta bort medarbetare ({employees.length} medarbetare)
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Lägg till medarbetare
        </button>
      </div>

      {/* Create/Edit Form */}
      {editingEmployee && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-6 space-y-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">
              {isCreating ? 'Ny medarbetare' : 'Redigera medarbetare'}
            </h3>
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

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Namn *</label>
              <input
                type="text"
                value={editingEmployee.name}
                onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                placeholder="Anna Andersson"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Titel *</label>
              <input
                type="text"
                value={editingEmployee.title}
                onChange={(e) => setEditingEmployee({ ...editingEmployee, title: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                placeholder="IT-konsult"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={editingEmployee.email || ''}
                onChange={(e) => setEditingEmployee({ ...editingEmployee, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                placeholder="anna.andersson@stjarnafyrkant.se"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Telefon</label>
              <input
                type="tel"
                value={editingEmployee.phone || ''}
                onChange={(e) => setEditingEmployee({ ...editingEmployee, phone: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                placeholder="070-123 45 67"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Avdelning</label>
              <select
                value={editingEmployee.department || ''}
                onChange={(e) => setEditingEmployee({ ...editingEmployee, department: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              >
                <option value="IT">IT</option>
                <option value="Fordonsteknik">Fordonsteknik</option>
                <option value="Backoffice">Backoffice</option>
                <option value="Försäljning">Försäljning</option>
                <option value="Ledning">Ledning</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Kontor</label>
              <select
                value={editingEmployee.office || ''}
                onChange={(e) => setEditingEmployee({ ...editingEmployee, office: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              >
                <option value="Umeå">Umeå</option>
                <option value="Skellefteå">Skellefteå</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">LinkedIn-URL</label>
              <input
                type="url"
                value={editingEmployee.linkedin_url || ''}
                onChange={(e) => setEditingEmployee({ ...editingEmployee, linkedin_url: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                placeholder="https://linkedin.com/in/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Visningsordning</label>
              <input
                type="number"
                value={editingEmployee.display_order || 0}
                onChange={(e) => setEditingEmployee({ ...editingEmployee, display_order: parseInt(e.target.value) })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={editingEmployee.is_visible || false}
                onChange={(e) => setEditingEmployee({ ...editingEmployee, is_visible: e.target.checked })}
                className="rounded"
              />
              <label className="text-sm font-medium">Synlig på webbplatsen</label>
            </div>
          </div>
        </motion.div>
      )}

      {/* Employee List */}
      <div className="grid gap-4">
        {employees.map((employee) => (
          <motion.div
            key={employee.id}
            layout
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center overflow-hidden">
                  {employee.image_url ? (
                    <img src={employee.image_url} alt={employee.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold">{employee.name}</h3>
                    {employee.is_visible ? (
                      <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        Synlig
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded flex items-center gap-1">
                        <EyeOff className="w-3 h-3" />
                        Dold
                      </span>
                    )}
                  </div>
                  <p className="text-primary font-medium">{employee.title}</p>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                    {employee.department && (
                      <span className="px-2 py-1 bg-accent rounded">{employee.department}</span>
                    )}
                    {employee.office && (
                      <span className="px-2 py-1 bg-accent rounded">{employee.office}</span>
                    )}
                    {employee.email && <span>{employee.email}</span>}
                    {employee.phone && <span>{employee.phone}</span>}
                    {employee.linkedin_url && (
                      <a href={employee.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(employee)}
                  className="p-2 rounded-lg border border-border hover:bg-accent transition-colors"
                  title="Redigera"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => employee.id && handleDelete(employee.id)}
                  className="p-2 rounded-lg border border-border hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-colors"
                  title="Ta bort"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {employees.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Inga medarbetare än. Klicka på "Lägg till medarbetare" för att komma igång.</p>
          </div>
        )}
      </div>
    </div>
  )
}
