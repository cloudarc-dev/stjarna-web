import { NextRequest, NextResponse } from 'next/server'
import { getServiceSupabase, type JobPosting2 } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = getServiceSupabase()
    const { data, error } = await supabase
      .from('job_postings')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error fetching jobs:', error)
      return NextResponse.json({ error: error.message || 'Failed to fetch jobs' }, { status: 500 })
    }
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to fetch jobs' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const job: JobPosting2 = await request.json()
    if (!job.title || !job.description) {
      return NextResponse.json({ error: 'Title and description required' }, { status: 400 })
    }

    const supabase = getServiceSupabase()
    const { data, error } = await supabase
      .from('job_postings')
      .insert(job)
      .select()
      .single()

    if (error) {
      console.error('Supabase error creating job:', error)
      return NextResponse.json({ error: error.message || 'Failed to create job' }, { status: 500 })
    }
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error creating job:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to create job' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const job: JobPosting2 = await request.json()
    if (!job.id) {
      return NextResponse.json({ error: 'Job ID required' }, { status: 400 })
    }

    const supabase = getServiceSupabase()
    const { data, error } = await supabase
      .from('job_postings')
      .update(job)
      .eq('id', job.id)
      .select()
      .single()

    if (error) {
      console.error('Supabase error updating job:', error)
      return NextResponse.json({ error: error.message || 'Failed to update job' }, { status: 500 })
    }
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating job:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to update job' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Job ID required' }, { status: 400 })
    }

    const supabase = getServiceSupabase()
    const { error } = await supabase.from('job_postings').delete().eq('id', id)

    if (error) {
      console.error('Supabase error deleting job:', error)
      return NextResponse.json({ error: error.message || 'Failed to delete job' }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting job:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to delete job' }, { status: 500 })
  }
}
