"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedText } from "@/components/ui/animated-text"
import { SubtleCard } from "@/components/ui/subtle-card"
import { ShineButton } from "@/components/ui/shine-button"
import { MapPin, Clock, Briefcase, Calendar, ChevronRight } from "lucide-react"
import { OptimizedBackground } from "@/components/ui/optimized-background"
import { FormModal } from "@/components/form-modal"
import { type JobPosting2 } from "@/lib/supabase"
import Link from "next/link"

export default function JobAnnonsPage() {
  const [jobs, setJobs] = useState<JobPosting2[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState<JobPosting2 | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs')
      const data = await response.json()
      setJobs(data)
    } catch (err) {
      console.error('Failed to fetch jobs:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleApply = (job: JobPosting2) => {
    setSelectedJob(job)
    setIsFormOpen(true)
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <>
      <FormModal
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setSelectedJob(null)
        }}
        formType="jobbansoekan"
        initialData={selectedJob ? { jobTitle: selectedJob.title } : undefined}
      />

      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative py-24 md:py-32 text-center px-4">
            <OptimizedBackground variant="minimal" className="absolute inset-0 z-0" />
            <div className="relative z-10 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <AnimatedText
                  text="Lediga tjänster"
                  el="h1"
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6"
                />
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                  Hitta din nästa karriärmöjlighet hos oss
                </p>
              </motion.div>
            </div>
          </section>

          {/* Jobs List Section */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              {jobs.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <SubtleCard className="p-12 max-w-2xl mx-auto">
                    <Briefcase className="w-16 h-16 mx-auto mb-6 text-muted-foreground opacity-50" />
                    <h2 className="text-2xl font-bold mb-4">Inga lediga tjänster just nu</h2>
                    <p className="text-muted-foreground mb-8">
                      Vi har inga aktiva jobbannonser för tillfället, men vi söker alltid duktiga medarbetare.
                      Skicka gärna en spontanansökan så hör vi av oss när något passar!
                    </p>
                    <ShineButton onClick={() => setIsFormOpen(true)}>
                      Skicka spontanansökan
                    </ShineButton>
                  </SubtleCard>
                </motion.div>
              ) : (
                <div className="grid gap-6 max-w-5xl mx-auto">
                  {jobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <SubtleCard className="p-6 md:p-8 hover:shadow-lg transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                          <div className="flex-1">
                            <div className="flex items-start gap-4 mb-4">
                              <div className="bg-primary/10 p-3 rounded-lg">
                                <Briefcase className="w-6 h-6 text-primary" />
                              </div>
                              <div>
                                <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
                                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {job.location}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {job.employment_type}
                                  </span>
                                  <span className="px-2 py-1 bg-primary/10 text-primary rounded">
                                    {job.department}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <p className="text-muted-foreground mb-4 line-clamp-3">
                              {job.description}
                            </p>

                            {job.application_deadline && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                <Calendar className="w-4 h-4" />
                                <span>Sök senast: {new Date(job.application_deadline).toLocaleDateString('sv-SE')}</span>
                              </div>
                            )}

                            {job.responsibilities && job.responsibilities.length > 0 && (
                              <div className="mb-4">
                                <h4 className="font-semibold mb-2">Arbetsuppgifter:</h4>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                  {job.responsibilities.slice(0, 3).map((resp, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                      <span>{resp}</span>
                                    </li>
                                  ))}
                                  {job.responsibilities.length > 3 && (
                                    <li className="text-primary text-sm">+ {job.responsibilities.length - 3} till...</li>
                                  )}
                                </ul>
                              </div>
                            )}
                          </div>

                          <div className="flex md:flex-col gap-3">
                            <ShineButton
                              onClick={() => handleApply(job)}
                              className="flex-1 md:flex-initial"
                            >
                              Ansök nu
                            </ShineButton>
                            <Link href={`/karriar/annonser/${job.id}`} className="flex-1 md:flex-initial">
                              <button className="w-full px-6 py-3 rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                                Läs mer
                              </button>
                            </Link>
                          </div>
                        </div>
                      </SubtleCard>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Spontaneous Application CTA */}
              {jobs.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-12 text-center"
                >
                  <SubtleCard className="p-8 max-w-3xl mx-auto">
                    <h3 className="text-2xl font-bold mb-4">Hittade du inte rätt tjänst?</h3>
                    <p className="text-muted-foreground mb-6">
                      Vi söker alltid duktiga medarbetare! Skicka en spontanansökan så hör vi av oss när något passar.
                    </p>
                    <ShineButton onClick={() => setIsFormOpen(true)}>
                      Skicka spontanansökan
                    </ShineButton>
                  </SubtleCard>
                </motion.div>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
