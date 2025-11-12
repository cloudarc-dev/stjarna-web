import { NextResponse } from 'next/server'
import { getAnonSupabase } from '@/lib/supabase'

/**
 * GET /api/settings
 * Fetch site settings (public endpoint - read-only)
 */
export async function GET() {
  try {
    const supabase = getAnonSupabase()

    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .single()

    if (error) {
      console.error('Supabase error fetching settings:', error)
      return NextResponse.json({ error: error.message || 'Failed to fetch settings' }, { status: 500 })
    }

    return NextResponse.json(data || {})
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}
