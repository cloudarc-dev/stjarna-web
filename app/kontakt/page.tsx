"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedText } from "@/components/ui/animated-text"
import { SubtleCard } from "@/components/ui/subtle-card"
import { MapPin, Clock, Phone, Send, Loader2, CheckCircle2 } from "lucide-react"
import { OptimizedBackground } from "@/components/ui/optimized-background"
import { getFormConfig, FormField } from "@/lib/form-config"

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export default function KontaktPage() {
  const config = getFormConfig('general')
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
          formType: 'general',
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

      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle')
      }, 5000)
    } catch (error) {
      setStatus('error')
      setErrorMessage('Något gick fel. Försök igen eller kontakta oss direkt.')
      console.error('Form submission error:', error)
    }
  }

  const renderField = (field: FormField) => {
    const baseClasses = "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"

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
    <>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow">
          {/* Hero Section - Simplified */}
          <section className="relative py-16 md:py-24 flex items-center justify-center text-center px-4 border-b">
            <OptimizedBackground variant="hero" className="absolute inset-0 z-0 opacity-30" />
            <div className="relative z-10 max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Kontakta oss</h1>
              <p className="text-lg text-muted-foreground">
                Vi finns i Umeå och Skellefteå. Välkommen att höra av dig!
              </p>
            </div>
          </section>

          {/* Office Locations Section - PRIORITY */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto">
              <div className="text-center mb-16">
                <AnimatedText text="Våra kontor" el="h2" className="text-4xl font-bold mb-6" />
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Vi finns på två platser i Västerbotten för att vara nära dig och ditt företag.
                </p>
              </div>

              {/* Office Grid */}
              <div className="grid md:grid-cols-2 gap-12 mb-16">
                {/* Umeå kontor */}
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-6">Umeå</h3>
                  <div className="space-y-6">
                    <SubtleCard className="p-6">
                      <div className="flex items-start gap-4">
                        <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-2">Träffa oss</h4>
                          <p className="text-muted-foreground">Förrådsvägen 15</p>
                          <p className="text-muted-foreground mb-3">901 32 Umeå</p>
                          <a
                            href="https://www.google.com/maps/place/Förrådsvägen+15,+901+32+Umeå"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-sm inline-flex items-center gap-1"
                          >
                            Se vägbeskrivning →
                          </a>
                        </div>
                      </div>
                    </SubtleCard>

                    <SubtleCard className="p-6">
                      <div className="flex items-start gap-4">
                        <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">Kontakta oss</h4>
                          <a href="tel:+4690704470" className="text-muted-foreground hover:text-primary block">
                            090-70 44 70
                          </a>
                          <a href="mailto:umea@stjarnafyrkant.se" className="text-muted-foreground hover:text-primary block mt-1">
                            umea@stjarnafyrkant.se
                          </a>
                        </div>
                      </div>
                    </SubtleCard>

                    <SubtleCard className="p-6 h-[220px]">
                      <div className="flex items-start gap-4">
                        <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-2">Öppettider</h4>
                          <div className="space-y-1 text-muted-foreground text-sm">
                            <p>Helgfria vardagar: 07:00-17:00</p>
                            <p>Dag före röd dag: 07:00-15:00</p>
                            <p className="font-medium text-foreground mt-3">Särskilda öppettider</p>
                            <p>Vecka 28-31: 08:00-16:00</p>
                          </div>
                        </div>
                      </div>
                    </SubtleCard>
                  </div>
                </div>

                {/* Skellefteå kontor */}
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-6">Skellefteå</h3>
                  <div className="space-y-6">
                    <SubtleCard className="p-6">
                      <div className="flex items-start gap-4">
                        <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-2">Träffa oss</h4>
                          <p className="text-muted-foreground">Företagsvägen 1</p>
                          <p className="text-muted-foreground mb-3">931 57 Skellefteå</p>
                          <a
                            href="https://www.google.com/maps/place/Företagsvägen+1,+931+57+Skellefteå"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-sm inline-flex items-center gap-1"
                          >
                            Se vägbeskrivning →
                          </a>
                        </div>
                      </div>
                    </SubtleCard>

                    <SubtleCard className="p-6">
                      <div className="flex items-start gap-4">
                        <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">Kontakta oss</h4>
                          <a href="tel:+46910711220" className="text-muted-foreground hover:text-primary block">
                            0910-71 12 20
                          </a>
                          <a href="mailto:skelleftea@stjarnafyrkant.se" className="text-muted-foreground hover:text-primary block mt-1">
                            skelleftea@stjarnafyrkant.se
                          </a>
                        </div>
                      </div>
                    </SubtleCard>

                    <SubtleCard className="p-6 h-[220px]">
                      <div className="flex items-start gap-4">
                        <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-2">Öppettider</h4>
                          <div className="space-y-1 text-muted-foreground text-sm">
                            <p>Mån-Tors: 08:00-17:00</p>
                            <p>Fre: 08:00-16:00</p>
                            <p className="font-medium text-foreground mt-3">Särskilda öppettider</p>
                            <p>Vecka 28 & 31: 08:00-16:00</p>
                            <p>Stängt vecka 29 & 30</p>
                          </div>
                        </div>
                      </div>
                    </SubtleCard>
                  </div>
                </div>
              </div>

              {/* Maps Section */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Umeå Map */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-lg font-semibold mb-4 text-primary">Umeå</h4>
                  <div className="rounded-xl overflow-hidden shadow-lg border">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1742.8473646892594!2d20.278888!3d63.825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x467c5b3a3e3e3e3e%3A0x3e3e3e3e3e3e3e3e!2sF%C3%B6rr%C3%A5dsv%C3%A4gen%2015%2C%20901%2032%20Ume%C3%A5!5e0!3m2!1ssv!2sse!4v1234567890"
                      width="100%"
                      height="350"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </motion.div>

                {/* Skellefteå Map */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-lg font-semibold mb-4 text-primary">Skellefteå</h4>
                  <div className="rounded-xl overflow-hidden shadow-lg border">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1742.8473646892594!2d20.950888!3d64.751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x467f61a3a3e3e3e3%3A0x3e3e3e3e3e3e3e3e!2sF%C3%B6retagsv%C3%A4gen%201%2C%20931%2057%20Skellefte%C3%A5!5e0!3m2!1ssv!2sse!4v1234567890"
                      width="100%"
                      height="350"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Contact Form Section */}
          <section className="py-16 md:py-24 dark:border-t bg-gray-100 dark:bg-card/20">
            <div className="container mx-auto max-w-2xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Skicka meddelande</h2>
                <p className="text-muted-foreground">
                  Har du frågor eller vill veta mer? Fyll i formuläret så hör vi av oss.
                </p>
              </div>
              <SubtleCard className="p-6 md:p-8">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Tack för ditt meddelande!</h3>
                    <p className="text-muted-foreground text-center">
                      Vi har tagit emot din förfrågan och återkommer så snart som möjligt.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {config.fields.map((field) => (
                      <div key={field.name}>
                        <label
                          htmlFor={field.name}
                          className="block text-sm font-medium text-foreground mb-2"
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

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Skickar...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Skicka meddelande
                        </>
                      )}
                    </button>

                    <p className="text-xs text-muted-foreground text-center pt-2">
                      Genom att skicka formuläret godkänner du vår{' '}
                      <a href="/integritetspolicy" className="underline hover:text-foreground">
                        integritetspolicy
                      </a>
                      .
                    </p>
                  </form>
                )}
              </SubtleCard>
              <p className="text-center text-sm text-muted-foreground mt-6">
                All information behandlas konfidentiellt enligt GDPR
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
