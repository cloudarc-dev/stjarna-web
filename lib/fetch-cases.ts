// Helper function to fetch case studies from Supabase
import { getAnonSupabase } from './supabase'

export interface SimpleCaseStudy {
  title: string
  description: string
}

export async function fetchCaseStudies(
  filters?: {
    services?: string[]
    featured?: boolean
    limit?: number
  }
): Promise<SimpleCaseStudy[]> {
  try {
    const supabase = getAnonSupabase()
    let query = supabase
      .from('case_studies')
      .select('client_name, summary, services')
      .eq('is_published', true)

    // Filter by featured if specified
    if (filters?.featured !== undefined) {
      query = query.eq('is_featured', filters.featured)
    }

    // Filter by services if specified
    if (filters?.services && filters.services.length > 0) {
      query = query.overlaps('services', filters.services)
    }

    query = query.order('display_order', { ascending: true })

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query

    if (error) throw error

    if (data && data.length > 0) {
      return data.map(c => ({
        title: c.client_name,
        description: c.summary || ''
      }))
    }

    return []
  } catch (err) {
    console.error('Failed to fetch case studies:', err)
    return []
  }
}
