import { NextRequest, NextResponse } from 'next/server'
import { getAnonSupabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { service: string } }
) {
  try {
    const { service } = params
    const supabase = getAnonSupabase()

    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('is_published', true)
      .eq('publish_on', service)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error fetching cases:', error)
      return NextResponse.json({ error: error.message || 'Failed to fetch cases' }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error fetching cases:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch cases' },
      { status: 500 }
    )
  }
}
