"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Loader2, CheckCircle2 } from "lucide-react"
import { FormType, getFormConfig, FormField } from "@/lib/form-config"

interface FormModalProps {
  open: boolean
  onClose: () => void
  formType: FormType
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export function FormModal({ open, onClose, formType }: FormModalProps) {
  const config = getFormConfig(formType)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType,
          email: config.email,
          subject: config.subject,
          data: formData,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setStatus('success')
      setFormData({})

      // Auto-close after 3 seconds on success
      setTimeout(() => {
        onClose()
        setStatus('idle')
      }, 3000)
    } catch (error) {
      setStatus('error')
      setErrorMessage('Något gick fel. Försök igen eller kontakta oss direkt.')
      console.error('Form submission error:', error)
    }
  }

  const renderField = (field: FormField) => {
    const baseClasses = "w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            name={field.name}
            id={field.name}
            required={field.required}
            placeholder={field.placeholder}
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={`${baseClasses} min-h-[120px] resize-y`}
            rows={5}
          />
        )

      case 'select':
        return (
          <select
            name={field.name}
            id={field.name}
            required={field.required}
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={baseClasses}
          >
            <option value="">Välj ett alternativ...</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )

      default:
        return (
          <input
            type={field.type}
            name={field.name}
            id={field.name}
            required={field.required}
            placeholder={field.placeholder}
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={baseClasses}
          />
        )
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl pointer-events-auto border border-gray-200"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{config.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">{config.description}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                  aria-label="Stäng"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <div className="px-6 py-6">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Tack för ditt meddelande!</h3>
                    <p className="text-gray-600 text-center">
                      Vi har tagit emot din förfrågan och återkommer så snart som möjligt.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {config.fields.map((field) => (
                      <div key={field.name}>
                        <label
                          htmlFor={field.name}
                          className="block text-sm font-medium text-gray-900 mb-2"
                        >
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        {renderField(field)}
                      </div>
                    ))}

                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400"
                      >
                        {errorMessage}
                      </motion.div>
                    )}

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={onClose}
                        disabled={status === 'loading'}
                        className="flex-1 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-gray-700"
                      >
                        Avbryt
                      </button>
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="flex-1 px-6 py-3 rounded-lg bg-primary text-black hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Skickar...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Skicka
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-gray-500 text-center pt-2">
                      Genom att skicka formuläret godkänner du vår{' '}
                      <a href="/verksamhetspolicy" className="underline hover:text-gray-900">
                        integritetspolicy
                      </a>
                      .
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
