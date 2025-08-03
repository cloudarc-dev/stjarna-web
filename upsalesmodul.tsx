import React from 'react'

interface UpsalesModalProps {
  open: boolean
  onClose: () => void
}

export const UpsalesModal: React.FC<UpsalesModalProps> = ({ open, onClose }) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-transparent">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl"
          aria-label="Stäng"
        >
          ×
        </button>
        <iframe
          src="https://pages.upsales.com/15928u9ea9c25520b24d16b2bf82ab9f1699a5-frame"
          width="360"
          height="660"
          style={{ border: 0 }}
          title="Kontaktformulär"
        />
      </div>
    </div>
  )
}
