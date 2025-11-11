import { NextRequest, NextResponse } from 'next/server'
import { getServiceSupabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const supabase = getServiceSupabase()
    const { searchParams } = new URL(request.url)
    const folder = searchParams.get('folder')

    // List all files from Supabase Storage bucket
    const { data, error } = await supabase
      .storage
      .from('media')
      .list(folder || '', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' }
      })

    if (error) throw error

    // Get public URLs for each file
    const filesWithUrls = data.map(file => {
      const path = folder ? `${folder}/${file.name}` : file.name
      const { data: { publicUrl } } = supabase
        .storage
        .from('media')
        .getPublicUrl(path)

      return {
        ...file,
        publicUrl
      }
    })

    return NextResponse.json(filesWithUrls)
  } catch (error) {
    console.error('GET media error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch media files' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string || ''

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    const supabase = getServiceSupabase()
    const fileName = `${Date.now()}_${file.name}`
    const filePath = folder ? `${folder}/${fileName}` : fileName

    // Upload file to Supabase Storage
    const { data, error } = await supabase
      .storage
      .from('media')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) throw error

    // Get public URL
    const { data: { publicUrl } } = supabase
      .storage
      .from('media')
      .getPublicUrl(filePath)

    return NextResponse.json({
      path: data.path,
      publicUrl
    })
  } catch (error) {
    console.error('POST media error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const path = searchParams.get('path')

    if (!path) {
      return NextResponse.json(
        { error: 'File path is required' },
        { status: 400 }
      )
    }

    const supabase = getServiceSupabase()

    const { error } = await supabase
      .storage
      .from('media')
      .remove([path])

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE media error:', error)
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    )
  }
}
