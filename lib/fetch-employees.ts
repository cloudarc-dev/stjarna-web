import { getAnonSupabase } from './supabase'

export interface SimpleEmployee {
  name: string
  title: string
  department?: string
}

export interface DepartmentGroup {
  name: string
  members: string[]
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
      .select('name, title, department')
      .eq('is_visible', true)
      .order('display_order', { ascending: true })

    if (error) throw error

    if (data && data.length > 0) {
      // Group employees by department
      const departmentMap = new Map<string, string[]>()

      data.forEach(emp => {
        const dept = emp.department || 'Övrigt'
        const memberString = `${emp.name} - ${emp.title}`

        if (!departmentMap.has(dept)) {
          departmentMap.set(dept, [])
        }
        departmentMap.get(dept)!.push(memberString)
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
