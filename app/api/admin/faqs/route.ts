import { NextRequest, NextResponse } from 'next/server'
import { getServiceSupabase, type FAQ } from '@/lib/supabase'

/**
 * GET /api/admin/faqs
 * Fetch all FAQs (admin endpoint)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const service = searchParams.get('service')

    const supabase = getServiceSupabase()

    let query = supabase
      .from('faqs')
      .select('*')
      .order('service', { ascending: true })
      .order('order_index', { ascending: true })

    if (service) {
      query = query.eq('service', service)
    }

    const { data, error } = await query

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

/**
 * POST /api/admin/faqs
 * Create a new FAQ
 */
export async function POST(request: NextRequest) {
  try {
    const faq: FAQ = await request.json()

    if (!faq.question || !faq.answer || !faq.service) {
      return NextResponse.json({ error: 'Question, answer, and service are required' }, { status: 400 })
    }

    const supabase = getServiceSupabase()

    const { data, error } = await supabase
      .from('faqs')
      .insert({
        question: faq.question,
        answer: faq.answer,
        service: faq.service,
        order_index: faq.order_index || 0,
        is_active: faq.is_active !== undefined ? faq.is_active : true,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: error.message || 'Failed to create FAQ' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('POST error:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to create FAQ' }, { status: 500 })
  }
}

/**
 * PUT /api/admin/faqs
 * Update an existing FAQ
 */
export async function PUT(request: NextRequest) {
  try {
    const faq: FAQ = await request.json()

    if (!faq.id) {
      return NextResponse.json({ error: 'FAQ ID required' }, { status: 400 })
    }

    const supabase = getServiceSupabase()

    const { id, created_at, updated_at, ...faqData } = faq

    const { data, error } = await supabase
      .from('faqs')
      .update({
        ...faqData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase update error:', error)
      return NextResponse.json({ error: error.message || 'Failed to update FAQ' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('PUT error:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to update FAQ' }, { status: 500 })
  }
}

/**
 * DELETE /api/admin/faqs?id=xxx
 * Delete a FAQ
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'FAQ ID required' }, { status: 400 })
    }

    const supabase = getServiceSupabase()

    const { error } = await supabase.from('faqs').delete().eq('id', id)

    if (error) {
      console.error('Supabase delete error:', error)
      return NextResponse.json({ error: error.message || 'Failed to delete FAQ' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 })
  }
}
