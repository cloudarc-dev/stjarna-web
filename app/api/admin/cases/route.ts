import { NextRequest, NextResponse } from 'next/server'
import { getServiceSupabase, type CaseStudy } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = getServiceSupabase()
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) throw error
    return NextResponse.json(data || [])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cases' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const caseStudy: CaseStudy = await request.json()
    if (!caseStudy.client_name || !caseStudy.project_title) {
      return NextResponse.json({ error: 'Client name and project title required' }, { status: 400 })
    }

    const supabase = getServiceSupabase()
    const { data, error } = await supabase
      .from('case_studies')
      .insert(caseStudy)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create case' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const caseStudy: CaseStudy = await request.json()
    if (!caseStudy.id) {
      return NextResponse.json({ error: 'Case ID required' }, { status: 400 })
    }

    const supabase = getServiceSupabase()
    const { data, error } = await supabase
      .from('case_studies')
      .update(caseStudy)
      .eq('id', caseStudy.id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update case' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Case ID required' }, { status: 400 })
    }

    const supabase = getServiceSupabase()
    const { error } = await supabase.from('case_studies').delete().eq('id', id)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete case' }, { status: 500 })
  }
}
