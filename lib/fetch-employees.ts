import { getAnonSupabase, type Employee } from './supabase'

export interface DepartmentGroup {
  name: string
  members: Employee[]
}

/**
 * Fetch employees from Supabase and group them by department
 * Returns data in the format needed by the Om Oss page
 */
export async function fetchEmployees(): Promise<DepartmentGroup[]> {
  try {
    const supabase = getAnonSupabase()
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .eq('is_visible', true)
      .order('display_order', { ascending: true })

    if (error) throw error

    if (data && data.length > 0) {
      // Group employees by department
      const departmentMap = new Map<string, Employee[]>()

      data.forEach(emp => {
        const dept = emp.department || 'Övrigt'

        if (!departmentMap.has(dept)) {
          departmentMap.set(dept, [])
        }
        departmentMap.get(dept)!.push(emp as Employee)
      })

      // Convert map to array format
      const departments: DepartmentGroup[] = []
      departmentMap.forEach((members, name) => {
        departments.push({ name, members })
      })

      return departments
    }

    return []
  } catch (err) {
    console.error('Failed to fetch employees:', err)
    return []
  }
}
