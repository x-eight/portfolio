"use client"

import { motion } from "framer-motion"
import { useI18n } from "@/lib/i18n-context"
import { BentoCard } from "./bento-card"
import { Briefcase, ExternalLink } from "lucide-react"

const experiences = [
  {
    translationKey: "freelance_ai",
    company: "Freelance (AI Content Platforms)",
    role: "Generative AI Backend Developer",
    period: { start: "May 2025", end: null },
    technologies: ["Python", "TypeScript", "LangChain", "GenKit", "Google Cloud", "FastAPI"],
    url: "https://openvideo.dev/",
  },
  {
    translationKey: "equip",
    company: "EQUIP",
    role: "Backend Developer",
    period: { start: "2024", end: "May 2025" },
    technologies: ["TypeScript", "Python", "GraphQL", "Node.js", "PostgreSQL"],
    url: "https://www.equipconstruye.com/",
  },
  {
    translationKey: "drawify",
    company: "DRAWIFY",
    role: "Backend Developer",
    period: { start: "2022", end: "2023" },
    technologies: ["Node.js", "GraphQL", "ElasticSearch", "Stripe", "Microservices"],
    url: "https://drawify.com/",
  },
  {
    translationKey: "eatos",
    company: "Freelance (Eatos)",
    role: "Backend Developer",
    period: { start: "2020", end: "2022" },
    technologies: ["Node.js", "AWS", "Docker", "CI/CD", "ECS"],
    url: "https://www.eatos.com/",
  },
];

export function ExperienceSection() {
  const { t } = useI18n()

  return (
    <section id="experience" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 text-3xl font-bold text-foreground sm:text-4xl text-balance">
            {t.experience.title}
          </h2>
          <p className="text-muted-foreground">{t.experience.subtitle}</p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-8">
            {experiences.map((exp, index) => {
              const item = t.experience.items[exp.translationKey as keyof typeof t.experience.items];
              return (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-6 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-background md:left-1/2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>

                  {/* Content */}
                  <div
                    className={`w-full pl-8 md:w-1/2 md:pl-0 ${
                      index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <BentoCard delay={index * 0.1}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Briefcase className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {exp.role}
                            </h3>
                            <a
                              href={exp.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-sm text-primary hover:underline"
                            >
                              {exp.company}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        </div>
                        <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                          {exp.period.start} — {exp.period.end || t.experience.present}
                        </span>
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </BentoCard>
                </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
