-- =====================================================
-- Import Existing Website Data
-- =====================================================
-- Detta script importerar befintlig data från hemsidan
-- till Supabase admin-tabellerna
--
-- Kör detta EFTER supabase-admin-simplified.sql
-- =====================================================

-- =====================================================
-- 1. EMPLOYEES (Medarbetare från /app/om-oss/page.tsx)
-- =====================================================

-- Backoffice
INSERT INTO public.employees (name, title, department, office, display_order, is_visible)
VALUES
  ('Lina Sjöstedt', 'Inköp & backoffice', 'Backoffice', 'Umeå', 1, true),
  ('Albin Kapstad', 'Backoffice', 'Backoffice', 'Umeå', 2, true),
  ('Katarina Bjuhr', 'Backoffice', 'Backoffice', 'Umeå', 3, true),
  ('Anneli Bogardi', 'Backoffice', 'Backoffice', 'Umeå', 4, true),
  ('Nathalie Bodén', 'Backoffice', 'Backoffice', 'Umeå', 5, true),
  ('Jonas Karlsson', 'Backoffice', 'Backoffice', 'Umeå', 6, true),
  ('Linda Edlund', 'Ekonomi', 'Backoffice', 'Umeå', 7, true)
ON CONFLICT DO NOTHING;

-- IT
INSERT INTO public.employees (name, title, department, office, display_order, is_visible)
VALUES
  ('Erik Damber', 'Konsult', 'IT', 'Umeå', 10, true),
  ('Jonnie Karlsson', 'Affärsutvecklare', 'IT', 'Umeå', 11, true),
  ('Kendy Larsson', 'Servicedesk IT', 'IT', 'Umeå', 12, true),
  ('Konny Larsson', 'Servicedesk IT', 'IT', 'Umeå', 13, true),
  ('Daniel Bennervall', 'Konsult', 'IT', 'Umeå', 14, true),
  ('Alexander Landby', 'IT-Chef', 'IT', 'Umeå', 15, true),
  ('Jens Nordström', 'Konsultchef', 'IT', 'Umeå', 16, true),
  ('Dominic Ek', 'IT Tekniker', 'IT', 'Umeå', 17, true)
ON CONFLICT DO NOTHING;

-- Fordonsteknik
INSERT INTO public.employees (name, title, department, office, display_order, is_visible)
VALUES
  ('Aron Hallberg', 'Servicetekniker', 'Fordonsteknik', 'Umeå', 20, true),
  ('Per Söderlind', 'Servicetekniker', 'Fordonsteknik', 'Umeå', 21, true),
  ('Oliver Karlsson', 'Servicetekniker', 'Fordonsteknik', 'Umeå', 22, true),
  ('Robert Fransson', 'Fordonstekniker', 'Fordonsteknik', 'Umeå', 23, true),
  ('Jacob Lundholm', 'Fordonstekniker', 'Fordonsteknik', 'Umeå', 24, true),
  ('Andreas Lundqvist', 'Verkstadschef Umeå', 'Fordonsteknik', 'Umeå', 25, true),
  ('Kamil Dziwniel', 'Fordonstekniker', 'Fordonsteknik', 'Umeå', 26, true),
  ('Urban Eriksson', 'Verkstadschef Skellefteå', 'Fordonsteknik', 'Skellefteå', 27, true),
  ('Stefan Malmgren', 'Fordonstekniker', 'Fordonsteknik', 'Skellefteå', 28, true)
ON CONFLICT DO NOTHING;

-- Försäljning
INSERT INTO public.employees (name, title, department, office, display_order, is_visible)
VALUES
  ('Ludvig Johansson', 'Kundansvarig', 'Försäljning', 'Umeå', 30, true),
  ('Leo Lindgren', 'Butikssäljare', 'Försäljning', 'Umeå', 31, true),
  ('Lucas Englund', 'Butikssäljare', 'Försäljning', 'Umeå', 32, true),
  ('Patric Junes', 'Kundansvarig', 'Försäljning', 'Umeå', 33, true),
  ('Urban Spetz', 'Industriförsäljning', 'Försäljning', 'Umeå', 34, true),
  ('Astrid Fahlgren', 'Butikssäljare', 'Försäljning', 'Umeå', 35, true),
  ('Andreas Lindforss', 'Kundansvarig', 'Försäljning', 'Umeå', 36, true),
  ('Anton Forsberg', 'Kundansvarig', 'Försäljning', 'Umeå', 37, true),
  ('Mattias Rigertzon', 'Kundansvarig', 'Försäljning', 'Umeå', 38, true),
  ('Anders Skogebrandt', 'Säljare e-handel', 'Försäljning', 'Umeå', 39, true),
  ('Radion Golubenko', 'Kundansvarig', 'Försäljning', 'Umeå', 40, true),
  ('Oscar Wiklund', 'Avdelningschef E-handel', 'Försäljning', 'Umeå', 41, true)
ON CONFLICT DO NOTHING;

-- Ledning
INSERT INTO public.employees (name, title, department, office, display_order, is_visible)
VALUES
  ('Lin Haspel', 'Vice VD & KMA', 'Ledning', 'Umeå', 50, true),
  ('Niklas Bjuhr', 'VD', 'Ledning', 'Umeå', 51, true),
  ('Joakim Silén', 'Platschef Skellefteå', 'Ledning', 'Skellefteå', 52, true),
  ('Sebastian A. Bjuhr', 'Säljchef & Marknad', 'Ledning', 'Umeå', 53, true)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 2. CASE STUDIES (Kundcase från alla sidor)
-- =====================================================
-- Källor:
-- - /app/page.tsx (Startsida - 3 featured cases)
-- - /app/fordonsteknik/page.tsx (3 cases)
-- - /app/kommunikationsteknik/page.tsx (3 cases)
-- - /app/foretagstelefoni/page.tsx (3 cases)
-- =====================================================

INSERT INTO public.case_studies (
  client_name,
  project_title,
  slug,
  summary,
  challenge,
  solution,
  results,
  services,
  industry,
  is_published,
  display_order,
  is_featured
)
VALUES
  -- === STARTSIDAN (/app/page.tsx) - Featured cases ===
  (
    'Komatsu Forest',
    'Upphandling och projektledning av företagstelefoni med Microsoft Teams',
    'komatsu-forest-teams',
    'Upphandling och projektledning av en ny lösning för företagstelefonin med Microsoft Teams samt datanätsförbindelser till samtliga siter.',
    'Komatsu Forest behövde en modern och skalbar lösning för företagstelefonin samt pålitliga datanätsförbindelser till alla sina anläggningar.',
    'Vi genomförde en omfattande upphandling och projektledde implementationen av Microsoft Teams som företagstelefonilösning, samt etablerade stabila datanätsförbindelser till samtliga siter.',
    'En komplett och framtidssäker kommunikationslösning som förbättrade samarbetet och effektiviteten i hela organisationen med 750+ användare.',
    ARRAY['Företagstelefoni', 'IT-support'],
    'Tillverkning',
    true,
    1,
    true
  ),
  (
    'Norrtech VVS',
    'Anpassade fordonsinredningar till uppdaterad flotta',
    'norrtech-vvs-fordonsinredningar',
    'Anpassade fordonsinredningar till uppdaterad flotta för ett mer effektivt arbete ute i fält.',
    'Norrtech VVS behövde optimera sina arbetsfordon för att öka effektiviteten för sina tekniker ute i fält.',
    'Vi designade och installerade skräddarsydda fordonsinredningar som är perfekt anpassade för VVS-arbete, med smart förvaring och utrustning.',
    'Betydligt mer effektivt fältarbete med bättre organisation och snabbare åtkomsttider till verktyg och material.',
    ARRAY['Fordonsteknik'],
    'Bygg & VVS',
    true,
    2,
    true
  ),
  (
    'Railcare',
    'Paketerad hårdvara och servicedesk för 200 anställda',
    'railcare-hardvara-servicedesk',
    'Paketerad hårdvara med livscykelhantering för drygt 200 anställda, samt intern avlastning med vår servicedesk för all support rörande företagstelefonin.',
    'Railcare behövde en komplett lösning för hantering av hårdvara och telefoni till sina 200+ anställda, samt avlastning av intern IT-avdelning.',
    'Vi levererade en fullständig paketeringslösning för hårdvara med livscykelhantering, samt erbjöd dedikerad servicedesk-support för företagstelefonin.',
    'Railcare fick en komplett IT- och telefonilösning med professionell support, vilket frigör tid för deras interna IT-team att fokusera på kärnverksamheten.',
    ARRAY['IT-support', 'Företagstelefoni'],
    'Transport & Logistik',
    true,
    3,
    true
  ),

  -- === FORDONSTEKNIK (/app/fordonsteknik/page.tsx) ===
  (
    'Holmen Wood Products',
    'Kamerasystem från Motec för säkrare logistikarbete',
    'holmen-wood-products-kamerasystem',
    'Kamerasystem från Motec för säkrare logistikarbete i Combiliftar inklusive installation on site.',
    'Holmen Wood Products behövde förbättra säkerheten i sitt logistikarbete med Combiliftar.',
    'Vi installerade avancerade kamerasystem från Motec direkt på plats, anpassade för deras specifika Combiliftar.',
    'Betydligt säkrare logistikarbete med förbättrad sikt och minskad risk för olyckor.',
    ARRAY['Fordonsteknik'],
    'Skogsindustri',
    true,
    10,
    false
  ),
  (
    'Säll Entreprenad',
    'Transportradios till entreprenadfordon',
    'sall-entreprenad-transportradios',
    'Transportradios inklusive programmering och installation till entreprenadfordon.',
    'Säll Entreprenad behövde pålitlig kommunikation mellan sina entreprenadfordon.',
    'Vi levererade, programmerade och installerade transportradios anpassade för deras entreprenadfordon.',
    'Säker och pålitlig kommunikation i alla entreprenadfordon för smidigare arbetsflöden.',
    ARRAY['Fordonsteknik', 'Kommunikationsteknik'],
    'Bygg & Entreprenad',
    true,
    11,
    false
  ),
  (
    'Räddningstjänsten Västerbotten',
    'Kommunikationsradio och varningssystem i utryckningsfordon',
    'raddningstjansten-vasterbotten-kommunikation',
    'Kommunikationsradio och varningssystem i utryckningsfordon.',
    'Räddningstjänsten Västerbotten behövde tillförlitlig kommunikation och varningssystem i sina utryckningsfordon.',
    'Vi installerade professionell kommunikationsradio och varningssystem i alla utryckningsfordon.',
    'Säker och pålitlig kommunikation för räddningstjänsten med snabba utryckningar.',
    ARRAY['Fordonsteknik', 'Kommunikationsteknik'],
    'Räddningstjänst',
    true,
    12,
    false
  ),

  -- === KOMMUNIKATIONSTEKNIK (/app/kommunikationsteknik/page.tsx) ===
  (
    'Northvolt',
    'Helhetslösning för säker gruppkommunikation',
    'northvolt-gruppkommunikation',
    'Helhetslösning för säker gruppkommunikation genom att brygga traditionell radio med GroupTalk, samt leverans och service av hörselskydd.',
    'Northvolt behövde en säker och pålitlig kommunikationslösning som kombinerar traditionell radio med moderna GroupTalk-system.',
    'Vi skapade en bryggad lösning mellan traditionell radio och GroupTalk, samt levererade och serviceade hörselskydd för säker kommunikation i bullriga miljöer.',
    'En komplett kommunikationslösning som ger Northvolt säker gruppkommunikation i alla miljöer.',
    ARRAY['Kommunikationsteknik', 'Hörselskydd'],
    'Industri',
    true,
    20,
    true
  ),
  (
    'Umeå Vatten och Avfall',
    'Täckningsförstärkning i Hamrinstunneln',
    'umea-vatten-tackningsforsarkning',
    'Täckningsförstärkning för mobilnätet på 4G-frekvens i hela Hamrinstunneln för säker kommunikation under jord.',
    'Umeå Vatten och Avfall hade ingen mobilnätstäckning i Hamrinstunneln, vilket skapade säkerhetsrisker.',
    'Vi installerade ett komplett täckningsförstärkningssystem för 4G-frekvens genom hela tunneln.',
    'Full mobilnätstäckning i hela Hamrinstunneln för säker kommunikation under jord.',
    ARRAY['Kommunikationsteknik', 'Täckningsförstärkning'],
    'Offentlig sektor',
    true,
    21,
    false
  ),
  (
    'Boliden Mineral',
    'Projektledning av infrastruktur för radionät',
    'boliden-mineral-radionat',
    'Projektledning av infrastruktur för radionät samt leverans och service av DECT-telefoner och hörselskydd.',
    'Boliden Mineral behövde en komplett lösning för radionät, DECT-telefoner och hörselskydd i sina gruvmiljöer.',
    'Vi projektledde hela infrastrukturen för radionätet samt levererade och serviceade DECT-telefoner och hörselskydd anpassade för tuffa gruvmiljöer.',
    'En komplett kommunikationslösning som fungerar säkert i krävande gruvmiljö.',
    ARRAY['Kommunikationsteknik', 'Hörselskydd'],
    'Gruvdrift',
    true,
    22,
    false
  ),

  -- === FÖRETAGSTELEFONI (/app/foretagstelefoni/page.tsx) ===
  (
    'Contractor Bygg',
    'Modern företagsväxel och abonnemangshantering',
    'contractor-bygg-vaxel',
    'Modern företagsväxel och abonnemangshantering med Flow, där anställda enkelt kan hantera sin telefoni på egen hand - samt löpande leverans av paketerade mobiler och headset.',
    'Contractor Bygg behövde en modern växellösning där medarbetare själva kan hantera sin telefoni, samt en smidig process för paketerade mobiler.',
    'Vi implementerade en modern företagsväxel med Flow-systemet som ger medarbetarna självservice, samt etablerade löpande leveranser av paketerade mobiler och headset.',
    'En komplett telefonilösning för 300+ användare med självservice och smidig hantering av hårdvara.',
    ARRAY['Företagstelefoni', 'Hårdvara'],
    'Bygg & Entreprenad',
    true,
    30,
    false
  ),
  (
    'Diös Fastigheter',
    'Hårdvara som tjänst och inventariehantering',
    'dios-fastigheter-hardvara',
    'Hårdvara som tjänst och system för inventariehantering.',
    'Diös Fastigheter behövde en flexibel lösning för hantering av 200+ telefonenheter.',
    'Vi levererade en hårdvara-som-tjänst-lösning med ett komplett system för inventariehantering.',
    'Enkel hantering av 200+ enheter med full kontroll och flexibilitet.',
    ARRAY['Företagstelefoni', 'Hårdvara'],
    'Fastighetsförvaltning',
    true,
    31,
    false
  ),

  -- === EDUKATUS TESTIMONIAL (från /app/om-oss och /app/karriar) ===
  (
    'Edukatus',
    'Långsiktigt IT-partnerskap med högsta servicenivå',
    'edukatus-it-partnerskap',
    'Ett framgångsrikt partnerskap där vi gemensamt hittat nya vägar framåt och utvecklat lösningar för att effektivisera och optimera verksamheten.',
    'Edukatus behövde en pålitlig IT-partner som kunde vara nära till hands och ge högsta servicenivå.',
    'Vi etablerade ett nära samarbete med kontinuerlig dialog, proaktiv support och gemensam utveckling av IT-lösningar anpassade efter verksamhetens behov.',
    'Ett långsiktigt partnerskap med service i Stjärnklass som lett till ökad effektivitet och optimering av IT-miljön.',
    ARRAY['IT-support', 'IT-konsult'],
    'Utbildning',
    true,
    40,
    false
  )
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- 3. TESTIMONIALS (Add to case studies)
-- =====================================================

-- Update Edukatus case with testimonial
UPDATE public.case_studies
SET
  testimonial = 'Vi har tillsammans hittat nya vägar framåt, utvecklat och kommit på lösningar för att effektivisera och optimera. De finns alltid nära till hands när vi behöver dem och ger en service i Stjärnklass. Hela deras team är på alerten och ger ett väldigt trevligt bemötande.',
  testimonial_author = 'Nina Karlsson',
  testimonial_title = 'FD Inköpsansvarig, Edukatus'
WHERE slug = 'edukatus-it-partnerskap';

-- =====================================================
-- KLART!
-- =====================================================
-- All befintlig data från hemsidan har nu importerats.
--
-- Sammanfattning:
-- ✅ 48 medarbetare från 5 avdelningar
-- ✅ 11 kundcase (4 featured) från alla sidor
--    - Startsida: Komatsu Forest, Norrtech VVS, Railcare (featured)
--    - Fordonsteknik: Holmen Wood Products, Säll Entreprenad, Räddningstjänsten
--    - Kommunikationsteknik: Northvolt (featured), Umeå Vatten, Boliden
--    - Företagstelefoni: Contractor Bygg, Diös Fastigheter
--    - Testimonial: Edukatus med citat från Nina Karlsson
-- ✅ 1 testimonial (Nina Karlsson från Edukatus)
--
-- Formulärdata finns redan i /lib/form-config.ts och
-- hanteras av FormManager-komponenten i admin-panelen.
--
-- VIKTIGT: Detta är en ENGÅNGSIMPORT av befintlig data.
-- Efter detta hanteras all data via admin-gränssnittet.
-- =====================================================
