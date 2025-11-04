# 🔗 Komponenter → Databas Kartering

## Översikt

Detta dokument visar **exakt hur formulärkomponenterna är kopplade till Supabase-databasen** i projektet.

**Centrala filer:**
- **[components/form-modal.tsx](components/form-modal.tsx)** - Återanvändbar modal-komponent
- **[app/kontakt/page.tsx](app/kontakt/page.tsx)** - Dedikerad kontaktsida med inline-formulär
- **[app/api/contact/route.ts](app/api/contact/route.ts)** - API endpoint som sparar till Supabase
- **[lib/form-config.ts](lib/form-config.ts)** - Formulärkonfigurationer
- **[lib/supabase.ts](lib/supabase.ts)** - Supabase klient och TypeScript typer

---

## 📊 Databaskoppling - Så fungerar det

```
Formulärkomponent (React)
         ↓
    fetch('/api/contact', { formType, data })
         ↓
API Route (app/api/contact/route.ts)
         ↓
    getServiceSupabase()  ← lib/supabase.ts
         ↓
Supabase Database (contact_submissions tabell)
```

**Viktigt:**
- ✅ **Alla formulär** sparar automatiskt till Supabase `contact_submissions` tabell
- ✅ **Samma API endpoint** (`/api/contact`) används av alla formulär
- ✅ **formType** bestämmer vilket email som får meddelandet och hur data sparas
- ✅ **form_data** kolumnen (JSONB) innehåller all formulärdata för flexibilitet

---

## 🗂️ Formulärkomponenter - Översikt

### 1. **FormModal Komponent** (Återanvändbar)

**Fil:** [components/form-modal.tsx](components/form-modal.tsx)

**Hur den fungerar:**
```tsx
// Används på flera sidor med olika formTypes
<FormModal
  open={isFormOpen}
  onClose={() => setIsFormOpen(false)}
  formType="it-support"  // Dynamisk formType
/>
```

**API-anrop i komponenten (rad 31-40):**
```typescript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    formType,      // ← Skickas till API
    email: config.email,
    subject: config.subject,
    data: formData,
  }),
})
```

**Databaskoppling:**
- ✅ Skickar till `/api/contact` endpoint
- ✅ API sparar till `contact_submissions` tabell
- ✅ Använder `getServiceSupabase()` för full databasåtkomst

---

### 2. **Kontaktsida - Inline Formulär**

**Fil:** [app/kontakt/page.tsx](app/kontakt/page.tsx)

**FormType:** `general`

**Hur den fungerar:**
```tsx
// Kontaktsidan har ett dedikerat inline-formulär (inte modal)
const config = getFormConfig('general')

const handleSubmit = async (e: React.FormEvent) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify({
      formType: 'general',  // ← Fast formType
      data: formData,
    }),
  })
}
```

**Databaskoppling:**
- ✅ Samma API endpoint: `/api/contact`
- ✅ Sparas i `contact_submissions` med `form_type = 'general'`
- ✅ Email skickas till: `order.vb@stjarnafyrkant.se`

---

## 📍 Sidor som använder FormModal

| Sida | FormType | Email Destination | Databas form_type |
|------|----------|-------------------|-------------------|
| [/it](app/it/page.tsx) | `it-support` | servicedesk@stjarnafyrkant.se | `it-support` |
| [/fordonsteknik](app/fordonsteknik/page.tsx) | `alkolaas`, `fordon` | verkstad.umea@stjarnafyrkant.se | `alkolaas` / `fordon` |
| [/kommunikationsteknik](app/kommunikationsteknik/page.tsx) | `komradio` | verkstad.umea@stjarnafyrkant.se | `komradio` |
| [/foretagstelefoni](app/foretagstelefoni/page.tsx) | `foretagstelefoni` | sebastian.bjuhr@stjarnafyrkant.se | `foretagstelefoni` |
| [/karriar](app/karriar/page.tsx) | `jobbansoekan` | ansokan.vb@stjarnafyrkant.se | `jobbansoekan` |
| [/servicedesk](app/servicedesk/page.tsx) | `telefoni-support` | servicedesk@stjarnafyrkant.se | `telefoni-support` |
| [/kontakt](app/kontakt/page.tsx) | `general` (inline) | order.vb@stjarnafyrkant.se | `general` |

**Obs:** Vissa sidor (som Fordonsteknik) använder **flera formTypes** genom att ändra `currentFormType` state.

---

## 🔍 Exempel: Formulär på IT-sidan

**Steg-för-steg:**

### **1. Användaren fyller i formuläret på /it**
```tsx
// app/it/page.tsx (rad 110)
<FormModal
  open={isFormOpen}
  onClose={() => setIsFormOpen(false)}
  formType="it-support"
/>
```

### **2. FormModal skickar data till API**
```typescript
// components/form-modal.tsx (rad 31-40)
fetch('/api/contact', {
  method: 'POST',
  body: JSON.stringify({
    formType: 'it-support',
    data: {
      namn: "Anna Andersson",
      foretag: "Acme AB",
      email: "anna@acme.se",
      telefon: "070-123 45 67",
      meddelande: "Vår server är nere"
    }
  })
})
```

### **3. API Route tar emot och sparar**
```typescript
// app/api/contact/route.ts (rad 14)
const config = getFormConfig('it-support')
// → config.email = 'servicedesk@stjarnafyrkant.se'
// → config.subject = 'IT-support förfrågan'

// (rad 34-49) Bygg submission data
const submissionData: ContactSubmission = {
  form_type: 'it-support',
  form_title: 'IT-support',
  name: 'Anna Andersson',
  email: 'anna@acme.se',
  phone: '070-123 45 67',
  company: 'Acme AB',
  message: 'Vår server är nere',
  form_data: { /* all form data as JSON */ },
  status: 'new',
  ip_address: '192.168.1.1',
  user_agent: 'Mozilla/5.0...',
  // ... UTM params etc
}

// (rad 52-56) Spara till Supabase
const { data: submission, error: dbError } = await supabase
  .from('contact_submissions')
  .insert(submissionData)
  .select()
  .single()
```

### **4. Data sparas i Supabase**

**Tabell:** `contact_submissions`

**Exempel-rad:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2025-11-04T10:30:00Z",
  "form_type": "it-support",
  "form_title": "IT-support",
  "name": "Anna Andersson",
  "email": "anna@acme.se",
  "phone": "070-123 45 67",
  "company": "Acme AB",
  "message": "Vår server är nere",
  "form_data": {
    "namn": "Anna Andersson",
    "foretag": "Acme AB",
    "email": "anna@acme.se",
    "telefon": "070-123 45 67",
    "meddelande": "Vår server är nere"
  },
  "status": "new",
  "ip_address": "192.168.1.1",
  "user_agent": "Mozilla/5.0...",
  "utm_source": null,
  "utm_medium": null,
  "utm_campaign": null
}
```

### **5. Email skickas (TODO: Implementera Resend)**
```typescript
// app/api/contact/route.ts (rad 80-84)
console.log('To:', 'servicedesk@stjarnafyrkant.se')  // eller 'order.vb@' för general
console.log('Subject:', 'IT-support förfrågan')
console.log('Content:', emailContent)
```

---

## 🔐 Säkerhet & Best Practices

### **1. Service Role används i API Route**
```typescript
// lib/supabase.ts - getServiceSupabase()
// ⚠️ ENDAST för server-side (API routes)
// Har full databasåtkomst, INTE för klient-kod
```

### **2. Client-side komponenter är säkra**
```typescript
// FormModal och kontakt-sidan skickar ENDAST till /api/contact
// De har INTE direkt access till Supabase Service Role
```

### **3. Environment Variables**
```bash
# Server-side only (API routes)
SUPABASE_SERVICE_ROLE_KEY=xxx  # ⚠️ Full access

# Client-side safe
NEXT_PUBLIC_SUPABASE_URL=xxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx  # ✅ RLS protected
```

---

## 📊 Hämta data från databasen

### **Alla IT-support förfrågningar:**
```typescript
import { getServiceSupabase } from '@/lib/supabase'

const supabase = getServiceSupabase()
const { data, error } = await supabase
  .from('contact_submissions')
  .select('*')
  .eq('form_type', 'it-support')
  .order('created_at', { ascending: false })
```

### **Jobbansökningar senaste 7 dagarna:**
```typescript
const sevenDaysAgo = new Date()
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

const { data } = await supabase
  .from('contact_submissions')
  .select('*')
  .eq('form_type', 'jobbansoekan')
  .gte('created_at', sevenDaysAgo.toISOString())
  .order('created_at', { ascending: false })
```

### **Alla obehandlade förfrågningar:**
```typescript
const { data } = await supabase
  .from('contact_submissions')
  .select('*')
  .eq('status', 'new')
  .order('created_at', { ascending: false })
```

---

## 🛠️ Lägg till nytt formulär

### **Steg 1: Definiera formType i lib/form-config.ts**
```typescript
export type FormType =
  | 'existing-types'
  | 'ny-formtyp' // ← Lägg till här

export const formConfigs: Record<FormType, FormConfig> = {
  // ... existing configs
  'ny-formtyp': {
    type: 'ny-formtyp',
    email: 'mottagare@stjarnafyrkant.se',
    subject: 'Nytt formulär',
    title: 'Nytt Formulär',
    description: 'Beskrivning',
    fields: [
      { name: 'namn', label: 'Namn', type: 'text', required: true },
      { name: 'email', label: 'E-post', type: 'email', required: true },
      // ... fler fält
    ]
  }
}
```

### **Steg 2: Använd FormModal på din sida**
```tsx
import { FormModal } from "@/components/form-modal"

export default function MinSida() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <>
      <FormModal
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        formType="ny-formtyp"
      />
      <button onClick={() => setIsFormOpen(true)}>
        Öppna formulär
      </button>
    </>
  )
}
```

### **Steg 3: Data sparas automatiskt**
✅ API route sparar automatiskt till Supabase
✅ Email skickas till rätt mottagare
✅ Ingen kod behöver ändras i `app/api/contact/route.ts`

---

## 📈 TypeScript Types

### **ContactSubmission Interface**
```typescript
// lib/supabase.ts (rad 81-104)
export interface ContactSubmission {
  id?: string
  created_at?: string
  form_type: string  // ← formType från formuläret
  form_title?: string
  name?: string
  email: string
  phone?: string
  company?: string
  message?: string
  form_data: Record<string, any>  // ← All data som JSON
  status?: 'new' | 'contacted' | 'in_progress' | 'closed' | 'spam'
  assigned_to?: string
  notes?: string
  ip_address?: string
  user_agent?: string
  referrer?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  contacted_at?: string
  closed_at?: string
  updated_at?: string
}
```

---

## 🔗 Relaterade filer

| Fil | Beskrivning |
|-----|-------------|
| [FORMS_MAPPING.md](FORMS_MAPPING.md) | Komplett översikt av alla 11 formTypes och deras email-destination |
| [supabase-setup.sql](supabase-setup.sql) | SQL-script för att skapa databastabeller |
| [lib/form-config.ts](lib/form-config.ts) | Centraliserad formulärkonfiguration |
| [lib/supabase.ts](lib/supabase.ts) | Supabase klient och TypeScript interfaces |
| [components/form-modal.tsx](components/form-modal.tsx) | Återanvändbar modal-komponent |
| [app/api/contact/route.ts](app/api/contact/route.ts) | API endpoint som sparar till databas |

---

## ✅ Sammanfattning

### **Alla formulär är redan kopplade till Supabase!**

- ✅ **FormModal** (9 sidor) → `/api/contact` → Supabase
- ✅ **Kontaktsida** (inline) → `/api/contact` → Supabase
- ✅ **API Route** sparar automatiskt till `contact_submissions` tabell
- ✅ **TypeScript types** definierade i `lib/supabase.ts`
- ✅ **Environment variables** korrekt konfigurerade

### **Nästa steg:**
1. Kör `supabase-setup.sql` i Supabase SQL Editor (om inte redan gjort)
2. Testa ett formulär på sajten
3. Kontrollera att data sparas i `contact_submissions` tabell
4. Implementera email-sending med Resend (TODO i API route)

---

**Senast uppdaterad:** 2025-01-04
**Version:** 1.0
**Status:** ✅ Alla formulärkomponenter mappade och dokumenterade
