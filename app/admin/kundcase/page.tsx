"use client"
import { CaseManager } from "@/components/admin/case-manager"

export default function CasesAdminPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <CaseManager />
      </div>
    </div>
  )
}
