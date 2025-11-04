# 📋 Formulärkartering - StjärnaFyrkant Västerbotten

## Översikt

Alla formulär i projektet är centraliserade i **[lib/form-config.ts](lib/form-config.ts)** och använder samma API endpoint: **[app/api/contact/route.ts](app/api/contact/route.ts)**

Varje formulär har en unik `formType` som bestämmer:
- Vilket email som mailet ska till
- Vilket ämne mailet har
- Vilka fält som visas
- Hur det sparas i Supabase-databasen

---

## 🗺️ Formulär → Email Mappning

| FormType | Email Destination | Används På | Beskrivning |
|----------|------------------|------------|-------------|
| `general` | order.vb@stjarnafyrkant.se | /kontakt | Allmän kontaktförfrågan |
| `it-support` | servicedesk@stjarnafyrkant.se | /it, /servicedesk | IT-support och problem |
| `telefoni-support` | servicedesk@stjarnafyrkant.se | Servicedesk | Telefonisupport |
| `alkolaas` | verkstad.umea@stjarnafyrkant.se | /fordonsteknik | Alkolås installation |
| `fordon` | verkstad.umea@stjarnafyrkant.se | /fordonsteknik | Fordonsutrustning |
| `komradio` | verkstad.umea@stjarnafyrkant.se | /kommunikationsteknik | Komradio & kommunikation |
| `service-reparation` | service.umea@stjarnafyrkant.se | Flera sidor | Service & reparation |
| `order` | order.vb@stjarnafyrkant.se | Interna | Orderförfrågan |
| `foretagstelefoni` | sebastian.bjuhr@stjarnafyrkant.se | /foretagstelefoni | VoIP, växel, abonnemang |
| `projekt` | sebastian.bjuhr@stjarnafyrkant.se | Projektförfrågningar | Större projekt |
| `jobbansoekan` | ansokan.vb@stjarnafyrkant.se | /karriar | Jobbansökningar |

---

## 📊 Detaljerad Formulärkartering

### 1. **IT-Support** (`it-support`)
**Email:** servicedesk@stjarnafyrkant.se
**Ämne:** IT-support förfrågan
**Sidor:** /it, /servicedesk

**Fält:**
- Namn (required)
- Företag (required)
- E-post (required)
- Telefon (required)
- Beskriv problemet (textarea, required)

**Databas (contact_submissions):**
```json
{
  "form_type": "it-support",
  "form_title": "IT-support",
  "name": "Anna Andersson",
  "company": "Acme AB",
  "email": "anna@acme.se",
  "phone": "070-123 45 67",
  "message": "Vår server är nere"
}
```

---

### 2. **Telefonisupport** (`telefoni-support`)
**Email:** servicedesk@stjarnafyrkant.se
**Ämne:** Telefonisupport förfrågan
**Sidor:** Servicedesk-sidan

**Fält:**
- Namn (required)
- Företag (required)
- E-post (required)
- Telefon (required)
- Beskriv problemet (textarea, required)

---

### 3. **Alkolås** (`alkolaas`)
**Email:** verkstad.umea@stjarnafyrkant.se
**Ämne:** Alkolås förfrågan
**Sidor:** /fordonsteknik

**Fält:**
- Namn (required)
- Företag (optional)
- E-post (required)
- Telefon (required)
- Fordon - Märke och modell (required)
- Meddelande (textarea, required)

**Databas:**
```json
{
  "form_type": "alkolaas",
  "form_data": {
    "vehicle": "Volvo V90"
  }
}
```

---

### 4. **Fordonsutrustning** (`fordon`)
**Email:** verkstad.umea@stjarnafyrkant.se
**Ämne:** Fordonsutrustning förfrågan
**Sidor:** /fordonsteknik

**Fält:**
- Namn (required)
- Företag (required)
- E-post (required)
- Telefon (required)
- Fordon - Märke och modell (required)
- Typ av tjänst (select: Inredning, Taxi-utrustning, Komradio, Annan specialanpassning)
- Beskriv din förfrågan (textarea, required)

**Databas:**
```json
{
  "form_type": "fordon",
  "form_data": {
    "vehicle": "Mercedes Sprinter",
    "service": "Inredning"
  }
}
```

---

### 5. **Komradio & Kommunikation** (`komradio`)
**Email:** verkstad.umea@stjarnafyrkant.se
**Ämne:** Komradio förfrågan
**Sidor:** /kommunikationsteknik

**Fält:**
- Namn (required)
- Företag (required)
- E-post (required)
- Telefon (required)
- Typ av tjänst (select: Komradio, GroupTalk, Täckningsförstärkning, Övrigt)
- Beskriv din förfrågan (textarea, required)

---

### 6. **Service & Reparation** (`service-reparation`)
**Email:** service.umea@stjarnafyrkant.se
**Ämne:** Service & reparation förfrågan
**Sidor:** Flera tjänstesidor

**Fält:**
- Namn (required)
- Företag (required)
- E-post (required)
- Telefon (required)
- Utrustning (required)
- Beskriv problemet (textarea, required)

---

### 7. **Orderförfrågan** (`order`)
**Email:** order.vb@stjarnafyrkant.se
**Ämne:** Orderförfrågan
**Sidor:** Interna/admin

**Fält:**
- Namn (required)
- Företag (required)
- E-post (required)
- Telefon (required)
- Produkter (textarea, required)
- Övrig information (textarea, optional)

---

### 8. **Företagstelefoni** (`foretagstelefoni`)
**Email:** sebastian.bjuhr@stjarnafyrkant.se
**Ämne:** Företagstelefoni förfrågan
**Sidor:** /foretagstelefoni

**Fält:**
- Namn (required)
- Företag (required)
- E-post (required)
- Telefon (required)
- Antal anställda (optional)
- Intresse för (select: VoIP & Växel, Mobilabonnemang, Konferenssystem, Komplett lösning)
- Beskriv era behov (textarea, required)

**Databas:**
```json
{
  "form_type": "foretagstelefoni",
  "form_data": {
    "employees": "50",
    "service": "Komplett lösning"
  }
}
```

---

### 9. **Projektförfrågan** (`projekt`)
**Email:** sebastian.bjuhr@stjarnafyrkant.se
**Ämne:** Projektförfrågan
**Sidor:** Stora projekt

**Fält:**
- Namn (required)
- Företag (required)
- E-post (required)
- Telefon (required)
- Projektområde (select: IT-infrastruktur, Fordonsteknik, Företagstelefoni, Kommunikation, Flera områden)
- Budget (select: < 100k, 100k-500k, 500k-1M, > 1M, Vet ej)
- Projektbeskrivning (textarea, required)

**Databas:**
```json
{
  "form_type": "projekt",
  "form_data": {
    "category": "IT-infrastruktur",
    "budget": "500 000 - 1 miljon kr"
  }
}
```

---

### 10. **Jobbansökan** (`jobbansoekan`)
**Email:** ansokan.vb@stjarnafyrkant.se
**Ämne:** Jobbansökan
**Sidor:** /karriar

**Fält:**
- Namn (required)
- E-post (required)
- Telefon (required)
- Tjänst du söker (required)
- Personligt brev (textarea, required)

**Databas:**
```json
{
  "form_type": "jobbansoekan",
  "form_data": {
    "position": "IT-konsult"
  }
}
```

---

### 11. **Allmän Förfrågan** (`general`)
**Email:** order.vb@stjarnafyrkant.se
**Ämne:** Allmän förfrågan
**Sidor:** /kontakt (default)

**Fält:**
- Jag vill prata med (select: IT & Servicedesk, Fordonsteknik, Företagstelefoni, Kommunikationsteknik, Försäljning, Ekonomi, Karriär)
- Namn (required)
- Företag (optional)
- E-post (required)
- Telefon (optional)
- Meddelande (textarea, required)

**Databas:**
```json
{
  "form_type": "general",
  "form_data": {
    "department": "IT & Servicedesk"
  }
}
```

---

## 🔄 Hur det fungerar

### **Flöde:**

```
1. Användare fyller i formulär på en sida
   ↓
2. Formuläret skickar till /api/contact med { formType, data }
   ↓
3. API route (app/api/contact/route.ts):
   - Hämtar config för formType från lib/form-config.ts
   - Validerar required fields
   - Sparar till Supabase (contact_submissions tabell)
   - Skickar mail till rätt email (config.email)
   ↓
4. Data sparad i databas med form_type för senare filtrering
```

### **Exempel API Call:**

```typescript
// Frontend skickar:
fetch('/api/contact', {
  method: 'POST',
  body: JSON.stringify({
    formType: 'it-support',
    data: {
      name: 'Anna',
      company: 'Acme AB',
      email: 'anna@acme.se',
      phone: '070-123 45 67',
      message: 'Servern är nere'
    }
  })
})

// API route:
const config = getFormConfig('it-support')
// → email: 'servicedesk@stjarnafyrkant.se'
// → subject: 'IT-support förfrågan'

// Sparas i Supabase:
{
  form_type: 'it-support',
  form_title: 'IT-support',
  email: 'anna@acme.se',
  name: 'Anna',
  company: 'Acme AB',
  phone: '070-123 45 67',
  message: 'Servern är nere',
  form_data: { /* all data as JSON */ }
}
```

---

## 📈 Analytics & Filtrering

### **I Supabase kan ni filtrera på:**

**Alla IT-support förfrågningar:**
```sql
SELECT * FROM contact_submissions
WHERE form_type = 'it-support'
ORDER BY created_at DESC;
```

**Alla förfrågningar till verkstaden:**
```sql
SELECT * FROM contact_submissions
WHERE form_type IN ('alkolaas', 'fordon', 'komradio')
ORDER BY created_at DESC;
```

**Jobbansökningar:**
```sql
SELECT * FROM contact_submissions
WHERE form_type = 'jobbansoekan'
ORDER BY created_at DESC;
```

**Förfrågningar med budget:**
```sql
SELECT * FROM contact_submissions
WHERE form_type = 'projekt'
AND form_data->>'budget' LIKE '%miljon%'
ORDER BY created_at DESC;
```

---

## 🎯 Best Practices

### **1. Lägg till nytt formulär:**

```typescript
// 1. Lägg till i FormType (lib/form-config.ts)
export type FormType =
  | 'existing-types'
  | 'ny-formtyp' // ← Lägg till här

// 2. Lägg till config
export const formConfigs: Record<FormType, FormConfig> = {
  // ... existing configs
  'ny-formtyp': {
    type: 'ny-formtyp',
    email: 'mottagare@stjarnafyrkant.se',
    subject: 'Nytt formulär',
    title: 'Nytt Formulär',
    description: 'Beskrivning',
    fields: [
      { name: 'name', label: 'Namn', type: 'text', required: true },
      { name: 'email', label: 'E-post', type: 'email', required: true },
      // ... fler fält
    ]
  }
}
```

### **2. Använd formuläret i komponenten:**

```typescript
import { getFormConfig } from '@/lib/form-config'

const config = getFormConfig('ny-formtyp')

// Skicka till API:
await fetch('/api/contact', {
  method: 'POST',
  body: JSON.stringify({
    formType: 'ny-formtyp',
    data: formData
  })
})
```

### **3. Data sparas automatiskt i Supabase:**
- Formulärtypen (`form_type`) används för filtrering
- All data sparas i både individuella fält OCH `form_data` JSON
- UTM-parametrar sparas automatiskt

---

## 🔍 Söka i databasen

### **Hitta specifik förfrågan:**
```sql
SELECT * FROM contact_submissions
WHERE email = 'anna@acme.se'
ORDER BY created_at DESC;
```

### **Alla från ett företag:**
```sql
SELECT * FROM contact_submissions
WHERE company ILIKE '%acme%'
ORDER BY created_at DESC;
```

### **Frågor med specifikt fordon:**
```sql
SELECT * FROM contact_submissions
WHERE form_data->>'vehicle' ILIKE '%volvo%'
ORDER BY created_at DESC;
```

### **Projektförfrågningar med stor budget:**
```sql
SELECT * FROM contact_submissions
WHERE form_type = 'projekt'
AND (form_data->>'budget' LIKE '%miljon%' OR form_data->>'budget' LIKE '%500 000%')
ORDER BY created_at DESC;
```

---

## 📧 Email Routning Sammanfattning

```
order.vb@stjarnafyrkant.se      → Allmänna förfrågningar & orderförfrågningar
servicedesk@stjarnafyrkant.se   → IT-support & telefonisupport
verkstad.umea@stjarnafyrkant.se → Alkolås, fordon, komradio
service.umea@stjarnafyrkant.se  → Service & reparation
sebastian.bjuhr@stjarnafyrkant  → Företagstelefoni & projekt
ansokan.vb@stjarnafyrkant.se    → Jobbansökningar
```

---

**Senast uppdaterad:** 2025-01-04
**Version:** 1.0
**Relaterade filer:**
- [lib/form-config.ts](lib/form-config.ts)
- [app/api/contact/route.ts](app/api/contact/route.ts)
- [supabase-setup.sql](supabase-setup.sql)
