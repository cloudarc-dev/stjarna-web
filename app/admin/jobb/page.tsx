"use client"
import { JobManager } from "@/components/admin/job-manager"

export default function JobsAdminPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <JobManager />
      </div>
    </div>
  )
}
