"use client"
import { motion } from "framer-motion"
import { FileText, Code, ExternalLink } from "lucide-react"

export default function FormularPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Formulärhanterare</h2>
        <p className="text-muted-foreground mt-1">
          Hantera och konfigurera formulär på webbplatsen
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-xl p-8 text-center"
      >
        <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-xl font-bold mb-2">Under utveckling</h3>
        <p className="text-muted-foreground mb-6">
          Formulärhanteringsfunktionen är under utveckling. För närvarande kan du:
        </p>
        <div className="space-y-3 max-w-md mx-auto">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-accent">
            <Code className="w-5 h-5 text-primary" />
            <p className="text-sm text-left">
              Redigera formulär direkt i koden under <code>/components/forms/</code>
            </p>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-accent">
            <ExternalLink className="w-5 h-5 text-primary" />
            <p className="text-sm text-left">
              Se alla inkomna förfrågningar under "Kontaktförfrågningar"
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h4 className="font-semibold mb-3">Befintliga formulär</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Kontaktformulär (Aktiv)
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Offertförfrågan (Aktiv)
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Supportformulär (Aktiv)
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Jobbansökan (Aktiv)
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h4 className="font-semibold mb-3">Planerade funktioner</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-400" />
              Visuell formulärredigerare
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-400" />
              Formulärmallar
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-400" />
              Villkorlig logik
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-400" />
              Email-notifikationer
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
