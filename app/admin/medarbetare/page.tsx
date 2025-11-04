"use client"
import { EmployeeManager } from "@/components/admin/employee-manager"

export default function EmployeesAdminPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <EmployeeManager />
      </div>
    </div>
  )
}
