# 🗄️ Supabase Database Setup - MVP Guide

## Översikt

Denna guide beskriver hur du sätter upp och använder Supabase-databasen för StjärnaFyrkant Västerbotten.

**MVP-funktioner (Fas 1):**
1. ✅ Kontaktformulär - Spara alla leads
2. ✅ Analytics & Användarbeteende - Spåra besökare
3. ✅ Admin Dashboard Data - Dynamiskt innehåll (team, karriär)

**Fas 2 (Senare):**
- AI Chatbot-historik
- Avancerad analytics

---

## 📋 Databas Schema

### 1. Contact Submissions (Kontaktformulär)

Sparar alla kontaktförfrågningar från alla formulär på sajten.

```sql
-- Skapa tabell för kontaktformulär
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Formulärtyp och metadata
  form_type TEXT NOT NULL, -- 'general', 'it', 'fordonsteknik', etc.
  form_title TEXT, -- "Allmän förfrågan", "IT-support förfrågan"

  -- Kontaktinformation
  name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT,

  -- Fullständig formulärdata (flexibelt för olika formulär)
  form_data JSONB NOT NULL,

  -- Status och uppföljning
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'closed', 'spam')),
  assigned_to TEXT, -- Vem som hanterar förfrågan
  notes TEXT, -- Interna anteckningar

  -- Teknisk metadata
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT, -- Vilken sida kom användaren från?
  utm_source TEXT, -- För marknadsföringsspårning
  utm_medium TEXT,
  utm_campaign TEXT,

  -- Timestamps
  contacted_at TIMESTAMP WITH TIME ZONE,
  closed_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index för snabbare queries
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_form_type ON contact_submissions(form_type);
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);

-- Trigger för att uppdatera updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_contact_submissions_updated_at
    BEFORE UPDATE ON contact_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

---

### 2. Page Views & Analytics

Spårar sidvisningar och användarbeteende.

```sql
-- Sidvisningar
CREATE TABLE page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Sida och session
  page_path TEXT NOT NULL, -- '/it', '/kontakt', etc.
  page_title TEXT,
  session_id TEXT, -- Unik per besökssession
  visitor_id TEXT, -- Persistent besökar-ID (cookie)

  -- Referrer och källa
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,

  -- Teknisk info
  ip_address TEXT,
  user_agent TEXT,
  device_type TEXT, -- 'mobile', 'tablet', 'desktop'
  browser TEXT,
  os TEXT,
  country TEXT,
  city TEXT,

  -- Tidmätning
  time_on_page INTEGER, -- Sekunder
  scroll_depth INTEGER -- Procent (0-100)
);

CREATE INDEX idx_page_views_created_at ON page_views(created_at DESC);
CREATE INDEX idx_page_views_page_path ON page_views(page_path);
CREATE INDEX idx_page_views_session_id ON page_views(session_id);
CREATE INDEX idx_page_views_visitor_id ON page_views(visitor_id);
```

---

### 3. Click Tracking (Spåra knapptryck)

```sql
CREATE TABLE click_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Event data
  event_type TEXT NOT NULL, -- 'button_click', 'link_click', 'cta_click'
  element_id TEXT, -- HTML ID
  element_class TEXT, -- CSS class
  element_text TEXT, -- Knapptext
  target_url TEXT, -- Om det är en länk

  -- Kontext
  page_path TEXT NOT NULL,
  session_id TEXT,
  visitor_id TEXT,

  -- Teknisk metadata
  ip_address TEXT,
  user_agent TEXT
);

CREATE INDEX idx_click_events_created_at ON click_events(created_at DESC);
CREATE INDEX idx_click_events_event_type ON click_events(event_type);
CREATE INDEX idx_click_events_page_path ON click_events(page_path);
```

---

### 4. Cookie Consent Tracking

```sql
CREATE TABLE cookie_consents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Samtycke
  visitor_id TEXT NOT NULL,
  necessary BOOLEAN DEFAULT true,
  analytics BOOLEAN DEFAULT false,
  marketing BOOLEAN DEFAULT false,

  -- Metadata
  consent_version TEXT DEFAULT '1.0',
  ip_address TEXT,
  user_agent TEXT
);

CREATE INDEX idx_cookie_consents_visitor_id ON cookie_consents(visitor_id);
CREATE INDEX idx_cookie_consents_created_at ON cookie_consents(created_at DESC);
```

---

### 5. Team Members (Admin Dashboard)

Dynamiskt innehåll för Om Oss-sidan.

```sql
CREATE TABLE team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Personinfo
  name TEXT NOT NULL,
  title TEXT NOT NULL, -- "VD", "Teknisk chef"
  department TEXT, -- "IT", "Fordonsteknik"
  email TEXT,
  phone TEXT,

  -- Bild
  image_url TEXT,
  image_alt TEXT,

  -- Beskrivning
  bio TEXT,
  expertise TEXT[], -- Array av specialområden

  -- Social media
  linkedin_url TEXT,

  -- Visning
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  show_on_about_page BOOLEAN DEFAULT true
);

CREATE INDEX idx_team_members_sort_order ON team_members(sort_order);
CREATE INDEX idx_team_members_is_active ON team_members(is_active);

-- Trigger för updated_at
CREATE TRIGGER update_team_members_updated_at
    BEFORE UPDATE ON team_members
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

---

### 6. Job Postings (Karriärsidor - Rekryteringsannonser)

```sql
CREATE TABLE job_postings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Jobbinfo
  title TEXT NOT NULL, -- "IT-tekniker Umeå"
  department TEXT NOT NULL, -- "IT", "Fordonsteknik", "Kommunikation"
  location TEXT NOT NULL, -- "Umeå", "Skellefteå", "Båda kontor"
  employment_type TEXT NOT NULL, -- "Heltid", "Deltid", "Vikariat"

  -- Beskrivning
  description TEXT NOT NULL, -- Markdown-stöd
  responsibilities TEXT[], -- Array av ansvarsområden
  qualifications TEXT[], -- Array av krav
  benefits TEXT[], -- Array av förmåner

  -- Praktisk info
  salary_range TEXT, -- "30 000 - 40 000 kr/mån" eller "Enligt överenskommelse"
  start_date TEXT, -- "Omgående", "Juli 2025"
  application_deadline DATE,

  -- Status
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false, -- Visa högst upp
  sort_order INTEGER DEFAULT 0,

  -- Kontakt
  contact_person TEXT,
  contact_email TEXT,
  contact_phone TEXT,

  -- SEO
  slug TEXT UNIQUE, -- URL-vänlig: "it-tekniker-umea"
  meta_description TEXT,

  -- Statistik
  views_count INTEGER DEFAULT 0,
  applications_count INTEGER DEFAULT 0,

  -- Timestamps
  published_at TIMESTAMP WITH TIME ZONE,
  closed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_job_postings_is_active ON job_postings(is_active);
CREATE INDEX idx_job_postings_department ON job_postings(department);
CREATE INDEX idx_job_postings_slug ON job_postings(slug);
CREATE INDEX idx_job_postings_published_at ON job_postings(published_at DESC);

-- Trigger för updated_at
CREATE TRIGGER update_job_postings_updated_at
    BEFORE UPDATE ON job_postings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

---

### 7. Job Applications (Jobbansökningar)

```sql
CREATE TABLE job_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Koppling till jobb
  job_posting_id UUID REFERENCES job_postings(id) ON DELETE CASCADE,

  -- Sökande info
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,

  -- Ansökan
  cover_letter TEXT,
  resume_url TEXT, -- Länk till CV (upload till Supabase Storage)
  linkedin_url TEXT,
  portfolio_url TEXT,

  -- Extra frågor
  available_from TEXT, -- "Omgående", "3 månader"
  salary_expectation TEXT,
  additional_info TEXT,

  -- Status
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'interview', 'offer', 'rejected', 'hired')),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5), -- 1-5 stjärnor
  internal_notes TEXT,

  -- GDPR
  gdpr_consent BOOLEAN DEFAULT false NOT NULL,
  gdpr_consent_date TIMESTAMP WITH TIME ZONE,

  -- Teknisk metadata
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT
);

CREATE INDEX idx_job_applications_job_posting_id ON job_applications(job_posting_id);
CREATE INDEX idx_job_applications_status ON job_applications(status);
CREATE INDEX idx_job_applications_created_at ON job_applications(created_at DESC);
CREATE INDEX idx_job_applications_email ON job_applications(email);

-- Trigger för updated_at
CREATE TRIGGER update_job_applications_updated_at
    BEFORE UPDATE ON job_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

---

## 🔐 Row Level Security (RLS)

Säkerställ att endast autentiserade admins kan läsa/skriva data.

```sql
-- Aktivera RLS på alla tabeller
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE cookie_consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Service role kan allt (för API routes)
CREATE POLICY "Service role can do everything on contact_submissions"
ON contact_submissions FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role can do everything on page_views"
ON page_views FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role can do everything on click_events"
ON click_events FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role can do everything on cookie_consents"
ON cookie_consents FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Team members: Läs publikt, skriva med service role
CREATE POLICY "Anyone can read active team members"
ON team_members FOR SELECT
USING (is_active = true);

CREATE POLICY "Service role can do everything on team_members"
ON team_members FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Job postings: Läs publikt, skriva med service role
CREATE POLICY "Anyone can read active job postings"
ON job_postings FOR SELECT
USING (is_active = true);

CREATE POLICY "Service role can do everything on job_postings"
ON job_postings FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Job applications: Endast service role
CREATE POLICY "Service role can do everything on job_applications"
ON job_applications FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
```

---

## 🚀 Implementering

### Steg 1: Kör SQL i Supabase

1. Gå till Supabase Dashboard: https://app.supabase.com
2. Välj ditt projekt
3. Gå till **SQL Editor**
4. Kopiera och kör SQL-schemat ovan (sektion för sektion)

### Steg 2: Installera Supabase Client

```bash
npm install @supabase/supabase-js
```

### Steg 3: Skapa Supabase Client Utility

Skapa `/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

// För server-side API routes (full access)
export function getServiceSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // ALDRIG exponera till klienten!
    {
      auth: {
        persistSession: false,
      },
    }
  )
}

// För client-side (begränsad access via RLS)
export function getClientSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### Steg 4: Uppdatera Environment Variables

**I Vercel Dashboard:**
- `NEXT_PUBLIC_SUPABASE_URL` = Din Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` = Service role key (ALDRIG i NEXT_PUBLIC_*)

**Lokalt (`.env.local`):**
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

---

## 📝 Användningsexempel

### 1. Spara Kontaktformulär

Uppdatera `/app/api/contact/route.ts`:

```typescript
import { getServiceSupabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { formType, data } = body
  const supabase = getServiceSupabase()

  // Spara i databas
  const { data: submission, error } = await supabase
    .from('contact_submissions')
    .insert({
      form_type: formType,
      form_title: getFormConfig(formType).title,
      name: data.namn,
      email: data.email,
      phone: data.telefon,
      company: data.foretag,
      message: data.meddelande,
      form_data: data,
      ip_address: request.ip,
      user_agent: request.headers.get('user-agent'),
      referrer: request.headers.get('referer'),
    })
    .select()
    .single()

  if (error) {
    console.error('Supabase insert error:', error)
    // Fortsätt ändå - försök skicka mail
  }

  // Skicka mail via Resend (som vanligt)
  // ...

  return NextResponse.json({ success: true })
}
```

### 2. Spåra Sidvisningar

Skapa `/app/api/analytics/pageview/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getServiceSupabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const supabase = getServiceSupabase()

  const { error } = await supabase.from('page_views').insert({
    page_path: body.pagePath,
    page_title: body.pageTitle,
    session_id: body.sessionId,
    visitor_id: body.visitorId,
    referrer: body.referrer,
    utm_source: body.utmSource,
    utm_medium: body.utmMedium,
    utm_campaign: body.utmCampaign,
    ip_address: request.ip,
    user_agent: request.headers.get('user-agent'),
    device_type: body.deviceType,
  })

  if (error) {
    console.error('Analytics error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
```

### 3. Hämta Team Members

Skapa `/app/api/team/route.ts`:

```typescript
import { NextResponse } from 'next/server'
import { getClientSupabase } from '@/lib/supabase'

export async function GET() {
  const supabase = getClientSupabase()

  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('is_active', true)
    .eq('show_on_about_page', true)
    .order('sort_order', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
```

### 4. Hämta Aktiva Jobb

Skapa `/app/api/jobs/route.ts`:

```typescript
import { NextResponse } from 'next/server'
import { getClientSupabase } from '@/lib/supabase'

export async function GET() {
  const supabase = getClientSupabase()

  const { data, error } = await supabase
    .from('job_postings')
    .select('*')
    .eq('is_active', true)
    .lte('published_at', new Date().toISOString())
    .order('is_featured', { ascending: false })
    .order('published_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
```

---

## 🎯 Nästa Steg

1. ✅ Kör SQL-schemat i Supabase
2. ✅ Lägg till environment variables i Vercel
3. ✅ Skapa `/lib/supabase.ts`
4. ✅ Uppdatera `/app/api/contact/route.ts`
5. ✅ Testa kontaktformulär
6. ✅ Implementera analytics-spårning (valfritt)
7. ✅ Bygg admin dashboard (Fas 2)

---

## 🔍 Felsökning

**Problem:** "relation does not exist"
- **Lösning:** Kontrollera att SQL-schemat kördes korrekt i Supabase

**Problem:** "new row violates row-level security policy"
- **Lösning:** Använd `getServiceSupabase()` i API routes, inte `getClientSupabase()`

**Problem:** Environment variables inte tillgängliga
- **Lösning:** Restart development server efter att ha lagt till `.env.local`

---

**Skapad:** 2025-11-04
**Version:** 1.0 MVP
