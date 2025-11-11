import { NextResponse } from 'next/server'
import { getAnonSupabase } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = getAnonSupabase()
    const { data, error } = await supabase
      .from('job_postings')
      .select('*')
      .eq('is_active', true)
      .order('is_featured', { ascending: false })
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error fetching public jobs:', error)
      return NextResponse.json({ error: error.message || 'Failed to fetch jobs' }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error fetching public jobs:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to fetch jobs' }, { status: 500 })
  }
}
