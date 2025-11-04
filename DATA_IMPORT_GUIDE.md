# Guide: Importera befintlig data till Admin-systemet

## Översikt

Denna guide beskriver hur du importerar befintlig data från hemsidan till det nya admin-systemet i Supabase.

## Dataöversikt

### 1. Medarbetare (Employees)
- **Källa**: [app/om-oss/page.tsx](app/om-oss/page.tsx) (lines 38-104)
- **Antal**: 48 medarbetare
- **Avdelningar**:
  - Backoffice (7 personer)
  - IT (8 personer)
  - Fordonsteknik (9 personer)
  - Försäljning (12 personer)
  - Ledning (4 personer)

### 2. Kundcase (Case Studies)
- **Källa**: [app/page.tsx](app/page.tsx) (lines 104-120)
- **Antal**: 4 kundcase
- **Kunder**:
  - Komatsu Forest (Företagstelefoni + IT)
  - Norrtech VVS (Fordonsteknik)
  - Railcare (IT + Företagstelefoni)
  - Edukatus (IT-partnerskap med testimonial från Nina Karlsson)

### 3. Formulär
- **Källa**: [lib/form-config.ts](lib/form-config.ts)
- **Antal**: 11 formulärtyper
- **Status**: ✅ Redan integrerat i admin-panelen via FormManager-komponenten
- **Typer**: IT-support, Telefoni, Alkolås, Fordon, Komradio, Service & Reparation, Order, Företagstelefoni, Projekt, Jobbansökan, General

## Importinstruktioner

### Steg 1: Kör SQL-skript i Supabase

1. Logga in på [Supabase Dashboard](https://supabase.com/dashboard)
2. Välj ditt projekt
3. Gå till **SQL Editor** i vänstermenyn
4. Kör först **supabase-admin-simplified.sql** (skapar tabeller)
5. Kör sedan **import-existing-data.sql** (importerar data)

### Steg 2: Verifiera importen

Kontrollera att datan importerades korrekt:

#### Kontrollera medarbetare:
```sql
SELECT department, COUNT(*) as antal
FROM public.employees
GROUP BY department
ORDER BY department;
```

Förväntat resultat:
- Backoffice: 7
- Fordonsteknik: 9
- Försäljning: 12
- IT: 8
- Ledning: 4

#### Kontrollera kundcase:
```sql
SELECT client_name, is_published, is_featured
FROM public.case_studies
ORDER BY display_order;
```

Förväntat resultat: 4 kundcase (3 featured)

### Steg 3: Testa admin-gränssnittet

1. Gå till `/admin` på din webbplats
2. Logga in med lösenord: `stjarna2025`
3. Testa följande:
   - `/admin/medarbetare` - Se att alla 48 medarbetare finns
   - `/admin/kundcase` - Se att alla 4 kundcase finns med korrekt data
   - `/admin` (scroll ner till Formulär) - Se att alla 11 formulärtyper visas

## Filöversikt

### SQL-filer
- **supabase-admin-simplified.sql** - Skapar tabeller för employees och case_studies
- **import-existing-data.sql** - Importerar befintlig data från hemsidan

### Admin-komponenter
- **components/admin/employee-manager.tsx** - CRUD för medarbetare
- **components/admin/job-manager.tsx** - CRUD för jobbannonser
- **components/admin/case-manager.tsx** - CRUD för kundcase
- **components/admin/form-manager.tsx** - Visar inkomna formulär

### Admin-sidor
- **app/admin/page.tsx** - Dashboard med navigation
- **app/admin/medarbetare/page.tsx** - Hantera medarbetare
- **app/admin/jobb/page.tsx** - Hantera jobbannonser
- **app/admin/kundcase/page.tsx** - Hantera kundcase

### API-routes
- **app/api/admin/employees/route.ts** - GET, POST, PUT, DELETE för medarbetare
- **app/api/admin/jobs/route.ts** - GET, POST, PUT, DELETE för jobbannonser
- **app/api/admin/cases/route.ts** - GET, POST, PUT, DELETE för kundcase

## Datastruktur

### Employees-tabellen
```typescript
{
  id: string (UUID)
  name: string
  title: string
  department: string ('IT', 'Fordonsteknik', 'Backoffice', 'Försäljning', 'Ledning')
  office: string ('Umeå', 'Skellefteå')
  email?: string
  phone?: string
  bio?: string
  image_url?: string
  linkedin_url?: string
  display_order: number
  is_visible: boolean
  specialties?: string[]
  certifications?: string[]
}
```

### Case Studies-tabellen
```typescript
{
  id: string (UUID)
  client_name: string
  project_title: string
  slug: string (unique)
  summary: string
  challenge?: string
  solution?: string
  results?: string
  services: string[] (ex: ['IT-support', 'Molnlösningar'])
  industry?: string
  is_published: boolean
  is_featured: boolean
  display_order: number
  testimonial?: string
  testimonial_author?: string
  testimonial_title?: string
  featured_image_url?: string
  gallery_images?: string[]
}
```

## Nästa steg

### 1. Lägg till bilder till medarbetare
Vissa medarbetare har redan bilder i `/media/team/`:
- erik-damber.jpg
- robin-carlstrom.jpg
- konny-larsson.jpg

Du kan lägga till fler bilder via admin-gränssnittet.

### 2. Utöka kundcase med bilder
Lägg till bilder till kundcasen för en mer visuell presentation.

### 3. Fyll i fler detaljer
- Lägg till kontaktinformation till medarbetare (email, telefon)
- Lägg till bio/beskrivningar till nyckelmedarbetare
- Utöka kundcase med mer detaljerad information

### 4. Publicera jobbannonser
Gå till `/admin/jobb` för att skapa nya jobbannonser när ni har lediga tjänster.

## Support

Vid problem:
1. Kontrollera Supabase-loggar i Dashboard
2. Kontrollera browser console för felmeddelanden
3. Verifiera att RLS-policies är korrekt konfigurerade

## Säkerhet

- Admin-lösenord: `stjarna2025` (byt detta i produktion via environment variable `NEXT_PUBLIC_ADMIN_PASSWORD`)
- RLS-policies säkerställer att endast publicerad/synlig data visas publikt
- API-routes använder service role för full access
