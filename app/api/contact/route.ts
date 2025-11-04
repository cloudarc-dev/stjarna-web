import { NextRequest, NextResponse } from 'next/server'
import { getFormConfig, FormType } from '@/lib/form-config'
import { getServiceSupabase, type ContactSubmission } from '@/lib/supabase'
import { Resend } from 'resend'

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
    const htmlContent = buildHtmlEmailContent(config, data)

    // Send email via Resend
    const resend = new Resend(process.env.RESEND_API_KEY)

    try {
      const emailResult = await resend.emails.send({
        from: 'StjärnaFyrkant Västerbotten <noreply@stjarnafyrkant.se>',
        to: config.email,
        subject: config.subject,
        text: emailContent,
        html: htmlContent,
        replyTo: data.email,
      })

      if (emailResult.data) {
        console.log('✅ Email sent successfully:', emailResult.data.id)
      } else if (emailResult.error) {
        console.error('❌ Email sending failed:', emailResult.error)
      }
    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError)
      // Don't fail the request - data is already saved to database
      // The team can follow up from the database even if email fails
    }

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

function buildHtmlEmailContent(
  config: ReturnType<typeof getFormConfig>,
  data: Record<string, string>
): string {
  const rows = config.fields
    .map((field) => {
      const value = data[field.name] || 'Ej angivet'
      return `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">${field.label}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${value.replace(/\n/g, '<br>')}</td>
        </tr>
      `
    })
    .join('')

  return `
    <!DOCTYPE html>
    <html lang="sv">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${config.subject}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 32px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">StjärnaFyrkant Västerbotten</h1>
                  <p style="margin: 8px 0 0 0; color: #dbeafe; font-size: 16px;">${config.title}</p>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 32px;">
                  <p style="margin: 0 0 24px 0; color: #374151; font-size: 16px;">
                    Ny förfrågan mottagen via webbplatsen:
                  </p>

                  <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden;">
                    ${rows}
                  </table>

                  <p style="margin: 24px 0 0 0; padding-top: 24px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
                    För att svara kunden, klicka på "Svara" i ditt e-postprogram eller skicka till: <a href="mailto:${data.email}" style="color: #3b82f6; text-decoration: none;">${data.email}</a>
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
                  <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                    Skickat via stjarnafyrkant.se kontaktformulär<br>
                    Detta mail är automatiskt genererat - svara inte på detta mail utan på kundens e-postadress ovan.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}
