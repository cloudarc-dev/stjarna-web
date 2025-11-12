import { NextRequest, NextResponse } from 'next/server'
import { getServiceSupabase, type SiteSettings } from '@/lib/supabase'

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
        company_name: 'StjärnaFyrkant Västerbotten',
        company_description: 'IT-tjänster, Fordonsteknik, Kommunikationsteknik och Företagstelefoni',
        umea_address: 'Förrådsvägen 15',
        umea_postal_code: '901 32',
        umea_city: 'Umeå',
        umea_phone: '090-70 44 70',
        umea_email: 'umea@stjarnafyrkant.se',
        umea_hours_weekdays: 'Helgfria vardagar: 07:00-17:00',
        umea_hours_day_before_holiday: 'Dag före röd dag: 07:00-15:00',
        umea_hours_special: '',
        skelleftea_address: 'Klockarvägen 4',
        skelleftea_postal_code: '931 36',
        skelleftea_city: 'Skellefteå',
        skelleftea_phone: '0910-71 25 25',
        skelleftea_email: 'skelleftea@stjarnafyrkant.se',
        skelleftea_hours_weekdays: 'Helgfria vardagar: 07:00-17:00',
        skelleftea_hours_day_before_holiday: 'Dag före röd dag: 07:00-15:00',
        skelleftea_hours_special: '',
        facebook_url: '',
        instagram_url: '',
        linkedin_url: '',
        youtube_url: ''
      })
    }

    return NextResponse.json(data)
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
    const body: SiteSettings = await request.json()
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
          ...body,
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
          ...body,
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
