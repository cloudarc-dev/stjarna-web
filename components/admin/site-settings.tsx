"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Save, Building2, MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Youtube } from "lucide-react"

interface SiteSettings {
  company: {
    name: string
    org_number: string
    description: string
  }
  offices: {
    umea: OfficeInfo
    skelleftea: OfficeInfo
  }
  social_media: {
    facebook: string
    instagram: string
    linkedin: string
    youtube: string
  }
}

interface OfficeInfo {
  name: string
  address: string
  postal_code: string
  city: string
  phone: string
  email: string
  hours: string
}

export function SiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>({
    company: {
      name: 'StjärnaFyrkant Västerbotten',
      org_number: '556224-5232',
      description: 'IT-tjänster, Fordonsteknik, Kommunikationsteknik och Företagstelefoni'
    },
    offices: {
      umea: {
        name: 'Umeå',
        address: 'Förrådsvägen 15',
        postal_code: '901 32',
        city: 'Umeå',
        phone: '090-70 44 70',
        email: 'umea@stjarnafyrkant.se',
        hours: 'Mån-Fre 07:00-17:00'
      },
      skelleftea: {
        name: 'Skellefteå',
        address: 'Klockarvägen 4',
        postal_code: '931 36',
        city: 'Skellefteå',
        phone: '0910-71 25 25',
        email: 'skelleftea@stjarnafyrkant.se',
        hours: 'Mån-Fre 07:00-17:00'
      }
    },
    social_media: {
      facebook: '',
      instagram: '',
      linkedin: '',
      youtube: ''
    }
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
      setSettings(data)
    } catch (err) {
      console.error(err)
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

      if (!response.ok) throw new Error('Failed to save settings')

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const updateCompany = (field: keyof SiteSettings['company'], value: string) => {
    setSettings(prev => ({
      ...prev,
      company: { ...prev.company, [field]: value }
    }))
  }

  const updateOffice = (office: 'umea' | 'skelleftea', field: keyof OfficeInfo, value: string) => {
    setSettings(prev => ({
      ...prev,
      offices: {
        ...prev.offices,
        [office]: { ...prev.offices[office], [field]: value }
      }
    }))
  }

  const updateSocialMedia = (field: keyof SiteSettings['social_media'], value: string) => {
    setSettings(prev => ({
      ...prev,
      social_media: { ...prev.social_media, [field]: value }
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

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Företagsnamn</label>
            <input
              type="text"
              value={settings.company.name}
              onChange={(e) => updateCompany('name', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Organisationsnummer</label>
            <input
              type="text"
              value={settings.company.org_number}
              onChange={(e) => updateCompany('org_number', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Beskrivning</label>
            <textarea
              value={settings.company.description}
              onChange={(e) => updateCompany('description', e.target.value)}
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
              value={settings.offices.umea.address}
              onChange={(e) => updateOffice('umea', 'address', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Postnummer</label>
            <input
              type="text"
              value={settings.offices.umea.postal_code}
              onChange={(e) => updateOffice('umea', 'postal_code', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Stad</label>
            <input
              type="text"
              value={settings.offices.umea.city}
              onChange={(e) => updateOffice('umea', 'city', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Telefon</label>
            <input
              type="tel"
              value={settings.offices.umea.phone}
              onChange={(e) => updateOffice('umea', 'phone', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={settings.offices.umea.email}
              onChange={(e) => updateOffice('umea', 'email', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Öppettider</label>
            <input
              type="text"
              value={settings.offices.umea.hours}
              onChange={(e) => updateOffice('umea', 'hours', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background"
            />
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
              value={settings.offices.skelleftea.address}
              onChange={(e) => updateOffice('skelleftea', 'address', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Postnummer</label>
            <input
              type="text"
              value={settings.offices.skelleftea.postal_code}
              onChange={(e) => updateOffice('skelleftea', 'postal_code', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Stad</label>
            <input
              type="text"
              value={settings.offices.skelleftea.city}
              onChange={(e) => updateOffice('skelleftea', 'city', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Telefon</label>
            <input
              type="tel"
              value={settings.offices.skelleftea.phone}
              onChange={(e) => updateOffice('skelleftea', 'phone', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={settings.offices.skelleftea.email}
              onChange={(e) => updateOffice('skelleftea', 'email', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Öppettider</label>
            <input
              type="text"
              value={settings.offices.skelleftea.hours}
              onChange={(e) => updateOffice('skelleftea', 'hours', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background"
            />
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
              value={settings.social_media.facebook}
              onChange={(e) => updateSocialMedia('facebook', e.target.value)}
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
              value={settings.social_media.instagram}
              onChange={(e) => updateSocialMedia('instagram', e.target.value)}
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
              value={settings.social_media.linkedin}
              onChange={(e) => updateSocialMedia('linkedin', e.target.value)}
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
              value={settings.social_media.youtube}
              onChange={(e) => updateSocialMedia('youtube', e.target.value)}
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
