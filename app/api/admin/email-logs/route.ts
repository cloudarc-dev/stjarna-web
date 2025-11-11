import { NextRequest, NextResponse } from 'next/server'
import { getServiceSupabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const supabase = getServiceSupabase()
    const { searchParams } = new URL(request.url)
    const formType = searchParams.get('form_type')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    let query = supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    // Filter by form type
    if (formType && formType !== 'all') {
      query = query.eq('form_type', formType)
    }

    // Filter by status
    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    // Search by name or email
    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('GET email logs error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch email logs' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status, notes } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Submission ID is required' },
        { status: 400 }
      )
    }

    const supabase = getServiceSupabase()

    const updateData: any = {
      updated_at: new Date().toISOString()
    }

    if (status) updateData.status = status
    if (notes !== undefined) updateData.notes = notes

    if (status === 'contacted') {
      updateData.contacted_at = new Date().toISOString()
    } else if (status === 'closed') {
      updateData.closed_at = new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('contact_submissions')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('PUT email log error:', error)
    return NextResponse.json(
      { error: 'Failed to update email log' },
      { status: 500 }
    )
  }
}
