# 📋 Formulärsystem (Form System)

Dynamiskt och konfigurerbart formulärsystem för alla CTA:er (Call-to-Actions) på webbplatsen.

## 🎯 Översikt

Systemet består av tre delar:
1. **Konfigurationsfil** - Definierar alla formulär
2. **FormModal-komponent** - Visar formuläret
3. **API-endpoint** - Hanterar submission

## 📁 Filer

```
lib/form-config.ts              # Konfiguration av alla formulär
components/form-modal.tsx       # Modal-komponent
app/api/contact/route.ts        # API för submission
```

## 🔧 Formulärtyper

Alla formulärtyper och deras destinations-email:

| Formulärtyp | Email | Användning |
|-------------|-------|------------|
| `it-support` | servicedesk@stjarnafyrkant.se | IT-support förfrågan |
| `telefoni-support` | servicedesk@stjarnafyrkant.se | Telefonisupport |
| `alkolaas` | verkstad.umea@stjarnafyrkant.se | Alkolås installation |
| `fordon` | verkstad.umea@stjarnafyrkant.se | Fordonsutrustning |
| `komradio` | verkstad.umea@stjarnafyrkant.se | Komradio & kommunikation |
| `service-reparation` | service.umea@stjarnafyrkant.se | Service & reparation |
| `order` | order.vb@stjarnafyrkant.se | Orderförfrågan |
| `foretagstelefoni` | sebastian.bjuhr@stjarnafyrkant.se | Företagstelefoni |
| `projekt` | sebastian.bjuhr@stjarnafyrkant.se | Projektförfrågan |
| `jobbansoekan` | ansokan.vb@stjarnafyrkant.se | Jobbansökan |
| `general` | info@stjarnafyrkant.se | Allmän förfrågan |

## 💻 Användning

### På en sida (t.ex. IT-sidan):

```tsx
"use client"
import { useState } from "react"
import { FormModal } from "@/components/form-modal"
import { ShineButton } from "@/components/ui/shine-button"

export default function ITPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <>
      <FormModal
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        formType="it-support"  // 👈 Välj rätt formulärtyp
      />

      <ShineButton onClick={() => setIsFormOpen(true)}>
        Boka IT-genomgång
      </ShineButton>
    </>
  )
}
```

### Välj rätt formType baserat på kontext:

- `/it` → `it-support`
- `/fordonsteknik` → `fordon`, `alkolaas`, eller `service-reparation`
- `/kommunikationsteknik` → `komradio`
- `/foretagstelefoni` → `foretagstelefoni`
- `/karriar` → `jobbansoekan`
- Projekt-CTA → `projekt`
- Order-CTA → `order`

## ➕ Lägg till nytt formulär

### 1. Lägg till formulärtyp i `lib/form-config.ts`:

```typescript
export type FormType =
  | 'it-support'
  | 'my-new-form'  // 👈 Lägg till här
  // ...

export const formConfigs: Record<FormType, FormConfig> = {
  // ...
  'my-new-form': {
    type: 'my-new-form',
    email: 'destination@stjarnafyrkant.se',
    subject: 'Ny förfrågan typ',
    title: 'Min Nya Tjänst',
    description: 'Beskriv vad formuläret gör',
    fields: [
      {
        name: 'name',
        label: 'Namn',
        type: 'text',
        required: true,
        placeholder: 'Ditt namn'
      },
      {
        name: 'email',
        label: 'E-post',
        type: 'email',
        required: true,
        placeholder: 'din@email.se'
      },
      {
        name: 'message',
        label: 'Meddelande',
        type: 'textarea',
        required: true,
        placeholder: 'Ditt meddelande...'
      },
    ],
  },
}
```

### 2. Använd det nya formuläret:

```tsx
<FormModal formType="my-new-form" ... />
```

## 🎨 Fälttyper

| Type | Beskrivning | Exempel |
|------|-------------|---------|
| `text` | Enkel textinput | Namn, Företag |
| `email` | Email-validerad input | E-postadress |
| `tel` | Telefonnummer | 070-123 45 67 |
| `textarea` | Multiline text | Meddelande, Beskrivning |
| `select` | Dropdown-meny | Välj tjänst, Kategori |

### Select-fält exempel:

```typescript
{
  name: 'service',
  label: 'Typ av tjänst',
  type: 'select',
  required: true,
  options: ['Val 1', 'Val 2', 'Val 3']
}
```

## 🔄 Dataflöde

```
1. Användare klickar CTA-knapp
   ↓
2. FormModal öppnas med rätt formType
   ↓
3. Användare fyller i formulär
   ↓
4. Submit → POST /api/contact
   ↓
5. API validerar & skickar email
   ↓
6. Success-meddelande visas
```

## 📧 Email-integration

### Nuvarande: Console Log (Development)

```typescript
// app/api/contact/route.ts
console.log('To:', config.email)
console.log('Subject:', config.subject)
console.log('Content:', emailContent)
```

### Framtida: Riktig mailserver

Ersätt TODO-kommentaren med faktisk mail-service:

```typescript
// Exempel med Resend
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'noreply@stjarnafyrkant.se',
  to: config.email,
  subject: config.subject,
  text: emailContent,
})
```

Alternativ:
- **Resend** (rekommenderat)
- **SendGrid**
- **AWS SES**
- **Postmark**

## 🔐 Säkerhet

### Validering
- ✅ Required fields valideras både client & server-side
- ✅ Email-format valideras
- ✅ Rate limiting (TODO)

### GDPR
- ✅ Integritetspolicy-länk i formuläret
- ✅ Data skickas inte till tredje part
- ⚠️ TODO: Spara submissions i databas med consent

## 🐛 Felsökning

### Formuläret öppnas inte
```tsx
// Kontrollera att state är korrekt
const [isFormOpen, setIsFormOpen] = useState(false)
console.log('Form open:', isFormOpen)
```

### Email kommer inte fram
```bash
# Kolla API-loggar
npm run dev
# Titta i terminalen efter "=== EMAIL TO SEND ==="
```

### Fel formType
```typescript
// Kontrollera att formType finns i form-config.ts
type FormType = 'it-support' | 'fordon' | ...
```

## 🚀 Framtida förbättringar

- [ ] Admin-panel för att redigera formulär
- [ ] File upload (CV, bifogade filer)
- [ ] Multi-step forms
- [ ] Automatiska svar (auto-reply)
- [ ] Spam-skydd (reCAPTCHA)
- [ ] Analytics (formulär-conversions)
- [ ] A/B testing av formulärfält

## 📞 Support

**Tekniska frågor**: Din utvecklare
**Email-routing frågor**: sebastian.bjuhr@stjarnafyrkant.se

---

Senast uppdaterad: 2025-10-29
