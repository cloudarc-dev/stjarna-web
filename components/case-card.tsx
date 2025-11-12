"use client"
import { motion } from "framer-motion"
import { type CaseStudy } from "@/lib/supabase"
import { Building2, Calendar, Clock, Quote } from "lucide-react"
import Image from "next/image"

interface CaseCardProps {
  caseStudy: CaseStudy
  index?: number
}

export function CaseCard({ caseStudy, index = 0 }: CaseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="p-8 border rounded-xl bg-background h-full flex flex-col"
    >
      {/* Client Logo */}
      {caseStudy.client_logo_url && (
        <div className="mb-6 flex justify-center">
          <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
            <Image
              src={caseStudy.client_logo_url}
              alt={`${caseStudy.client_name} logotyp`}
              fill
              className="object-contain p-4"
            />
          </div>
        </div>
      )}

      {/* Client Name & Project Title */}
      <div className="mb-4">
        <div className="flex items-start gap-2 mb-2">
          <Building2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
          <h3 className="font-bold text-xl">{caseStudy.client_name}</h3>
        </div>
        {caseStudy.project_title && (
          <h4 className="font-semibold text-lg text-muted-foreground ml-7">
            {caseStudy.project_title}
          </h4>
        )}
      </div>

      {/* Services Badges */}
      {caseStudy.services && caseStudy.services.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {caseStudy.services.map((service, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full font-medium"
            >
              {service}
            </span>
          ))}
        </div>
      )}

      {/* Project Metadata */}
      <div className="space-y-2 mb-4 text-sm text-muted-foreground">
        {caseStudy.industry && (
          <div className="flex items-center gap-2">
            <span className="font-medium">Bransch:</span>
            <span>{caseStudy.industry}</span>
          </div>
        )}
        {caseStudy.project_date && (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(caseStudy.project_date).toLocaleDateString('sv-SE')}</span>
          </div>
        )}
        {caseStudy.project_duration && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{caseStudy.project_duration}</span>
          </div>
        )}
      </div>

      {/* Summary */}
      {caseStudy.summary && (
        <p className="text-muted-foreground mb-6 flex-grow">
          {caseStudy.summary}
        </p>
      )}

      {/* Testimonial */}
      {caseStudy.testimonial && (
        <div className="mt-auto pt-6 border-t">
          <div className="flex items-start gap-3">
            <Quote className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm italic text-muted-foreground mb-3">
                "{caseStudy.testimonial}"
              </p>
              {(caseStudy.testimonial_author || caseStudy.testimonial_title) && (
                <div className="text-xs text-muted-foreground">
                  {caseStudy.testimonial_author && (
                    <p className="font-semibold">{caseStudy.testimonial_author}</p>
                  )}
                  {caseStudy.testimonial_title && (
                    <p>{caseStudy.testimonial_title}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
