-- ============================================================================
-- SUPABASE DATABASE SETUP - COMPLETE SCRIPT
-- ============================================================================
-- StjärnaFyrkant Västerbotten - MVP Database Schema
--
-- Kör detta script i Supabase SQL Editor för att skapa alla tabeller
-- på en gång.
--
-- Instruktioner:
-- 1. Gå till https://app.supabase.com
-- 2. Välj ditt projekt
-- 3. SQL Editor (vänster sidebar)
-- 4. Kopiera hela detta script
-- 5. Klistra in och klicka "Run"
-- 6. Verifiera i Table Editor
--
-- Skapad: 2025-11-04
-- Version: 1.0 MVP
-- ============================================================================

-- ============================================================================
-- HELPER FUNCTION: Update timestamp trigger
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- TABLE 1: Contact Submissions
-- ============================================================================
-- Sparar alla kontaktförfrågningar från alla formulär på sajten
CREATE TABLE IF NOT EXISTS contact_submissions (
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
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_form_type ON contact_submissions(form_type);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);

-- Trigger för att uppdatera updated_at
DROP TRIGGER IF EXISTS update_contact_submissions_updated_at ON contact_submissions;
CREATE TRIGGER update_contact_submissions_updated_at
    BEFORE UPDATE ON contact_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE 2: Page Views
-- ============================================================================
-- Spårar sidvisningar och användarbeteende
CREATE TABLE IF NOT EXISTS page_views (
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

-- Index
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_page_path ON page_views(page_path);
CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_visitor_id ON page_views(visitor_id);

-- ============================================================================
-- TABLE 3: Click Events
-- ============================================================================
-- Spåra knapptryck och användarinteraktioner
CREATE TABLE IF NOT EXISTS click_events (
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

-- Index
CREATE INDEX IF NOT EXISTS idx_click_events_created_at ON click_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_click_events_event_type ON click_events(event_type);
CREATE INDEX IF NOT EXISTS idx_click_events_page_path ON click_events(page_path);

-- ============================================================================
-- TABLE 4: Cookie Consents
-- ============================================================================
-- Spåra cookie-samtycken för GDPR
CREATE TABLE IF NOT EXISTS cookie_consents (
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

-- Index
CREATE INDEX IF NOT EXISTS idx_cookie_consents_visitor_id ON cookie_consents(visitor_id);
CREATE INDEX IF NOT EXISTS idx_cookie_consents_created_at ON cookie_consents(created_at DESC);

-- ============================================================================
-- TABLE 5: Team Members
-- ============================================================================
-- Dynamiskt innehåll för Om Oss-sidan
CREATE TABLE IF NOT EXISTS team_members (
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

-- Index
CREATE INDEX IF NOT EXISTS idx_team_members_sort_order ON team_members(sort_order);
CREATE INDEX IF NOT EXISTS idx_team_members_is_active ON team_members(is_active);

-- Trigger för updated_at
DROP TRIGGER IF EXISTS update_team_members_updated_at ON team_members;
CREATE TRIGGER update_team_members_updated_at
    BEFORE UPDATE ON team_members
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE 6: Job Postings
-- ============================================================================
-- Rekryteringsannonser
CREATE TABLE IF NOT EXISTS job_postings (
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

-- Index
CREATE INDEX IF NOT EXISTS idx_job_postings_is_active ON job_postings(is_active);
CREATE INDEX IF NOT EXISTS idx_job_postings_department ON job_postings(department);
CREATE INDEX IF NOT EXISTS idx_job_postings_slug ON job_postings(slug);
CREATE INDEX IF NOT EXISTS idx_job_postings_published_at ON job_postings(published_at DESC);

-- Trigger för updated_at
DROP TRIGGER IF EXISTS update_job_postings_updated_at ON job_postings;
CREATE TRIGGER update_job_postings_updated_at
    BEFORE UPDATE ON job_postings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE 7: Job Applications
-- ============================================================================
-- Jobbansökningar
CREATE TABLE IF NOT EXISTS job_applications (
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

-- Index
CREATE INDEX IF NOT EXISTS idx_job_applications_job_posting_id ON job_applications(job_posting_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_created_at ON job_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_job_applications_email ON job_applications(email);

-- Trigger för updated_at
DROP TRIGGER IF EXISTS update_job_applications_updated_at ON job_applications;
CREATE TRIGGER update_job_applications_updated_at
    BEFORE UPDATE ON job_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Aktivera RLS på alla tabeller
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE cookie_consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- RLS POLICIES: Contact Submissions
-- ============================================================================
DROP POLICY IF EXISTS "Service role can do everything on contact_submissions" ON contact_submissions;
CREATE POLICY "Service role can do everything on contact_submissions"
ON contact_submissions FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================================================
-- RLS POLICIES: Page Views
-- ============================================================================
DROP POLICY IF EXISTS "Service role can do everything on page_views" ON page_views;
CREATE POLICY "Service role can do everything on page_views"
ON page_views FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================================================
-- RLS POLICIES: Click Events
-- ============================================================================
DROP POLICY IF EXISTS "Service role can do everything on click_events" ON click_events;
CREATE POLICY "Service role can do everything on click_events"
ON click_events FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================================================
-- RLS POLICIES: Cookie Consents
-- ============================================================================
DROP POLICY IF EXISTS "Service role can do everything on cookie_consents" ON cookie_consents;
CREATE POLICY "Service role can do everything on cookie_consents"
ON cookie_consents FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================================================
-- RLS POLICIES: Team Members
-- ============================================================================
-- Public read access for active team members
DROP POLICY IF EXISTS "Anyone can read active team members" ON team_members;
CREATE POLICY "Anyone can read active team members"
ON team_members FOR SELECT
USING (is_active = true);

-- Service role has full access
DROP POLICY IF EXISTS "Service role can do everything on team_members" ON team_members;
CREATE POLICY "Service role can do everything on team_members"
ON team_members FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================================================
-- RLS POLICIES: Job Postings
-- ============================================================================
-- Public read access for active job postings
DROP POLICY IF EXISTS "Anyone can read active job postings" ON job_postings;
CREATE POLICY "Anyone can read active job postings"
ON job_postings FOR SELECT
USING (is_active = true);

-- Service role has full access
DROP POLICY IF EXISTS "Service role can do everything on job_postings" ON job_postings;
CREATE POLICY "Service role can do everything on job_postings"
ON job_postings FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================================================
-- RLS POLICIES: Job Applications
-- ============================================================================
DROP POLICY IF EXISTS "Service role can do everything on job_applications" ON job_applications;
CREATE POLICY "Service role can do everything on job_applications"
ON job_applications FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================================================
-- DONE!
-- ============================================================================
-- Tabeller skapade:
-- 1. contact_submissions - Kontaktformulär
-- 2. page_views - Sidvisningar
-- 3. click_events - Klickspårning
-- 4. cookie_consents - Cookie-samtycken
-- 5. team_members - Team-medlemmar (Om Oss)
-- 6. job_postings - Jobbannonser
-- 7. job_applications - Jobbansökningar
--
-- Nästa steg:
-- 1. Gå till Table Editor och verifiera tabellerna
-- 2. Testa kontaktformuläret på stjarnafyrkant.se/kontakt
-- 3. Kolla contact_submissions-tabellen för nya submissions
-- ============================================================================
