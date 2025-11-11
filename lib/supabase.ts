import { createClient } from '@supabase/supabase-js'

/**
 * Supabase Client Utilities
 *
 * Provides two types of Supabase clients:
 * 1. Service Role Client - Full database access (use in API routes only)
 * 2. Anonymous Client - Limited access via RLS (use in client-side code)
 */

/**
 * Get Supabase client with SERVICE ROLE key
 *
 * ⚠️ IMPORTANT: Only use this in API routes (server-side)
 * This client bypasses Row Level Security (RLS) and has full database access.
 * NEVER use this in client-side code or expose SERVICE_ROLE_KEY to the browser.
 *
 * Usage:
 * ```typescript
 * // In /app/api/contact/route.ts
 * const supabase = getServiceSupabase()
 * await supabase.from('contact_submissions').insert(data)
 * ```
 */
export function getServiceSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY'
    )
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

/**
 * Get Supabase client with ANON key (for client-side use)
 *
 * Safe to use in client-side code (React components).
 * Access is controlled by Row Level Security (RLS) policies.
 *
 * Usage:
 * ```typescript
 * // In client components
 * const supabase = getAnonSupabase()
 * const { data } = await supabase.from('case_studies').select('*').eq('is_published', true)
 * ```
 */
export function getAnonSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
    )
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

/**
 * Get Supabase client with ANON key
 *
 * Safe to use in client-side code (React components).
 * Access is controlled by Row Level Security (RLS) policies.
 *
 * Usage:
 * ```typescript
 * // In a React component
 * const supabase = getClientSupabase()
 * const { data } = await supabase.from('job_postings').select('*').eq('is_active', true)
 * ```
 */
export function getClientSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
    )
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })
}

/**
 * Database Table Types
 *
 * Define TypeScript types for better type safety.
 * Update these as you add more fields to your database tables.
 */

export interface ContactSubmission {
  id?: string
  created_at?: string
  form_type: string
  form_title?: string
  name?: string
  email: string
  phone?: string
  company?: string
  message?: string
  form_data: Record<string, any>
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

export interface PageView {
  id?: string
  created_at?: string
  page_path: string
  page_title?: string
  session_id?: string
  visitor_id?: string
  referrer?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  ip_address?: string
  user_agent?: string
  device_type?: string
  browser?: string
  os?: string
  country?: string
  city?: string
  time_on_page?: number
  scroll_depth?: number
}

export interface JobPosting {
  id?: string
  created_at?: string
  updated_at?: string
  title: string
  department: string
  location: string
  employment_type: string
  description: string
  responsibilities?: string[]
  qualifications?: string[]
  benefits?: string[]
  salary_range?: string
  start_date?: string
  application_deadline?: string
  is_active?: boolean
  is_featured?: boolean
  sort_order?: number
  contact_person?: string
  contact_email?: string
  contact_phone?: string
  slug?: string
  meta_description?: string
  views_count?: number
  applications_count?: number
  published_at?: string
  closed_at?: string
}

export interface JobApplication {
  id?: string
  created_at?: string
  updated_at?: string
  job_posting_id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  cover_letter?: string
  resume_url?: string
  linkedin_url?: string
  portfolio_url?: string
  available_from?: string
  salary_expectation?: string
  additional_info?: string
  status?: 'new' | 'reviewed' | 'interview' | 'offer' | 'rejected' | 'hired'
  rating?: number
  internal_notes?: string
  gdpr_consent: boolean
  gdpr_consent_date?: string
  ip_address?: string
  user_agent?: string
  referrer?: string
}

export interface TeamMember {
  id?: string
  created_at?: string
  updated_at?: string
  name: string
  title: string
  department?: string
  email?: string
  phone?: string
  image_url?: string
  image_alt?: string
  bio?: string
  expertise?: string[]
  linkedin_url?: string
  is_active?: boolean
  sort_order?: number
  show_on_about_page?: boolean
}

// =====================================================
// Admin Content Management Types
// =====================================================

export interface Employee {
  id?: string
  created_at?: string
  updated_at?: string
  name: string
  title: string
  email?: string
  phone?: string
  bio?: string
  image_url?: string
  linkedin_url?: string
  department?: string
  office?: string
  display_order?: number
  is_visible?: boolean
  specialties?: string[]
  certifications?: string[]
}

export interface JobPosting2 {
  id?: string
  created_at?: string
  updated_at?: string
  title: string
  department: string
  location: string // Changed from office to match existing schema
  employment_type?: string
  description: string
  responsibilities?: string
  qualifications?: string
  benefits?: string
  application_deadline?: string
  start_date?: string
  contact_person?: string
  contact_email?: string
  contact_phone?: string
  is_active?: boolean // Changed from is_published to match existing schema
  is_featured?: boolean
  published_at?: string
  closed_at?: string
  sort_order?: number // Changed from display_order to match existing schema
  salary_range?: string
  tags?: string[]
  slug?: string
  meta_description?: string
  views_count?: number
  applications_count?: number
}

export interface CaseStudy {
  id?: string
  created_at?: string
  updated_at?: string
  client_name: string
  project_title: string
  slug?: string
  summary?: string
  challenge?: string
  solution?: string
  results?: string
  featured_image_url?: string
  gallery_images?: string[]
  services: string[]
  industry?: string
  project_date?: string
  project_duration?: string
  is_published?: boolean
  published_at?: string
  display_order?: number
  is_featured?: boolean
  client_logo_url?: string
  testimonial?: string
  testimonial_author?: string
  testimonial_title?: string
  metrics?: Record<string, any>
}
