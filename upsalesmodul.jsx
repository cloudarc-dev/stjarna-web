import React from 'react'

export default function UpsalesModal({ open, onClose }) {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal-innehåll */}
    </div>
  );
}
