-- =====================================================
-- StjärnaFyrkant Admin Tables Setup (Simplified)
-- =====================================================
-- ENDAST för employees och case_studies
-- job_postings finns redan i databasen
-- =====================================================

-- 1. EMPLOYEES TABLE (Medarbetare)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.employees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

  -- Basic Info
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  email TEXT,
  phone TEXT,

  -- Profile
  bio TEXT,
  image_url TEXT,
  linkedin_url TEXT,

  -- Organization
  department TEXT, -- IT, Fordonsteknik, Företagstelefoni, etc.
  office TEXT, -- Umeå, Skellefteå

  -- Display
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,

  -- Meta
  specialties TEXT[], -- Array of specialties: ['IT-support', 'Molnlösningar']
  certifications TEXT[] -- Array of certifications
);

-- Index for performance
CREATE INDEX IF NOT EXISTS employees_visible_idx ON public.employees(is_visible, display_order);
CREATE INDEX IF NOT EXISTS employees_department_idx ON public.employees(department);

-- Update timestamp trigger function (create if doesn't exist)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Update timestamp trigger
DROP TRIGGER IF EXISTS update_employees_updated_at ON public.employees;
CREATE TRIGGER update_employees_updated_at BEFORE UPDATE ON public.employees
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 2. CASE STUDIES TABLE (Kundcase)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.case_studies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

  -- Basic Info
  client_name TEXT NOT NULL,
  project_title TEXT NOT NULL,
  slug TEXT UNIQUE, -- URL-friendly version: "acme-it-infrastruktur"

  -- Content
  summary TEXT, -- Kort sammanfattning (1-2 meningar)
  challenge TEXT, -- Kundens utmaning/problem
  solution TEXT, -- Vår lösning
  results TEXT, -- Resultat och effekt

  -- Media
  featured_image_url TEXT,
  gallery_images TEXT[], -- Array of image URLs

  -- Categorization
  services TEXT[] NOT NULL, -- ['IT-support', 'Molnlösningar', 'Företagstelefoni']
  industry TEXT, -- Bransch: 'Bygg', 'Transport', 'Offentlig sektor'

  -- Timeline
  project_date DATE, -- När projektet genomfördes
  project_duration TEXT, -- ex: "3 månader", "Pågående"

  -- Publishing
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,

  -- Display
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false, -- Visas på startsidan

  -- Meta
  client_logo_url TEXT,
  testimonial TEXT, -- Kundcitat
  testimonial_author TEXT, -- Namn på person som sa citatet
  testimonial_title TEXT, -- Titel på person
  metrics JSONB -- Key metrics: {"cost_savings": "30%", "uptime": "99.9%"}
);

-- Index for performance
CREATE INDEX IF NOT EXISTS case_studies_published_idx ON public.case_studies(is_published, display_order);
CREATE INDEX IF NOT EXISTS case_studies_featured_idx ON public.case_studies(is_featured);
CREATE INDEX IF NOT EXISTS case_studies_services_idx ON public.case_studies USING GIN(services);
CREATE INDEX IF NOT EXISTS case_studies_slug_idx ON public.case_studies(slug);

-- Update timestamp trigger
DROP TRIGGER IF EXISTS update_case_studies_updated_at ON public.case_studies;
CREATE TRIGGER update_case_studies_updated_at BEFORE UPDATE ON public.case_studies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 3. ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Public can view visible employees" ON public.employees;
DROP POLICY IF EXISTS "Public can view published cases" ON public.case_studies;
DROP POLICY IF EXISTS "Service role has full access to employees" ON public.employees;
DROP POLICY IF EXISTS "Service role has full access to case_studies" ON public.case_studies;

-- Public read access for published/visible content
CREATE POLICY "Public can view visible employees" ON public.employees
  FOR SELECT USING (is_visible = true);

CREATE POLICY "Public can view published cases" ON public.case_studies
  FOR SELECT USING (is_published = true);

-- Service role has full access (för admin/API routes)
CREATE POLICY "Service role has full access to employees" ON public.employees
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to case_studies" ON public.case_studies
  FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- 4. SAMPLE DATA (Optional - ta bort om du inte vill ha testdata)
-- =====================================================

-- Sample Employee
INSERT INTO public.employees (name, title, email, phone, bio, department, office, display_order, is_visible)
VALUES
  ('Anna Andersson', 'IT-konsult', 'anna.andersson@stjarnafyrkant.se', '070-123 45 67',
   'Anna har över 10 års erfarenhet av IT-infrastruktur och molnlösningar.',
   'IT', 'Umeå', 1, true),
  ('Erik Eriksson', 'Fordonstekniker', 'erik.eriksson@stjarnafyrkant.se', '070-234 56 78',
   'Erik är specialist på komradio och fordonsutrustning.',
   'Fordonsteknik', 'Skellefteå', 2, true)
ON CONFLICT DO NOTHING;

-- Sample Case Study
INSERT INTO public.case_studies (client_name, project_title, summary, challenge, solution, results, services, industry, is_published, display_order)
VALUES
  ('Acme Bygg AB', 'Komplett IT-modernisering',
   'Hjälpte Acme Bygg att modernisera sin IT-infrastruktur och öka produktiviteten med 40%.',
   'Acme Bygg hade en föråldrad IT-miljö med ofta återkommande problem.',
   'Vi implementerade en modern molnbaserad IT-lösning med Office 365 och Azure.',
   'Produktiviteten ökade med 40% och IT-kostnaderna minskade med 25%.',
   ARRAY['IT-support', 'Molnlösningar'],
   'Bygg',
   true, 1)
ON CONFLICT DO NOTHING;

-- =====================================================
-- KLART!
-- =====================================================
-- Du kan nu hantera dessa tabeller via admin-gränssnittet:
-- - /admin/medarbetare (employees table)
-- - /admin/kundcase (case_studies table)
-- - /admin/jobb (använder befintlig job_postings table)
--
-- Nästa steg:
-- 1. Gå till http://localhost:3000/admin
-- 2. Logga in med lösenord: stjarna2025
-- 3. Börja lägga till innehåll!
-- =====================================================
