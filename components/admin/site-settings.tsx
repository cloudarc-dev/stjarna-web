"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Save, Building2, MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import { type SiteSettings as SiteSettingsType } from "@/lib/supabase"

export function SiteSettings() {
  const [settings, setSettings] = useState<SiteSettingsType>({
    company_name: 'StjärnaFyrkant Västerbotten',
    company_description: 'IT-tjänster, Fordonsteknik, Kommunikationsteknik och Företagstelefoni',
    umea_address: 'Förrådsvägen 15',
    umea_postal_code: '901 32',
    umea_city: 'Umeå',
    umea_phone: '090-70 44 70',
    umea_email: 'umea@stjarnafyrkant.se',
    umea_hours_weekdays: 'Helgfria vardagar: 07:00-17:00',
    umea_hours_day_before_holiday: 'Dag före röd dag: 07:00-15:00',
    umea_hours_special: 'Vecka 28-31: 08:00-16:00',
    skelleftea_address: 'Företagsvägen 1',
    skelleftea_postal_code: '931 57',
    skelleftea_city: 'Skellefteå',
    skelleftea_phone: '0910-71 12 20',
    skelleftea_email: 'skelleftea@stjarnafyrkant.se',
    skelleftea_hours_weekdays: 'Mån-Tors: 08:00-17:00, Fre: 08:00-16:00',
    skelleftea_hours_day_before_holiday: 'Dag före röd dag: 07:00-15:00',
    skelleftea_hours_special: 'Vecka 28 & 31: 08:00-16:00, Stängt vecka 29 & 30',
    facebook_url: '',
    instagram_url: '',
    linkedin_url: '',
    youtube_url: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/settings')
      if (!response.ok) throw new Error('Failed to fetch settings')
      const data = await response.json()

      // If we got data from the API, use it; otherwise keep defaults
      if (data && Object.keys(data).length > 0) {
        setSettings(data)
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err)
      // Keep default values on error
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save settings')
      }

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const updateField = (field: keyof SiteSettingsType, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Webbplatsinställningar</h2>
            <p className="text-muted-foreground mt-1">
              Hantera företagsinformation, kontor och sociala medier
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Sparar...' : saved ? 'Sparat!' : 'Spara ändringar'}
          </button>
        </div>

        {/* Company Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Företagsinformation</h3>
          </div>

          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Företagsnamn</label>
              <input
                type="text"
                value={settings.company_name}
                onChange={(e) => updateField('company_name', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Beskrivning</label>
              <textarea
                value={settings.company_description}
                onChange={(e) => updateField('company_description', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                rows={3}
              />
            </div>
          </div>
        </motion.div>

        {/* Umeå Office */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold">Kontor: Umeå</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Adress</label>
              <input
                type="text"
                value={settings.umea_address}
                onChange={(e) => updateField('umea_address', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Postnummer</label>
              <input
                type="text"
                value={settings.umea_postal_code}
                onChange={(e) => updateField('umea_postal_code', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Stad</label>
              <input
                type="text"
                value={settings.umea_city}
                onChange={(e) => updateField('umea_city', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Telefon</label>
              <input
                type="tel"
                value={settings.umea_phone}
                onChange={(e) => updateField('umea_phone', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={settings.umea_email}
                onChange={(e) => updateField('umea_email', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              />
            </div>

            <div className="md:col-span-2 border-t pt-4 mt-2">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-primary" />
                <h4 className="font-medium">Öppettider</h4>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-2">Helgfria vardagar</label>
                  <input
                    type="text"
                    value={settings.umea_hours_weekdays}
                    onChange={(e) => updateField('umea_hours_weekdays', e.target.value)}
                    placeholder="Helgfria vardagar: 07:00-17:00"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Dag före röd dag</label>
                  <input
                    type="text"
                    value={settings.umea_hours_day_before_holiday}
                    onChange={(e) => updateField('umea_hours_day_before_holiday', e.target.value)}
                    placeholder="Dag före röd dag: 07:00-15:00"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Särskilda öppettider</label>
                  <input
                    type="text"
                    value={settings.umea_hours_special}
                    onChange={(e) => updateField('umea_hours_special', e.target.value)}
                    placeholder="Vecka 28-31: 08:00-16:00"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skellefteå Office */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-500/10">
              <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold">Kontor: Skellefteå</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Adress</label>
              <input
                type="text"
                value={settings.skelleftea_address}
                onChange={(e) => updateField('skelleftea_address', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Postnummer</label>
              <input
                type="text"
                value={settings.skelleftea_postal_code}
                onChange={(e) => updateField('skelleftea_postal_code', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Stad</label>
              <input
                type="text"
                value={settings.skelleftea_city}
                onChange={(e) => updateField('skelleftea_city', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Telefon</label>
              <input
                type="tel"
                value={settings.skelleftea_phone}
                onChange={(e) => updateField('skelleftea_phone', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={settings.skelleftea_email}
                onChange={(e) => updateField('skelleftea_email', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              />
            </div>

            <div className="md:col-span-2 border-t pt-4 mt-2">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-primary" />
                <h4 className="font-medium">Öppettider</h4>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-2">Helgfria vardagar</label>
                  <input
                    type="text"
                    value={settings.skelleftea_hours_weekdays}
                    onChange={(e) => updateField('skelleftea_hours_weekdays', e.target.value)}
                    placeholder="Mån-Tors: 08:00-17:00, Fre: 08:00-16:00"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Dag före röd dag</label>
                  <input
                    type="text"
                    value={settings.skelleftea_hours_day_before_holiday}
                    onChange={(e) => updateField('skelleftea_hours_day_before_holiday', e.target.value)}
                    placeholder="Dag före röd dag: 07:00-15:00"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Särskilda öppettider</label>
                  <input
                    type="text"
                    value={settings.skelleftea_hours_special}
                    onChange={(e) => updateField('skelleftea_hours_special', e.target.value)}
                    placeholder="Vecka 28 & 31: 08:00-16:00, Stängt vecka 29 & 30"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Facebook className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold">Sociala Medier</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Facebook className="w-4 h-4" />
                Facebook
              </label>
              <input
                type="url"
                value={settings.facebook_url || ''}
                onChange={(e) => updateField('facebook_url', e.target.value)}
                placeholder="https://facebook.com/..."
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Instagram className="w-4 h-4" />
                Instagram
              </label>
              <input
                type="url"
                value={settings.instagram_url || ''}
                onChange={(e) => updateField('instagram_url', e.target.value)}
                placeholder="https://instagram.com/..."
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </label>
              <input
                type="url"
                value={settings.linkedin_url || ''}
                onChange={(e) => updateField('linkedin_url', e.target.value)}
                placeholder="https://linkedin.com/company/..."
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Youtube className="w-4 h-4" />
                YouTube
              </label>
              <input
                type="url"
                value={settings.youtube_url || ''}
                onChange={(e) => updateField('youtube_url', e.target.value)}
                placeholder="https://youtube.com/@..."
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              />
            </div>
          </div>
        </motion.div>

        {/* Save Button Bottom */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50 font-medium"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Sparar...' : saved ? 'Sparat!' : 'Spara alla ändringar'}
          </button>
        </div>
      </div>
    </div>
  )
}
