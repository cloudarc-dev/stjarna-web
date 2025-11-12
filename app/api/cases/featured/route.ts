import { NextResponse } from 'next/server'
import { getAnonSupabase } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = getAnonSupabase()

    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('is_published', true)
      .eq('is_featured', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error fetching featured cases:', error)
      return NextResponse.json({ error: error.message || 'Failed to fetch featured cases' }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error fetching featured cases:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch featured cases' },
      { status: 500 }
    )
  }
}
