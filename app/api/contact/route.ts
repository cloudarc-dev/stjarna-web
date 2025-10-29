import { NextRequest, NextResponse } from 'next/server'
import { getFormConfig, FormType } from '@/lib/form-config'

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

    // Build email content
    const emailContent = buildEmailContent(config, data)

    // TODO: Implement actual email sending
    // For now, we'll log to console and return success
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
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Ett fel uppstod vid skickande av meddelande' },
      { status: 500 }
    )
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
