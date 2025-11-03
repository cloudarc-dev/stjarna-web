import { NextRequest, NextResponse } from 'next/server'
import { getFormConfig, FormType } from '@/lib/form-config'
import { getServiceSupabase, type ContactSubmission } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { formType, data } = body as {
      formType: FormType
      data: Record<string, string>
    }

    // Get form configuration
    const config = getFormConfig(formType)

    // Validate required fields
    const missingFields = config.fields
      .filter((field) => field.required && !data[field.name])
      .map((field) => field.label)

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Saknade obligatoriska fält: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // Extract UTM parameters from referrer if available
    const referrer = request.headers.get('referer') || ''
    const utmParams = extractUtmParams(referrer)

    // Save to Supabase database
    const supabase = getServiceSupabase()
    const submissionData: ContactSubmission = {
      form_type: formType,
      form_title: config.title,
      name: data.namn || data.name,
      email: data.email,
      phone: data.telefon || data.phone,
      company: data.foretag || data.company,
      message: data.meddelande || data.message,
      form_data: data,
      status: 'new',
      ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      user_agent: request.headers.get('user-agent') || undefined,
      referrer: referrer || undefined,
      utm_source: utmParams.source,
      utm_medium: utmParams.medium,
      utm_campaign: utmParams.campaign,
    }

    const { data: submission, error: dbError } = await supabase
      .from('contact_submissions')
      .insert(submissionData)
      .select()
      .single()

    if (dbError) {
      console.error('❌ Supabase insert error:', dbError)
      // Continue anyway - we still want to send the email
    } else {
      console.log('✅ Contact submission saved to database:', submission?.id)
    }

    // Build email content
    const emailContent = buildEmailContent(config, data)

    // ⚠️ TODO: IMPLEMENT EMAIL SENDING WITH RESEND
    //
    // Formulären fungerar och sparar nu i databasen!
    // Men mailen skickas inte på riktigt ännu - de loggas bara här nedan.
    //
    // 📧 Nästa steg: Implementera Resend
    //
    // Snabbstart:
    // 1. Skapa konto på Resend.com (gratis)
    // 2. Få API-nyckel
    // 3. npm install resend
    // 4. Ersätt denna sektion med Resend-kod
    //
    console.log('=== EMAIL TO SEND ===')
    console.log('To:', config.email)
    console.log('Subject:', config.subject)
    console.log('Content:', emailContent)
    console.log('====================')

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      message: 'Meddelandet har skickats',
      email: config.email,
      submissionId: submission?.id,
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Ett fel uppstod vid skickande av meddelande' },
      { status: 500 }
    )
  }
}

/**
 * Extract UTM parameters from URL
 */
function extractUtmParams(url: string): {
  source?: string
  medium?: string
  campaign?: string
} {
  try {
    const urlObj = new URL(url)
    return {
      source: urlObj.searchParams.get('utm_source') || undefined,
      medium: urlObj.searchParams.get('utm_medium') || undefined,
      campaign: urlObj.searchParams.get('utm_campaign') || undefined,
    }
  } catch {
    return {}
  }
}

function buildEmailContent(
  config: ReturnType<typeof getFormConfig>,
  data: Record<string, string>
): string {
  let content = `Ny förfrågan: ${config.title}\n\n`

  config.fields.forEach((field) => {
    const value = data[field.name] || 'Ej angivet'
    content += `${field.label}: ${value}\n`
  })

  content += `\n---\nSkickat via ${config.title} formulär på stjarnafyrkant.se`

  return content
}
