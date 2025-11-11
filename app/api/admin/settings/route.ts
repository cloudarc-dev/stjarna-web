import { NextRequest, NextResponse } from 'next/server'
import { getServiceSupabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const supabase = getServiceSupabase()

    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .single()

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows returned
      throw error
    }

    // Return default settings if none exist
    if (!data) {
      return NextResponse.json({
        company: {
          name: 'StjärnaFyrkant Västerbotten',
          org_number: '556224-5232',
          description: 'IT-tjänster, Fordonsteknik, Kommunikationsteknik och Företagstelefoni'
        },
        offices: {
          umea: {
            name: 'Umeå',
            address: 'Förrådsvägen 15',
            postal_code: '901 32',
            city: 'Umeå',
            phone: '090-70 44 70',
            email: 'umea@stjarnafyrkant.se',
            hours: 'Mån-Fre 07:00-17:00'
          },
          skelleftea: {
            name: 'Skellefteå',
            address: 'Klockarvägen 4',
            postal_code: '931 36',
            city: 'Skellefteå',
            phone: '0910-71 25 25',
            email: 'skelleftea@stjarnafyrkant.se',
            hours: 'Mån-Fre 07:00-17:00'
          }
        },
        social_media: {
          facebook: '',
          instagram: '',
          linkedin: '',
          youtube: ''
        }
      })
    }

    return NextResponse.json(data.settings || data)
  } catch (error) {
    console.error('GET settings error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = getServiceSupabase()

    // Check if settings exist
    const { data: existing } = await supabase
      .from('site_settings')
      .select('id')
      .single()

    let result

    if (existing) {
      // Update existing settings
      result = await supabase
        .from('site_settings')
        .update({
          settings: body,
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id)
        .select()
        .single()
    } else {
      // Create new settings
      result = await supabase
        .from('site_settings')
        .insert({
          settings: body,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single()
    }

    if (result.error) throw result.error

    return NextResponse.json(result.data)
  } catch (error) {
    console.error('PUT settings error:', error)
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    )
  }
}
