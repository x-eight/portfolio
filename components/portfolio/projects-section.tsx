"use client"

import { motion } from "framer-motion"
import { useI18n } from "@/lib/i18n-context"
import { BentoCard } from "./bento-card"
import { ExternalLink, Github, Folder } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    translationKey: "vibe_coding",
    title: "Vibe Coding Platform",
    technologies: ["Next.js", "Vercel AI SDK", "Tailwind CSS", "OpenAI"],
    demoUrl: null,
    repoUrl: "https://github.com/x-eight/vibe-coding-platform",
    featured: true,
  },
  {
    translationKey: "multimodal_rag",
    title: "Multimodal RAG System",
    technologies: ["Python", "OpenAI", "Vector Databases", "LangChain"],
    demoUrl: null,
    repoUrl: "https://github.com/x-eight/RAG-multimodal",
    featured: true,
  },
  {
    translationKey: "smart_video",
    title: "Smart Video Reframe",
    technologies: ["Python", "Computer Vision", "MediaPipe", "MoviePy"],
    demoUrl: null,
    repoUrl: "https://github.com/x-eight/smart-video-reframe",
    featured: true,
  },
  {
    translationKey: "next_inngest",
    title: "Next.js Inngest Orchestrator",
    technologies: ["Next.js", "Inngest", "TypeScript", "Serverless"],
    demoUrl: "https://next-inngest.vercel.app/",
    repoUrl: "https://github.com/x-eight/next-inngest",
    featured: true,
  },
  {
    translationKey: "webcodec_video",
    title: "WebCodec Video Generator",
    technologies: ["JavaScript", "WebCodecs API", "Canvas", "Web Workers"],
    demoUrl: null,
    repoUrl: "https://github.com/x-eight/webcodec-video-generator",
    featured: false,
  },
  {
    translationKey: "pdf_extractor",
    title: "PDF to JSON Extractor",
    technologies: ["Python", "PyMuPDF", "Data Engineering", "JSON"],
    demoUrl: null,
    repoUrl: "https://github.com/x-eight/pdf-to-json",
    featured: false,
  },
];
export function ProjectsSection() {
  const { t } = useI18n()

  return (
    <section id="projects" className="py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 text-3xl font-bold text-foreground sm:text-4xl text-balance">
            {t.projects.title}
          </h2>
          <p className="text-muted-foreground">{t.projects.subtitle}</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <BentoCard
              key={project.title}
              delay={index * 0.1}
              className={project.featured ? "md:col-span-1" : ""}
            >
              <div className="flex h-full flex-col">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Folder className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Github className="h-5 w-5" />
                        <span className="sr-only">View code</span>
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <ExternalLink className="h-5 w-5" />
                        <span className="sr-only">View demo</span>
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="mb-4 flex-1 text-sm text-muted-foreground">
                  {t.projects.items[project.translationKey as keyof typeof t.projects.items].description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex gap-2 pt-4 border-t border-border">
                  {project.demoUrl && (
                    <Button asChild size="sm" variant="default" className="flex-1">
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        {t.projects.viewDemo}
                      </a>
                    </Button>
                  )}
                  {project.repoUrl && (
                    <Button asChild size="sm" variant="outline" className="flex-1">
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        {t.projects.viewCode}
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  )
}
