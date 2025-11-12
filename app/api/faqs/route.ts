import { NextRequest, NextResponse } from 'next/server'
import { getAnonSupabase } from '@/lib/supabase'

/**
 * GET /api/faqs?service=it
 * Fetch FAQs for a specific service (public endpoint - read-only)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const service = searchParams.get('service')

    if (!service) {
      return NextResponse.json({ error: 'Service parameter is required' }, { status: 400 })
    }

    const supabase = getAnonSupabase()

    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('service', service)
      .eq('is_active', true)
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Supabase error fetching FAQs:', error)
      return NextResponse.json({ error: error.message || 'Failed to fetch FAQs' }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch FAQs' },
      { status: 500 }
    )
  }
}
